import { PropsWithChildren } from "react";
import classNames from "classnames";
import { useSwitch, useToggle } from "../../(hooks)/use-toggle";

export type ProductFiltersState = ReturnType<typeof useProductFiltersState>;

export function useProductFiltersState() {
  const irritantFilterToggle = useToggle(
    {
      irritantFiltering: true,
    },
    "irritant-filter-toggle"
  );

  const categorySwitch = useSwitch(
    {
      moisturizers: false,
      cleansers: false,
      sunscreens: false,
      treatments: false,
      toners: false,
    },
    "product-category-switch"
  );

  const effectSwitch = useSwitch(
    {
      uvProtecting: false,
      antiAging: false,
      brightening: false,
      acneFighting: false,
      healing: false,
    },
    "product-effect-switch"
  );

  return {
    irritantFilterToggle,
    categorySwitch,
    effectSwitch,
  };
}

interface Props {
  isVisible: boolean;
}

export default function ProductFilters({
  irritantFilterToggle,
  categorySwitch,
  effectSwitch,
  ...props
}: ReturnType<typeof useProductFiltersState> & Props) {
  const sectionStyle = classNames("flex flex-col gap-2");
  const sectionTitle = classNames(
    "text-zinc-700 font-medium text-center text-lg"
  );
  const togglesContainerStyle = classNames("grid grid-cols-2 gap-2");

  return (
    <div className="bg-stone-50 border border-stone-300 rounded-xl max-w-sm flex flex-col p-8 items-center gap-8 sticky top-[8.5rem] self-start">
      <div className={sectionStyle}>
        <div className={sectionTitle}>Use your Skin Solver Data</div>
        <div className="flex gap-2 items-center justify-center">
          <BigToggle
            enabled={irritantFilterToggle.state.irritantFiltering}
            handleClick={() =>
              irritantFilterToggle.toggle("irritantFiltering")(true)
            }
          >
            On
          </BigToggle>
          <BigToggle
            enabled={!irritantFilterToggle.state.irritantFiltering}
            handleClick={() =>
              irritantFilterToggle.toggle("irritantFiltering")(false)
            }
          >
            Off
          </BigToggle>
        </div>
        <div className="text-stone-400 text-sm tracking-wide">
          {irritantFilterToggle.state.irritantFiltering
            ? "Your bad ingredients are now removed"
            : null}
        </div>
      </div>
      <div className={sectionStyle}>
        <div className={sectionTitle}>Category</div>
        <div className={togglesContainerStyle}>
          <Toggle
            enabled={categorySwitch.state.moisturizers}
            handleClick={categorySwitch.toggle("moisturizers")}
          >
            Moisturizers
          </Toggle>
          <Toggle
            enabled={categorySwitch.state.cleansers}
            handleClick={categorySwitch.toggle("cleansers")}
          >
            Cleansers
          </Toggle>
          <Toggle
            enabled={categorySwitch.state.sunscreens}
            handleClick={categorySwitch.toggle("sunscreens")}
          >
            Sunscreens
          </Toggle>
          <Toggle
            enabled={categorySwitch.state.treatments}
            handleClick={categorySwitch.toggle("treatments")}
          >
            Treatments
          </Toggle>
          <Toggle
            enabled={categorySwitch.state.toners}
            handleClick={categorySwitch.toggle("toners")}
          >
            Toners
          </Toggle>
        </div>
      </div>
      {/*<div className={sectionStyle}>*/}
      {/*  <div className={sectionTitle}>Brand</div>*/}
      {/*  <div className={togglesContainerStyle}></div>*/}
      {/*</div>*/}
      <div className={sectionStyle}>
        <div className={sectionTitle}>Desired effect</div>
        <div className={togglesContainerStyle}>
          <Toggle
            enabled={effectSwitch.state.uvProtecting}
            handleClick={effectSwitch.toggle("uvProtecting")}
          >
            UV-Protecting
          </Toggle>
          <Toggle
            enabled={effectSwitch.state.antiAging}
            handleClick={effectSwitch.toggle("antiAging")}
          >
            Anti-Aging
          </Toggle>
          <Toggle
            enabled={effectSwitch.state.brightening}
            handleClick={effectSwitch.toggle("brightening")}
          >
            Brightening
          </Toggle>
          <Toggle
            enabled={effectSwitch.state.acneFighting}
            handleClick={effectSwitch.toggle("acneFighting")}
          >
            Acne Fighting
          </Toggle>
          <Toggle
            enabled={effectSwitch.state.healing}
            handleClick={effectSwitch.toggle("healing")}
          >
            Healing
          </Toggle>
        </div>
      </div>
    </div>
  );
}

type ToggleProps = PropsWithChildren<{
  enabled: boolean;
  handleClick: () => void;
}>;

function BigToggle(props: ToggleProps) {
  const className = classNames(
    "border rounded-xl font-medium select-none",
    "px-8 py-1.5 cursor-pointer text-center",
    {
      "text-white bg-blue-500 border-transparent": props.enabled,
      "text-black bg-white border border-stone-300": !props.enabled,
    }
  );

  return (
    <div className={className} onClick={props.handleClick}>
      {props.children}
    </div>
  );
}

function Toggle(props: ToggleProps) {
  const className = classNames(
    "border rounded-xl text-sm font-medium select-none",
    "px-4 py-1.5 cursor-pointer text-center",
    {
      "text-white bg-blue-500 border-transparent": props.enabled,
      "text-black bg-white border border-stone-300": !props.enabled,
    }
  );

  return (
    <div className={className} onClick={props.handleClick}>
      {props.children}
    </div>
  );
}
