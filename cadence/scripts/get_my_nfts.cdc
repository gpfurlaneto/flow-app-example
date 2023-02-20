import FurlanetoNFT from 0xFurlanetoNFT
import MetadataViews from 0xMetadataViews
import NonFungibleToken from 0xNonFungibleToken

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
    nfts.append(nft)
  }
  return nfts
}
