import { Fragment, PropsWithChildren } from "react";
import classNames from "classnames";
import Drawer, { DrawerState } from "../../(components)/ui/drawer";
import { useToggle } from "../../(hooks)/use-toggle";

export type ProductFiltersState = ReturnType<typeof useProductFiltersState>;

export function useProductFiltersState() {
  const toggles = useToggle(
    {
      irritantFiltering: true,

      // Effect
      uvProtecting: true,
      antiAging: true,
      brightening: true,
      acneFighting: true,
      healing: true,

      // Category
      moisturizers: true,
      cleansers: true,
      sunscreens: true,
      treatments: true,
    },
    "product-filter-toggles"
  );

  return {
    toggles,
  };
}

interface Props {
  drawerState: DrawerState;
}

export default function ProductFilters({
  toggles,
  ...state
}: ReturnType<typeof useProductFiltersState> & Props) {
  const filterSection = classNames("px-4 py-2 flex flex-col gap-2");
  const sectionTitle = classNames("text-zinc-700 font-medium text-center");
  const sectionBody = classNames("grid grid-cols-2 gap-2");

  return (
    <FiltersContainer {...state.drawerState}>
      <div className="flex flex-col">
        {/*<h2 className="font-medium text-lg mb-2 text-center">Filter results</h2>*/}
        <div className="flex flex-col divide-y">
          <div className={filterSection}>
            <div className={sectionTitle}>Your Skin Type</div>
            <div className={sectionBody}>
              <Toggle toggles={toggles} toggleKey="irritantFiltering">
                Filter Irritants
              </Toggle>
            </div>
          </div>
          <div className={filterSection}>
            <div className={sectionTitle}>Category</div>
            <div className={sectionBody}>
              <Toggle toggles={toggles} toggleKey={"moisturizers"}>
                Moisturizers
              </Toggle>
              <Toggle toggles={toggles} toggleKey={"cleansers"}>
                Cleansers
              </Toggle>
              <Toggle toggles={toggles} toggleKey={"sunscreens"}>
                Sunscreens
              </Toggle>
              <Toggle toggles={toggles} toggleKey={"treatments"}>
                Treatments
              </Toggle>
            </div>
          </div>
          <div className={filterSection}>
            <div className={sectionTitle}>Brand</div>
            <div className={sectionBody}></div>
          </div>
          <div className={filterSection}>
            <div className={sectionTitle}>Effect</div>
            <div className={sectionBody}>
              <Toggle toggles={toggles} toggleKey="uvProtecting">
                UV-Protecting
              </Toggle>
              <Toggle toggles={toggles} toggleKey="antiAging">
                Anti-Aging
              </Toggle>
              <Toggle toggles={toggles} toggleKey="brightening">
                Brightening
              </Toggle>
              <Toggle toggles={toggles} toggleKey="acneFighting">
                Acne Fighting
              </Toggle>
              <Toggle toggles={toggles} toggleKey="healing">
                Healing
              </Toggle>
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
      <div className="hidden sm:block border-r p-2 bg-zinc-100">{children}</div>
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

function Toggle<T extends { [key: string]: boolean }>(
  props: PropsWithChildren<{
    toggles: ReturnType<typeof useToggle<T>>;
    toggleKey: keyof T;
  }>
) {
  const enabled = props.toggles.state[props.toggleKey];

  const className = classNames(
    "border rounded-xl text-sm font-medium",
    "px-3 py-1 cursor-pointer",
    enabled ? "text-black" : "text-zinc-700",
    {
      "bg-blue-500": enabled,
    }
  );

  return (
    <div
      className={className}
      onClick={() => props.toggles.toggle(props.toggleKey)}
    >
      {props.children}
    </div>
  );
}
