"use client";
import { Ingredient } from "../../(api)/solver/fetch-irritants";
import { UseQueryResult } from "react-query";
import { useIrriativeProductSelectState } from "./irritative-product-select";
import { TabControlsRendered } from "./skin-profile-form";
import { useUser } from "../../user";
import LoginButton from "../../(navigation)/LoginButton";

interface Props {
  productSelectState: ReturnType<typeof useIrriativeProductSelectState>;
  useQueryResult: UseQueryResult<Ingredient[]>;
  TabControls: TabControlsRendered;
}

export default function Results(props: Props) {
  const { data: irritants, isLoading, isError } = props.useQueryResult;
  const user = useUser();

  if (isError || !irritants) {
    return <div>Could not fetch irritants.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const results =
    irritants.length === 0 ? (
      <div>Did not find irritants. Nice</div>
    ) : (
      <div>
        <div>
          The following ingredients are present in more than one product and may
          be the cause of irritation:
        </div>
        {irritants.map((irritant, key) => (
          <div key={key}>{irritant.name}</div>
        ))}
      </div>
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
