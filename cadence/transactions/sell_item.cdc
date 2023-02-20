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

transaction(saleItemID: UInt64, saleItemPrice: UFix64, expiry: UInt64) {
    let flowReceiver: Capability<&AnyResource{FungibleToken.Receiver}>
    let furlanetoNFTProvider: Capability<&AnyResource{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefrontV2.Storefront
    var saleCuts: [NFTStorefrontV2.SaleCut]
    var marketplacesCapability: [Capability<&AnyResource{FungibleToken.Receiver}>]

    prepare(acct: AuthAccount) {
        self.saleCuts = []
        self.marketplacesCapability = []

        // We need a provider capability, but one is not provided by default so we create one if needed.
        let furlanetoNFTCollectionProviderPrivatePath = /private/furlanetoNFTCollectionProviderForNFTStorefront

        // Receiver for the sale cut.
        self.flowReceiver = acct.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
        assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")

        // Check if the Provider capability exists or not if `no` then create a new link for the same.
        if !acct.getCapability<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(furlanetoNFTCollectionProviderPrivatePath)!.check() {
            acct.link<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(furlanetoNFTCollectionProviderPrivatePath, target: FurlanetoNFT.CollectionStoragePath)
        }

        self.furlanetoNFTProvider = acct.getCapability<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(furlanetoNFTCollectionProviderPrivatePath)!
        
        // Append the cut for the seller.
        self.saleCuts.append(NFTStorefrontV2.SaleCut(
            receiver: self.flowReceiver,
            amount: saleItemPrice
        ))
        assert(self.furlanetoNFTProvider.borrow() != nil, message: "Missing or mis-typed FurlanetoNFT.Collection provider")

        self.storefront = acct.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath)
            ?? panic("Missing or mis-typed NFTStorefront Storefront")
    }

    execute {
        // Create listing
        self.storefront.createListing(
            nftProviderCapability: self.furlanetoNFTProvider,
            nftType: Type<@FurlanetoNFT.NFT>(),
            nftID: saleItemID,
            salePaymentVaultType: Type<@FlowToken.Vault>(),
            saleCuts: self.saleCuts,
            marketplacesCapability: nil,
            customID: nil,
            commissionAmount: UFix64(0),
            expiry: expiry
        )
    }
}
 