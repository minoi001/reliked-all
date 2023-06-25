import ProductList from "../components/Homepage/ProductList";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return <ProductList query={searchParams} />;
}
