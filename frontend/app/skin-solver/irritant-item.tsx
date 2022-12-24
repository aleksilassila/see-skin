import { Ingredient } from "../(api)/solver/fetch-irritants";
import { IngredientAlias } from "../(api)/manage/ingredients";

interface Props {
  irritant: Ingredient;
}

function IngredientItem({ ingredient }: { ingredient: IngredientAlias }) {
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
      {irritant.aliases ? (
        <div>
          <div className="">Aliases for this ingredient:</div>
          {irritant.aliases.map((ingredient, key) => (
            <IngredientItem key={key} ingredient={ingredient} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
