import path from "path";

import {
  executeScript,
  getTemplate,
  sendTransaction,
} from "@onflow/flow-js-testing";

export function mintNFT(
  signer,
  name = "Test",
  description = "Test",
  thumbnail = ""
) {
  return sendTransaction({
    name: "mint_nft",
    args: [signer, name, description, thumbnail],
    signers: [signer],
  });
}

export async function setupStorefrontV2(signer) {
  const setupAccountNFTStorefrontV2Code = getTemplate(
    path.resolve(__dirname, "./cadence/transactions/setup-account.cdc")
  );

  return sendTransaction({
    code: setupAccountNFTStorefrontV2Code,
    signers: [signer],
  });
}

export async function listNFT(signer, nftId, price, expireTime) {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 730);
  return sendTransaction("sell_item", [signer], [nftId, price, expireTime]);
}

export function mintFlowToken(signer, receiver, amount) {
  const mintFlowtokenCode = getTemplate(
    path.resolve(__dirname, "./cadence/transactions/mint-flow.cdc")
  );

  return sendTransaction({
    code: mintFlowtokenCode,
    signers: [signer],
    args: [receiver, amount],
  });
}

export async function getNFT(ownerCollectionAddress, nftId) {
  const getNFTCode = await getTemplate(
    path.resolve(__dirname, "./cadence/scripts/getNFT.cdc")
  );
  const [nft] = await executeScript({
    code: getNFTCode,
    args: [ownerCollectionAddress, nftId],
  });

  return nft;
}

export async function getFlowBalance(address) {
  return executeScript("get_flow_balance", [address]);
}

export async function buyItem(signer, storefrontAddress, listingResourceID) {
  return sendTransaction(
    "buy_item",
    [signer],
    [storefrontAddress, listingResourceID]
  );
}

export async function getAllListings(address) {
  return executeScript({
    name: "get_all_listings",
    args: [address],
  });
}
