import FlowToken from 0xFlowToken
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import FurlanetoNFT from 0xFurlanetoNFT
import MetadataViews from 0xMetadataViews
import NFTStorefrontV2 from 0xNFTStorefrontV2

/// Transaction used to facilitate the creation of the listing under the signer's owned storefront resource.
/// It accepts the certain details from the signer,i.e. - 
///
/// `saleItemID` - ID of the NFT that is put on sale by the seller.
/// `saleItemPrice` - Amount of tokens (FT) buyer needs to pay for the purchase of listed NFT.
/// `expiry` - Unix timestamp at which created listing become expired.

/// If the given nft has a support of the RoyaltyView then royalties will added as the sale cut.

transaction(storefrontAddress: Address, listingResourceID: UInt64) {
    let storefront: &NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}
    let listing: &NFTStorefrontV2.Listing{NFTStorefrontV2.ListingPublic}
    let paymentVault: @FungibleToken.Vault
    let collectionRef: &{NonFungibleToken.Receiver}

    prepare(acct: AuthAccount) {

      self.storefront = getAccount(storefrontAddress)
        .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
            NFTStorefrontV2.StorefrontPublicPath
        )!
        .borrow()
        ?? panic("Could not borrow Storefront from provided address")
      
      // Borrow the listing
      self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
        ?? panic("No Offer with that ID in Storefront")


      var price = self.listing.getDetails().saleCuts[0].amount
      

      let flowProvider = acct.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault)!
      self.paymentVault <- flowProvider.withdraw(amount: price)

      if let collectionRef = acct.borrow<&{NonFungibleToken.Receiver}>(from: FurlanetoNFT.CollectionStoragePath) {
        self.collectionRef = collectionRef
      } else {
        let collection <- FurlanetoNFT.createEmptyCollection() as! @FurlanetoNFT.Collection 
        self.collectionRef = &collection as &FurlanetoNFT.Collection
        acct.save<@FurlanetoNFT.Collection>(<- collection, to: FurlanetoNFT.CollectionStoragePath)
        acct.link<&FurlanetoNFT.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(FurlanetoNFT.CollectionPublicPath, target: FurlanetoNFT.CollectionStoragePath)
      }
    }

    execute {
      let item <- self.listing.purchase(
          payment: <-self.paymentVault,
          commissionRecipient: nil
      )
  
      // Deposit the NFT in the buyer''s collection.
      self.collectionRef.deposit(token: <-item)
    }
}
 