"use client";
import {
  Ingredient,
  IrritantsCalculationResponse,
} from "../../(api)/solver/fetch-irritants-calculation";
import { UseQueryResult } from "react-query";
import { useIrriativeProductSelectState } from "./irritative-product-select";
import { TabControlsRendered } from "./skin-profile-form";
import { useUser } from "../../user";
import LoginButton from "../../(navigation)/LoginButton";

interface Props {
  productSelectState: ReturnType<typeof useIrriativeProductSelectState>;
  useQueryResult: UseQueryResult<IrritantsCalculationResponse>;
  TabControls: TabControlsRendered;
}

export default function Results(props: Props) {
  const { data, isLoading, isError } = props.useQueryResult;
  const user = useUser();

  if (isError || !data) {
    return <div>Could not fetch irritants.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const duplicates = (
    <div>
      <div>
        The following ingredients are present in more than one product and may
        be the cause of irritation:
      </div>
      {data.duplicates.map((irritant, key) => (
        <div key={key}>
          <div>{irritant.ingredient.name}</div>
          <div>This product was present in the following products:</div>
          {irritant.products.map((product, key) => (
            <div key={key}>{product.name}</div>
          ))}
        </div>
      ))}
    </div>
  );

  const irritants = (
    <div>
      <div>
        The following ingredients were present in some of your products and are
        known to cause irritation:
      </div>
      {data.skinTypeIrritants.map((irritant, key) => (
        <div key={key}>
          <div className="font-medium">{irritant.ingredient.name}</div>
          <div>
            Ingredient classes:{" "}
            {irritant.ingredientClasses.map((ingredientClass, key) => (
              <div key={key}>{ingredientClass}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const results =
    data.duplicates.length + data.skinTypeIrritants.length === 0 ? (
      <div>Did not find irritants. Nice</div>
    ) : (
      <>
        {data.duplicates.length && duplicates}
        {data.skinTypeIrritants.length && irritants}
      </>
    );
  return (
    <div>
      {results}
      {user.user === false && (
        <div>
          <div>
            Log in to browse skin products that are compatible with your skin!
          </div>
          <LoginButton />
        </div>
      )}
      <props.TabControls canAdvance={true} />
    </div>
  );
}
