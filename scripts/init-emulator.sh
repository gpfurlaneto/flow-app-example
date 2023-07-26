mkdir -p .tmp

mintNFTTx () {
  mintNFTTxCode=`cat ./cadence/transactions/mint_nft.cdc`
  mintNFTTxCode=${mintNFTTxCode//0xNonFungibleToken/$1}
  mintNFTTxCode=${mintNFTTxCode/0xFurlanetoNFT/$2}
  mintNFTTxCode=${mintNFTTxCode/0xMetadataViews/$3}
  mintNFTTxCode=${mintNFTTxCode/0xFungibleToken/$4}
  echo "$mintNFTTxCode" > ./.tmp/$5.cdc
}

setupStorefrontV2Tx () {
  setupStorefrontV2TxCode=`cat ./test/cadence/transactions/setup-account.cdc`
  setupStorefrontV2TxCode=${setupStorefrontV2TxCode//0xNFTStorefrontV2/$1}
  echo "$setupStorefrontV2TxCode" > ./.tmp/$2.cdc
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

echo "Deploying contracts"
flow project deploy -n emulator --update >/dev/null

mintNFTTx "0xf8d6e0586b0a20c7" "0xf8d6e0586b0a20c7" "0xf8d6e0586b0a20c7" "0xee82856bf20e2aa6" "mint_nft"

setupStorefrontV2Tx "0xf8d6e0586b0a20c7" "setup_account_storefrontV2"

sellITemTx "0x0ae53cb6e3f42a79" "0xee82856bf20e2aa6" "0xf8d6e0586b0a20c7"  "0xf8d6e0586b0a20c7"  "0xf8d6e0586b0a20c7"  "0xf8d6e0586b0a20c7" "sell_item"

echo "Minting NFT 1 as Admin"
flow transactions send ./.tmp/mint_nft.cdc "0xf8d6e0586b0a20c7" "NFT 1" "NFT 1 Description" "QmRwJyi1f1LynH4hhLkvw4xcWdeXJyJZGJPS9oAfqTv5Ak"

echo "Minting NFT 2 as Admin"
flow transactions send ./.tmp/mint_nft.cdc "0xf8d6e0586b0a20c7" "NFT 2" "NFT 2 Description" "QmRwJyi1f1LynH4hhLkvw4xcWdeXJyJZGJPS9oAfqTv5Ak"

echo "Minting NFT 3 as Admin"
flow transactions send ./.tmp/mint_nft.cdc "0xf8d6e0586b0a20c7" "NFT 3" "NFT 3 Description" "QmRwJyi1f1LynH4hhLkvw4xcWdeXJyJZGJPS9oAfqTv5Ak"

echo "Setup StrofrontV2 as Admin"
flow transactions send ./.tmp/setup_account_storefrontV2.cdc "0xf8d6e0586b0a20c7"

expireDate=$(($(date +'%s * 1000 + %-N / 1000000')))
expireDate=$(($expireDate + (86400000 * 365 * 10)))

flow transactions send ./.tmp/sell_item.cdc "0" "1.0" "2676758227298"
flow transactions send ./.tmp/sell_item.cdc "1" "2.0" "2676758227298"
flow transactions send ./.tmp/sell_item.cdc "2" "3.0" "2676758227298"



