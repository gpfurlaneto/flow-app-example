import { config } from "@onflow/fcl";

const emulator = {
  '0xFlowToken': '0x0ae53cb6e3f42a79',
  '0xFungibleToken': '0xee82856bf20e2aa6',
  '0xFurlanetoNFT': '0xf8d6e0586b0a20c7',
  '0xMetadataViews': '0xf8d6e0586b0a20c7',
  '0xNFTStorefrontV2': '0xf8d6e0586b0a20c7',
  '0xNonFungibleToken': '0xf8d6e0586b0a20c7'
}

const testnet = {
  '0xFlowToken': '0x7e60df042a9c0868',
  '0xFungibleToken': '0x9a0766d93b6608b7',
  '0xFurlanetoNFT': '0x480c38915dba63c8',
  '0xMetadataViews': '0x631e88ae7f1d7c20',
  '0xNFTStorefrontV2': '0x2d55b98eb200daef',
  '0xNonFungibleToken': '0x631e88ae7f1d7c20'
}

const mainnet = {
  '0xFlowToken': '0x1654653399040a61',
  '0xFungibleToken': '0xf233dcee88fe0abe',
  '0xFurlanetoNFT': '',
  '0xMetadataViews': '0x1d7e57aa55817448',
  '0xNFTStorefrontV2': '0x4eb8a10cb9f87357',
  '0xNonFungibleToken': '0x1d7e57aa55817448'
}

const addresses: any = { emulator, testnet, mainnet }
config({
  ...(addresses[process.env.NEXT_PUBLIC_FLOW_NETWORK ?? 'emulator'] as any),
  'flow.network': process.env.NEXT_PUBLIC_FLOW_NETWORK,
  'accessNode.api': process.env.NEXT_PUBLIC_ACCESSNODE_API,
  'discovery.wallet': process.env.NEXT_PUBLIC_DISCOVERY_WALLET,
})