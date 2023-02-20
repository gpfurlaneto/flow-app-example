export interface NFT {
  id: string,
  name: string
  description: string
  thumbnail: string
  uuid: string
  owner?: string
}

export interface Listing {
  nftID: string
  salePrice: string
  expiry: string
  nft: NFT,
  listingResourceID: string
}