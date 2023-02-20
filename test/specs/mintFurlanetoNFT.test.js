import path from "path"
import {
  init,
  emulator,
  shallPass,
  deployContractByName,
} from "@onflow/flow-js-testing"
import { getNFT, mintNFT } from "../utils"

// We need to set timeout for a higher number, because some transactions might take up some time
jest.setTimeout(10000)

const EMULATOR_ACCOUNT = '0xf8d6e0586b0a20c7'

describe("Mint NFT", () => {
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

  test("Mint NFT to emulator account", async () => {
    const [transaction] = await shallPass(mintNFT(EMULATOR_ACCOUNT, "Test", "Test"))
    const eventData = transaction.events[0].data
    expect(eventData).toEqual({ id: '0', to: EMULATOR_ACCOUNT })
    
    const nft = await getNFT(EMULATOR_ACCOUNT, "0")

    expect(nft.id).toBe('0')
    expect(nft.name).toBe('Test'),
    expect(nft.description).toBe('Test')
  })
})