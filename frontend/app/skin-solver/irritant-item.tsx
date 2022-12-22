import { IngredientGroup } from "../(api)/solver/fetch-irritants";
import { ManageIngredient } from "../(api)/manage/ingredients";

interface Props {
  irritant: IngredientGroup;
}

function IngredientItem({ ingredient }: { ingredient: ManageIngredient }) {
  return (
    <div className="flex flex-row gap-2 ml-2">
      <div>
        {ingredient.name} ({ingredient.id})
      </div>
    </div>
  );
}

export default function IrritantItem({ irritant }: Props) {
  return (
    <div className="py-1">
      <div className="text-sm font-medium text-stone-700">{irritant.id}</div>
      <div>Function: {irritant.function}</div>
      <div>
        <div className="">Ingredients in this group:</div>
        {irritant.ingredients.map((ingredient, key) => (
          <IngredientItem key={key} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}
