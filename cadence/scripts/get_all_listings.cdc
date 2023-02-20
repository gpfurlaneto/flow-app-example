import NFTStorefrontV2 from 0xNFTStorefrontV2
import FurlanetoNFT from 0xFurlanetoNFT
import MetadataViews from 0xMetadataViews
import NonFungibleToken from 0xNonFungibleToken

pub struct Details {
  pub let nftID: UInt64
  pub let salePrice: UFix64
  pub let expiry: UInt64
  pub let nft: &AnyResource{MetadataViews.Resolver}
  pub let listingResourceID: UInt64

  init (nftID: UInt64, salePrice: UFix64, expiry: UInt64, nft: &AnyResource{MetadataViews.Resolver}, listingResourceID: UInt64) {
    self.nftID = nftID
    self.expiry = expiry
    self.salePrice = salePrice
    self.nft = nft
    self.listingResourceID = listingResourceID
  }
}

pub fun main(address: Address): [Details] {

  let account = getAccount(address)
  let storefront = account
      .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath)
      .borrow() ?? panic("Unable to borrow the storeFrontManager resource")

  let collection = account
            .getCapability(FurlanetoNFT.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

  let listingIDs = storefront.getListingIDs()
  let listings: [Details] = []
  for listingResourceID in listingIDs {
    let listingDetails = storefront.borrowListing(listingResourceID: listingResourceID)!.getDetails()
    if(!listingDetails.purchased){
      let nftID = listingDetails.nftID

      let nft = collection.borrowViewResolver(id: nftID)
      listings.append(
        Details(
          nftID: listingDetails.nftID,
          salePrice: listingDetails.salePrice,
          expiry: listingDetails.expiry,
          nft: nft,
          listingResourceID: listingResourceID)
      )
    }
  }
  return listings
}
