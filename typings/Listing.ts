export interface NFT {
  id: string,
  name: string
  description: string
  view: string
  owner?: string
}

export interface Listing {
  nftID: string
  salePrice: string
  expiry: string
  nft: NFT,
  listingResourceID: string
}