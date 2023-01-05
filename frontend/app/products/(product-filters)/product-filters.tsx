import { Fragment, PropsWithChildren, useState } from "react";
import classNames from "classnames";
import Drawer, { DrawerState } from "../../(ui)/drawer";

const initialEffectFilter = {
  "UV-Protecting": false,
  "Anti-Aging": false,
  Brightening: false,
  "Acne Fighting": false,
  Healing: false,
};

const initialCategoryFilter = {
  Moisturizer: false,
  Cleanser: false,
  Sunscreen: false,
  Treatments: false,
};

export function useToggle(initial: { [key: string]: boolean }) {
  const [state, setState] = useState(initial);
  function toggle(key: string) {
    return function () {
      setState((state) => ({
        ...state,
        [key]: !state[key],
      }));
    };
  }

  return { state, setState, toggle };
}

export type ProductFiltersState = ReturnType<typeof useProductFiltersState>;

export function useProductFiltersState() {
  const effectFilter = useToggle(initialEffectFilter);
  const categoryFilters = useToggle(initialCategoryFilter);

  return {
    effectFilter,
    categoryFilters,
  };
}

interface Props {
  drawerState: DrawerState;
}

export default function ProductFilters({
  categoryFilters,
  effectFilter,
  ...state
}: ReturnType<typeof useProductFiltersState> & Props) {
  return (
    <FiltersContainer {...state.drawerState}>
      <div className="flex flex-col">
        {/*<h2 className="font-medium text-lg mb-2 text-center">Filter results</h2>*/}
        <div className="flex flex-col divide-y">
          <div className="px-4 py-2 flex flex-col gap-2">
            <div className="text-zinc-700 font-medium text-center">
              Category
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(initialCategoryFilter).map((text, key) => (
                <Toggle text={text} toggle={categoryFilters} key={key} />
              ))}
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col gap-2">
            <div className="text-zinc-700 font-medium text-center">Brand</div>
            <div className="grid grid-cols-2 gap-2"></div>
          </div>
          <div className="px-4 py-2 flex flex-col gap-2">
            <div className="text-zinc-700 font-medium text-center">Effect</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(effectFilter.state).map((id, key) => (
                <Toggle text={id} toggle={effectFilter} key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FiltersContainer>
  );
}

function FiltersContainer({
  children,
  ...state
}: PropsWithChildren<DrawerState>) {
  return (
    <Fragment>
      <div className="hidden sm:block border-r p-2 bg-zinc-50">{children}</div>
      <Drawer
        bgStyle="block sm:hidden"
        {...state}
        className="block sm:hidden bg-white top-0 bottom-0 left-0"
      >
        {children}
      </Drawer>
    </Fragment>
  );
}

function Toggle(
  props: PropsWithChildren<{
    text: string;
    toggle: ReturnType<typeof useToggle>;
  }>
) {
  const enabled = props.toggle.state[props.text];

  const className = classNames(
    "border rounded-xl text-sm font-medium",
    "px-3 py-1 cursor-pointer",
    enabled ? "text-black" : "text-zinc-700",
    {
      "bg-blue-500": enabled,
    }
  );

  return (
    <div className={className} onClick={props.toggle.toggle(props.text)}>
      {props.text}
    </div>
  );
}
