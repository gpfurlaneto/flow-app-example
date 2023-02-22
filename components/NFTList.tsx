import { useCallback, useContext, useEffect, useState } from "react";

import * as fcl from "@onflow/fcl";

import LoadingContext, { ILoadingContext } from "../hooks/LoadingContext";
import { Listing, NFT } from "../typings/Listing";
import NFTCard from "./NFTCard";

interface NFTListProps {
  address: string;
  getItemsScriptCode: string;
  buyItem?: (listing: Listing) => Promise<boolean>;
}

export default function NFTList({
  address,
  getItemsScriptCode,
  buyItem,
}: NFTListProps) {
  const [items, setItems] = useState<Listing[] | NFT[]>([]);
  const { setIsLoading } = useContext<ILoadingContext>(LoadingContext);

  const fetch = useCallback(
    async (address: string, code: string) => {
      setIsLoading(true);
      const response = await fcl.query({
        cadence: code,
        args: (arg: any, t: any) => [arg(address, t.Address)],
      });
      setItems(response);
      setIsLoading(false);
    },
    [setIsLoading]
  );

  useEffect(() => {
    fetch(address, getItemsScriptCode);
  }, [address, fetch, getItemsScriptCode]);

  const onBuyClick = async (listing: Listing) => {
    if (buyItem) {
      setIsLoading(true);
      await buyItem(listing);
      return fetch(address, getItemsScriptCode);
    }
  };

  return (
    <div className="flex flex-col items-center lg:grid grid-cols-3 gap-4">
      {items.map((item) => {
        const nft = (item as Listing).listingResourceID
          ? (item as Listing).nft
          : item;
        return (
          <NFTCard
            key={(item as Listing).listingResourceID ?? (item as NFT).id}
            nft={{ ...nft, owner: address as string } as NFT}
            price={(item as Listing).salePrice}
            onClickBuy={() => onBuyClick(item as Listing)}
          />
        );
      })}
    </div>
  );
}
