import { SkinProfile } from "../../(api)/api-types";
import IrritantListItem from "../common/irritant-list-item";
import ListContainer from "../common/list-container";

export function ResultItems(props: {
  skinProfile?: SkinProfile;
  loading?: boolean;
}) {
  const skinProfile = props.skinProfile;
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
    <ListContainer
      heading="Irritating Ingredients"
      empty="Your irritants will appear here."
      isLoading={props.loading}
    >
      {duplicateComponents}
      {skinTypeComponents}
      {explicitComponents}
    </ListContainer>
  );
}
