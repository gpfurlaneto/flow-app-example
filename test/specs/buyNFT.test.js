import path from 'path';

import {
  deployContractByName,
  emulator,
  getAccountAddress,
  init,
  shallPass,
} from '@onflow/flow-js-testing';

import {
  buyItem,
  getFlowBalance,
  listNFT,
  mintFlowToken,
  mintNFT,
  setupStorefrontV2,
} from '../utils';

const EMULATOR_ACCOUNT = "0xf8d6e0586b0a20c7";

// We need to set timeout for a higher number, because some transactions might take up some time
jest.setTimeout(10000);

describe.only("Buy NFT", () => {
  // Instantiate emulator and path to Cadence files
  beforeEach(async () => {
    const basePath = path.resolve(__dirname, "../../cadence");
    await init(basePath);
    await emulator.start();
    await deployContractByName("NonFungibleToken");
    await deployContractByName("MetadataViews");
    await deployContractByName("NFTStorefrontV2");
    await deployContractByName("FurlanetoNFT");
  });

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    return emulator.stop();
  });

  test("Buy NFT to alice account", async () => {
    const nftEvent = await shallPass(mintNFT(EMULATOR_ACCOUNT));
    const nftId = nftEvent[0].events[0].data.id;
    await shallPass(setupStorefrontV2(EMULATOR_ACCOUNT));

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 730);
    const resultListing = await shallPass(
      listNFT(EMULATOR_ACCOUNT, "0", "1.0", expiry.getTime().toString())
    );
    const {
      data: { listingResourceID },
    } = resultListing[0].events[0];

    const aliceAccount = await getAccountAddress("alice");
    await shallPass(mintFlowToken(EMULATOR_ACCOUNT, aliceAccount, "1.0"));

    const resultBuy = await shallPass(
      buyItem(aliceAccount, EMULATOR_ACCOUNT, listingResourceID)
    );

    const [balanceAfterSell] = await getFlowBalance(EMULATOR_ACCOUNT);
    expect(balanceAfterSell).toBe("1000000000.99600000");

    const listinCompletedEvent = resultBuy[0].events.find(
      (event) =>
        event.type === "A.f8d6e0586b0a20c7.NFTStorefrontV2.ListingCompleted"
    );
    expect(listinCompletedEvent).toBeDefined();
    expect(nftId).toBe(listinCompletedEvent.data.nftID);
    expect(listingResourceID).toBe(listinCompletedEvent.data.listingResourceID);
  });
});
