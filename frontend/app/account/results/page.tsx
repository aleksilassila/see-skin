"use client";
import Link from "next/link";
import { useFetchApi } from "../../(api)/api";
import routes, { ApiTypes } from "../../(api)/api-routes";
import ListContainer from "../../(components)/common/list-container";
import IrritantItem from "../../skin-solver/irritant-item";
import IrritantListItem from "../../(components)/common/irritant-list-item";

export default function Results() {
  const { data: skinProfile, ...skinProfileQuery } = useFetchApi<
    ApiTypes["skinProfile"]["get"]
  >(
    routes.skinProfile,
    {},
    {
      suspense: false,
    }
  );

  const duplicateIrritants = skinProfile?.duplicateIrritants || [];
  const skinTypeIrritants = skinProfile?.skinTypeClassIrritants || [];
  const explicitIrritants = skinProfile?.explicitlyAddedIrritants || [];

  const allIrritants = [
    ...duplicateIrritants,
    ...skinTypeIrritants,
    ...explicitIrritants,
  ];

  const duplicateComponents = duplicateIrritants.map((ingredient, key) => (
    <IrritantListItem
      key={key * 3}
      ingredient={ingredient}
      reason="duplicate"
    />
  ));
  const skinTypeComponents = skinTypeIrritants.map((ingredient, key) => (
    <IrritantListItem
      key={key * 3 + 1}
      ingredient={ingredient}
      reason="skinType"
    />
  ));

  const explicitComponents = explicitIrritants.map((ingredient, key) => (
    <IrritantListItem
      key={key * 3 + 2}
      ingredient={ingredient}
      reason="explicit"
    />
  ));

  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-xl mb-1">Irritant Analyze Results</h1>
        <p className="text-stone-600">
          On this page you can find a list of ingredients that are likely to
          irritate your skin. These results were calculated based on your inputs
          at{" "}
          <Link
            href={"/account/manage-irritants"}
            className="underline cursor-pointer"
          >
            manage irritants page
          </Link>
          . You can click an ingredient to get more information about it.
        </p>
      </div>
      <div>
        <ListContainer
          heading="Irritating Ingredients"
          empty="Your irritants will appear here."
          isLoading={skinProfileQuery.isLoading}
        >
          {duplicateComponents}
          {skinTypeComponents}
          {explicitComponents}
        </ListContainer>
      </div>
    </>
  );
}
