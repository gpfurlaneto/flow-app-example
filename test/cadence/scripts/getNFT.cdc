import FurlanetoNFT from 0xFurlanetoNFT
import NonFungibleToken from 0xNonFungibleToken

pub fun main(address: Address, nftId: UInt64): &FurlanetoNFT.NFT? {

  let collectionRef: &{NonFungibleToken.CollectionPublic, FurlanetoNFT.FurlanetoNFTCollectionPublic} = getAccount(address)
      .getCapability(FurlanetoNFT.CollectionPublicPath)
      .borrow<&{NonFungibleToken.CollectionPublic, FurlanetoNFT.FurlanetoNFTCollectionPublic}>()
      ?? panic("Could not get receiver reference to the NFT Collection")
  
  return collectionRef.borrowFurlanetoNFT(id: nftId)
}