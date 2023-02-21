import { promises as fs } from "fs";
import path from "path";

import * as fcl from "@onflow/fcl";
import { authenticate } from "@onflow/fcl";

import NFTList from "../components/NFTList";
import useCurrentUser from "../hooks/use-current-user";
import { Listing } from "../typings/Listing";

export async function getServerSideProps() {
  // const getAllListingsCode = fs
  //   .readFileSync("cadence/scripts/get_all_listings.cdc")
  //   .toString();

  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "cadence");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/scripts/get_all_listings.cdc",
    "utf8"
  );

  // const buyItemCode = fs
  //   .readFileSync("cadence/transactions/buy_item.cdc")
  //   .toString();
  return {
    props: {
      getAllListingsCode: fileContents,
      buyItemCode: "",
    }, // will be passed to the page component as props
  };
}

interface HomeProps {
  getAllListingsCode: string;
  buyItemCode: string;
}

export default function Home({ getAllListingsCode, buyItemCode }: HomeProps) {
  const currentUser = useCurrentUser();

  const buyItem = async (listing: Listing) => {
    try {
      if (!currentUser?.addr) {
        await authenticate();
      }
      const transactionId = await fcl.mutate({
        cadence: buyItemCode,
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 1000,
        args: (arg: any, t: any) => [
          arg(process.env.NEXT_PUBLIC_ADDRESS, t.Address),
          arg(listing.listingResourceID, t.UInt64),
        ],
      });

      const transaction = await fcl.tx(transactionId).onceSealed();
      return transaction.statusString === "SEALED";
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <NFTList
      address={process.env.NEXT_PUBLIC_ADDRESS as string}
      getItemsScriptCode={getAllListingsCode}
      buyItem={buyItem}
    />
  );
}
