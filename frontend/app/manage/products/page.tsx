import { Product } from "./product";
import Api from "../../(api)/api";
import { Product as ProductType } from "../ManageResponseTypes";
import IssuesContainer from "../issues-container";

async function fetchIssues(): Promise<ProductType[]> {
  const data = await Api.fetch("/api/manage/issues/products");

  if (!data.ok) {
    throw new Error("Could not load products.");
  }

  return data.json();
}

export default async function ProductsPage() {
  const products = await fetchIssues();

  return (
    <IssuesContainer
      title="Products:"
      items={products.map((product, id) => (
        <div key={id} className="py-2">
          <Product product={product} />
        </div>
      ))}
    />
  );
}
