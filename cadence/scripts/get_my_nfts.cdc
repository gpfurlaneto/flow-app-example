import FurlanetoNFT from 0xFurlanetoNFT
import MetadataViews from 0xMetadataViews
import NonFungibleToken from 0xNonFungibleToken

pub struct NFT {
  pub let id: UInt64,
  pub let name: String
  pub let description: String
  pub let view: String

  init(
    id: UInt64,
    name: String
    description: String
  ) {
    self.id = id
    self.name = name
    self.description = description
    self.view = view
  }
}

pub fun main(address: Address): [&AnyResource{MetadataViews.Resolver}] {

  let account = getAccount(address)
  
  let collection = account
          .getCapability(FurlanetoNFT.CollectionPublicPath)
          .borrow<&{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

  let nftIDs = collection.getIDs()
  let nfts: [&AnyResource{MetadataViews.Resolver}] = []
  for nftID in nftIDs {
    let nft = collection.borrowViewResolver(id: nftID)
    let view = nft.resolveView(Type<MetadataViews.Display>())!
    let display = view as! MetadataViews.Display

    nfts.append({
      id: nft.id,
      name: nft.name,
      description: nft.description,
      view: display.thumbnail.uri()
    })
  }
  return nfts
}
