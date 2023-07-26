import NFTStorefrontV2 from 0xNFTStorefrontV2
import FurlanetoNFT from 0xFurlanetoNFT
import MetadataViews from 0xMetadataViews
import NonFungibleToken from 0xNonFungibleToken

pub struct Details {
  pub let nftID: UInt64
  pub let salePrice: UFix64
  pub let expiry: UInt64
  pub let nft: NFT
  pub let listingResourceID: UInt64

  init (nftID: UInt64, salePrice: UFix64, expiry: UInt64, listingResourceID: UInt64, nft: NFT) {
    self.nftID = nftID
    self.expiry = expiry
    self.salePrice = salePrice
    self.nft = nft
    self.listingResourceID = listingResourceID
  }
}


pub struct NFT {
  pub let id: UInt64
  pub let name: String
  pub let description: String
  pub let view: String

  init(
    id: UInt64,
    name: String,
    description: String,
    view: String
  ) {
    self.id = id
    self.name = name
    self.description = description
    self.view = view
  }
}

pub fun main(address: Address): [Details] {

  let account = getAccount(address)
  let storefront = account
      .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath)
      .borrow() ?? panic("Unable to borrow the storeFrontManager resource")

  let collection = account
            .getCapability(FurlanetoNFT.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection, FurlanetoNFT.FurlanetoNFTCollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

  let listingIDs = storefront.getListingIDs()
  let listings: [Details] = []
  for listingResourceID in listingIDs {
    let listingDetails = storefront.borrowListing(listingResourceID: listingResourceID)!.getDetails()
    if(!listingDetails.purchased){
      let nftID = listingDetails.nftID

      let nft = collection.borrowFurlanetoNFT(id: nftID)!
      let view = nft.resolveView(Type<MetadataViews.Display>())!
      let display = view as! MetadataViews.Display
    
      listings.append(
        Details(
          nftID: listingDetails.nftID,
          salePrice: listingDetails.salePrice,
          expiry: listingDetails.expiry,
          listingResourceID: listingResourceID,
          nft: NFT(
            id: nftID,
            name: nft.name,
            description: nft.description,
            view: display.thumbnail.uri()
          )
        )
      )
    }
  }
  return listings
}
