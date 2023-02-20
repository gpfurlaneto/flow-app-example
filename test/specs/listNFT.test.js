import path from "path"
import {
  init,
  emulator,
  shallPass,
  deployContractByName,
} from "@onflow/flow-js-testing"
import { getAllListings, listNFT, mintNFT, setupStorefrontV2 } from "../utils"

const EMULATOR_ACCOUNT = "0xf8d6e0586b0a20c7"

// We need to set timeout for a higher number, because some transactions might take up some time
jest.setTimeout(10000)

describe("Listing NFT", () => {
  // Instantiate emulator and path to Cadence files
  beforeEach(async () => {
    const basePath = path.resolve(__dirname, "../../cadence")
    await init(basePath)
    await emulator.start()
    await deployContractByName("NonFungibleToken")
    await deployContractByName("MetadataViews")
    await deployContractByName("NFTStorefrontV2")
    await deployContractByName("FurlanetoNFT")
  })

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    return emulator.stop()
  })

  test("List NFT minted to emulator account", async () => {

    await shallPass(setupStorefrontV2("0xf8d6e0586b0a20c7"))

    const [transaction] = await shallPass(mintNFT(EMULATOR_ACCOUNT, "Test", "Test"))

    const { id } = transaction.events[0].data

    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 730)
    const result = await shallPass(listNFT(EMULATOR_ACCOUNT, id.toString(), "1.0", expiry.getTime().toString()))

    const { type, data } = result[0].events[0]
    const { listingResourceID } = data

    expect(type).toEqual('A.f8d6e0586b0a20c7.NFTStorefrontV2.ListingAvailable')
    expect(listingResourceID).toBeDefined()
    expect(data.storefrontAddress).toEqual('0xf8d6e0586b0a20c7')
    expect(data.nftID).toEqual(id)
    expect(data.salePrice).toEqual('1.00000000')
    expect(data.expiry).toEqual(expiry.getTime().toString())
    
    const [listings] = await getAllListings(EMULATOR_ACCOUNT)
    const listing = listings[0]
    
    expect(data.nftID).toEqual(listing.nftID)
    expect(data.salePrice).toEqual(listing.salePrice)
    expect(data.expiry).toEqual(listing.expiry)
  })
})
 