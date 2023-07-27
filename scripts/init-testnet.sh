# mkdir -p .tmp

mintNFTTx () {
  mintNFTTxCode=`cat ./cadence/transactions/mint_nft.cdc`
  mintNFTTxCode=${mintNFTTxCode//0xNonFungibleToken/$1}
  mintNFTTxCode=${mintNFTTxCode/0xFurlanetoNFT/$2}
  mintNFTTxCode=${mintNFTTxCode/0xMetadataViews/$3}
  mintNFTTxCode=${mintNFTTxCode/0xFungibleToken/$4}
  echo "$mintNFTTxCode" > ./.tmp/$5.cdc
}

sellITemTx () {
  sellITemTxCode=`cat ./cadence/transactions/sell_item.cdc`
  sellITemTxCode=${sellITemTxCode//0xFlowToken/$1}
  sellITemTxCode=${sellITemTxCode//0xFungibleToken/$2}
  sellITemTxCode=${sellITemTxCode//0xNonFungibleToken/$3}
  sellITemTxCode=${sellITemTxCode//0xFurlanetoNFT/$4}
  sellITemTxCode=${sellITemTxCode//0xMetadataViews/$5}
  sellITemTxCode=${sellITemTxCode//0xNFTStorefrontV2/$6}
  echo "$sellITemTxCode" > ./.tmp/$7.cdc
}

setupStorefrontV2Tx () {
  setupStorefrontV2TxCode=`cat ./test/cadence/transactions/setup-account.cdc`
  setupStorefrontV2TxCode=${setupStorefrontV2TxCode//0xNFTStorefrontV2/$1}
  echo "$setupStorefrontV2TxCode" > ./.tmp/$2.cdc
}

mintNFTTx "0x631e88ae7f1d7c20" "0xe2e6a28ba2893e0b" "0x631e88ae7f1d7c20" "0x9a0766d93b6608b7" "mint_nft_testnet"

sellITemTx "0x7e60df042a9c0868" "0x9a0766d93b6608b7" "0x631e88ae7f1d7c20"  "0xe2e6a28ba2893e0b"  "0x631e88ae7f1d7c20"  "0x2d55b98eb200daef" "sell_item_testnet"

setupStorefrontV2Tx "0x2d55b98eb200daef" "setup_account_storefrontV2"

# echo "Minting NFT as Admin"
# flow transactions send ./.tmp/mint_nft_testnet.cdc "0xe2e6a28ba2893e0b" "Tiger" "Tiger Green eyes" "QmbVbLxAhH2hBCGtahD44KekiwojXBDmfWTnK6GpdVrp8Z" --signer testnet-account --network testnet

# expireDate=$(($(date +'%s * 1000 + %-N / 1000000')))
# expireDate=$(($expireDate + (86400000 * 365 * 10)))

# echo "$expireDate"
# flow transactions send ./.tmp/sell_item_testnet.cdc "12" "12.1" $expireDate --signer testnet-account --network testnet


