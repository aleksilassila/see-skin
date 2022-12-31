import { IngredientClass } from "../../../(api)/solver/fetch-irritants";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { Button } from "../../../(ui)/Button";
import classNames from "classnames";

export type SelectIngredientClassState = ReturnType<
  typeof useSelectIngredientClassState
>;

enum none {
  NONE = "NONE",
}

type Selectable = IngredientClass | none;

const selectable = (["NONE", ...Object.values(IngredientClass)] as const).map(
  (name, id) => ({
    id,
    name,
  })
);

export function useSelectIngredientClassState() {
  const [selectedClass, setSelectedClass] = useState<typeof selectable[number]>(
    selectable[0]
  );
  const [classes, setClasses] = useState<IngredientClass[]>([]);
  return {
    classes,
    setClasses,
    selectedClass,
    setSelectedClass,
  };
}

export default function SelectIngredientClasses(
  state: SelectIngredientClassState
) {
  function addSelectedClass() {
    if (state.selectedClass.name === "NONE") return;

    state.setSelectedClass(selectable[0]);

    state.setClasses([
      ...state.classes,
      state.selectedClass.name as IngredientClass,
    ]);
  }

  function removeClass(clazz: IngredientClass) {
    return () => state.setClasses(state.classes.filter((c) => c !== clazz));
  }

  return (
    <div>
      <div className="inline-flex">
        <Listbox value={state.selectedClass} onChange={state.setSelectedClass}>
          <Listbox.Button>{state.selectedClass.name}</Listbox.Button>
          <Listbox.Options className="w-full">
            {selectable.map((selectable) => {
              const disabled = state.classes.includes(
                selectable.name as IngredientClass
              );
              return (
                <Listbox.Option
                  key={selectable.id}
                  value={selectable}
                  disabled={disabled}
                  className={classNames({
                    "cursor-pointer": !disabled,
                    "text-stone-500": disabled,
                  })}
                >
                  {selectable.name}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Listbox>
        <Button
          disabled={
            state.selectedClass.name === "NONE" ||
            state.classes.includes(state.selectedClass.name as IngredientClass)
          }
          onClick={addSelectedClass}
        >
          Add
        </Button>
      </div>
      <div>
        <div>Classes to add (Click to remove):</div>
        {state.classes.map((selectedClass, id) => (
          <div
            onClick={removeClass(selectedClass)}
            key={id}
            className="cursor-pointer"
          >
            {selectedClass}
          </div>
        ))}
      </div>
    </div>
  );
}
