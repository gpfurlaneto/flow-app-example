import { useRouter } from "next/router";

export default function Breadcrumb() {
  const router = useRouter();
  const labels: any = {
    "/": "Home",
    "/my-nfts": "My NFTs",
    "/search": "Search",
  };
  return (
    <div className="mb-5 mr-auto">{labels[router.pathname as string]}</div>
  );
}
