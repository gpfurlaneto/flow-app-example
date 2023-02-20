import { useCallback, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from "react-json-pretty/dist/monikai";

import * as fcl from "@onflow/fcl";

import LoadingContext, { ILoadingContext } from "../hooks/LoadingContext";

export default function Home() {
  const router = useRouter();
  const term = router.query?.term;
  const [result, setResult] = useState();
  const { setIsLoading } = useContext<ILoadingContext>(LoadingContext);

  const getAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      const account = await fcl.send([fcl.getAccount(term)]).then(fcl.decode);
      setResult(account);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, term]);

  const getTransaction = useCallback(async () => {
    try {
      setIsLoading(true);
      const newResult = await fcl
        .send([fcl.getTransaction(router.query?.term)])
        .then(fcl.decode);
      setResult(newResult);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [router.query?.term, setIsLoading]);

  useEffect(() => {
    if (term) {
      term.length > 18 ? getTransaction() : getAccount();
    }
  }, [getAccount, getTransaction, term]);

  return (
    <div className="w-screen lg:w-9/12">
      {result && (
        <JSONPretty
          className=" m-10 p-10"
          data={result}
          theme={JSONPrettyMon}
        ></JSONPretty>
      )}
    </div>
  );
}
