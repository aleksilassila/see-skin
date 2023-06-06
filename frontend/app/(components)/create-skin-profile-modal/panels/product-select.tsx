"use client";
import { RemovableProductList } from "../../common/list-container";
import { Product, SkinType } from "../../../(api)/api-types";
import { ProductSearchModal } from "../../product-search-modal";
import { useVisibleState } from "../../ui/drawer";
import ProductDetails, {
  useProductDetailsState,
} from "../../../products/product-details/product-details";
import { Button } from "../../ui/button";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../user";
import { GoogleLoginButton } from "../../../(navigation)/account-button";

export default function ProductSelect(props: {
  products: Product[];
  setProducts: (products: Product[]) => void;
  advance: () => void;
  skinType?: SkinType;
  handleLogin: () => void;
}) {
  const { products, setProducts } = props;

  const user = useUser();

  const productSearchState = useVisibleState();
  const productDetailsState = useProductDetailsState();

  function addProduct(product: Product) {
    setProducts([...products, product]);
  }

  function removeProduct(product: Product) {
    setProducts(products.filter((p) => p.id !== product.id));
  }

  return (
    <div className="flex flex-col gap-2">
      <ProductSearchModal
        handleProductSelect={addProduct}
        selectedProducts={products}
        handleProductUnselect={removeProduct}
        {...productSearchState}
      />
      <ProductDetails {...productDetailsState} />
      <div>
        <Button intent="primary" onClick={productSearchState.open}>
          Add Products
        </Button>
      </div>
      <RemovableProductList
        products={products}
        handleRemove={removeProduct}
        handleClick={(p) => productDetailsState.show(p)}
      />
      {user.isSignedIn ? (
        <Button
          disabled={products.length === 0}
          trailingIcon={faChevronRight}
          onClick={props.advance}
        >
          Create SkinProfile
        </Button>
      ) : (
        <GoogleLoginButton handleClick={props.handleLogin} />
      )}
    </div>
  );
}
