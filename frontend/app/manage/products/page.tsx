"use client";
import { Product } from "./product";
import IssuesContainer from "../issues-container";
import { useQuery } from "react-query";
import { fetchProducts } from "../../(api)/manage/products";

export default function ProductsPage() {
  // const { data: products, isError } = useQuery(
  //   "manage-issues-products",
  //   fetchProducts
  // );
  //
  // if (!products) return null;
  //
  // return (
  //   <IssuesContainer
  //     title="Products:"
  //     items={products.map((product, id) => (
  //       <div key={id} className="py-2">
  //         <Product product={product} />
  //       </div>
  //     ))}
  //   />
  // );

  return <div></div>;
}
