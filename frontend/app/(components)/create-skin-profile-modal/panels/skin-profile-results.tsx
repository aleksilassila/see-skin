import { useFetchApi, useMutate } from "../../../(api)/api";
import { PutSkinProfile } from "../../../(api)/api-routes";
import { useEffect, useState } from "react";
import { ResultItems } from "../result-items";

export type SkinProfileResultsState = ReturnType<
  typeof useSkinProfileResultsState
>;

export function useSkinProfileResultsState() {
  const [data, setData] = useState<PutSkinProfile["body"]>({
    skinType: undefined,
    productIds: [],
    ingredientIds: [],
  });

  const createProfileQuery = useMutate<PutSkinProfile>("/skin-profile");

  useEffect(() => {
    if (data.skinType !== undefined && !!data.productIds?.length) {
      createProfileQuery.mutate({
        method: "PUT",
        data,
      });
    }
  }, [data]);

  return {
    createProfileQuery,
    setData,
  };
}

export default function SkinProfileResults(state: SkinProfileResultsState) {
  return (
    <ResultItems
      skinProfile={state.createProfileQuery.data}
      loading={state.createProfileQuery.isLoading}
    />
  );
}
