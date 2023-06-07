"use client";

import { PropsWithChildren } from "react";
import classNames from "classnames";
import { useSwitch, useToggle } from "../../(hooks)/use-toggle";
import { XmarkButton } from "../../(components)/ui/button";
import { VisibleState } from "../../(components)/ui/drawer";
import { ProductCategory, ProductEffect } from "../../(api)/api-types";
import { useUser } from "../../user";
import { useFetchApi } from "../../(api)/api";
import { GetSkinProfile } from "../../(api)/api-routes";

export type ProductFiltersState = ReturnType<typeof useProductFiltersState>;

export function useProductFiltersState() {
  const irritantFilterToggle = useToggle(
    {
      irritantFiltering: true,
    },
    "irritant-filter-toggle"
  );

  const categorySwitch = useSwitch<ProductCategory>(
    {
      MOISTURIZERS: false,
      SUNSCREENS: false,
      TREATMENTS: false,
      CLEANSERS: false,
      EYE_CREAMS: false,
      FACE_WASHES: false,
      EXFOLIATORS: false,
      TONERS: false,
      FACE_MISTS: false,
      FACE_OILS: false,
      SERUMS: false,
      FACE_MASKS: false,
      MAKEUP_REMOVERS: false,
      LIP_CARES: false,
    },
    "product-category-switch"
  );

  const effectSwitch = useSwitch<ProductEffect>(
    {
      UV_PROTECTING: false,
      ANTI_AGING: false,
      BRIGHTENING: false,
      ACNE_FIGHTING: false,
      HEALING: false,
    },
    "product-effect-switch"
  );

  const filtersActive: number = Object.values({
    ...categorySwitch.state,
    ...effectSwitch.state,
    ...irritantFilterToggle.state,
  }).filter((value) => value).length;

  return {
    irritantFilterToggle,
    categorySwitch,
    effectSwitch,
    filtersActive,
  };
}

interface MobileProps extends ProductFiltersState {
  visibleState: VisibleState;
}

export function ProductFilters(props: ProductFiltersState) {
  return (
    <div className="hidden md:flex bg-stone-50 border border-stone-300 rounded-xl max-w-sm flex-col p-8 items-center gap-8 sticky top-28 self-start">
      <ProductFiltersContent {...props} />
    </div>
  );
}

export function ProductFiltersMobile(props: MobileProps) {
  if (!props.visibleState.isVisible) return null;

  return (
    <div className="fixed md:hidden bg-white inset-0 z-50 p-4 gap-4 flex flex-col">
      <div className="flex justify-end">
        <XmarkButton handleClick={props.visibleState.close} />
      </div>
      <ProductFiltersContent {...props} />
    </div>
  );
}

function ProductFiltersContent({
  irritantFilterToggle,
  categorySwitch,
  effectSwitch,
}: ProductFiltersState) {
  const sectionStyle = classNames("flex flex-col gap-2");
  const sectionTitle = classNames(
    "text-zinc-700 font-medium text-center text-lg"
  );
  const togglesContainerStyle = classNames("grid grid-cols-2 gap-2");

  const session = useUser();

  return (
    <>
      <div className={sectionStyle}>
        <div className={sectionTitle}>Use your Skin Solver Data</div>
        <div className="flex gap-2 items-center justify-center">
          <BigToggle
            selected={irritantFilterToggle.state.irritantFiltering}
            handleClick={() =>
              irritantFilterToggle.toggle("irritantFiltering")(true)
            }
            disabled={!session.skinProfile}
          >
            On
          </BigToggle>
          <BigToggle
            selected={!irritantFilterToggle.state.irritantFiltering}
            handleClick={() =>
              irritantFilterToggle.toggle("irritantFiltering")(false)
            }
            disabled={!session.skinProfile}
          >
            Off
          </BigToggle>
        </div>
        <div className="text-stone-400 text-sm tracking-wide text-center">
          {irritantFilterToggle.state.irritantFiltering && !!session.skinProfile
            ? "Your bad ingredients are now removed"
            : null}
          {!session.isSignedIn
            ? "Sign in to filter products based on your skin type"
            : null}
          {irritantFilterToggle.state.irritantFiltering &&
          session.isSignedIn &&
          !session.skinProfile
            ? "Create a SkinProfile to filter your irritants"
            : null}
        </div>
      </div>
      <div className={sectionStyle}>
        <div className={sectionTitle}>Category</div>
        <div className={togglesContainerStyle}>
          <Toggle
            selected={categorySwitch.state.MOISTURIZERS}
            handleClick={categorySwitch.toggle(ProductCategory.MOISTURIZERS)}
          >
            Moisturizers
          </Toggle>
          <Toggle
            selected={categorySwitch.state.CLEANSERS}
            handleClick={categorySwitch.toggle(ProductCategory.CLEANSERS)}
          >
            Cleansers
          </Toggle>
          <Toggle
            selected={categorySwitch.state.SUNSCREENS}
            handleClick={categorySwitch.toggle(ProductCategory.SUNSCREENS)}
          >
            Sunscreens
          </Toggle>
          <Toggle
            selected={categorySwitch.state.TREATMENTS}
            handleClick={categorySwitch.toggle(ProductCategory.TREATMENTS)}
          >
            Treatments
          </Toggle>
          <Toggle
            selected={categorySwitch.state.TONERS}
            handleClick={categorySwitch.toggle(ProductCategory.TONERS)}
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
            selected={effectSwitch.state.UV_PROTECTING}
            handleClick={effectSwitch.toggle(ProductEffect.UV_PROTECTING)}
          >
            UV-Protecting
          </Toggle>
          <Toggle
            selected={effectSwitch.state.ANTI_AGING}
            handleClick={effectSwitch.toggle(ProductEffect.ANTI_AGING)}
          >
            Anti-Aging
          </Toggle>
          <Toggle
            selected={effectSwitch.state.BRIGHTENING}
            handleClick={effectSwitch.toggle(ProductEffect.BRIGHTENING)}
          >
            Brightening
          </Toggle>
          <Toggle
            selected={effectSwitch.state.ACNE_FIGHTING}
            handleClick={effectSwitch.toggle(ProductEffect.ACNE_FIGHTING)}
          >
            Acne Fighting
          </Toggle>
          <Toggle
            selected={effectSwitch.state.HEALING}
            handleClick={effectSwitch.toggle(ProductEffect.HEALING)}
          >
            Healing
          </Toggle>
        </div>
      </div>
    </>
  );
}

type ToggleProps = PropsWithChildren<{
  selected: boolean;
  handleClick: () => void;
  disabled?: boolean;
}>;

function BigToggle(props: ToggleProps) {
  const className = classNames(
    "border rounded-xl font-medium select-none",
    "px-8 py-1.5 text-center",
    {
      "text-white bg-blue-500 border-transparent": props.selected,
      "text-black bg-white border border-stone-300": !props.selected,
      "opacity-50 cursor-not-allowed": props.disabled,
      "cursor-pointer": !props.disabled,
    }
  );

  return (
    <div
      className={className}
      onClick={() => !props.disabled && props.handleClick()}
    >
      {props.children}
    </div>
  );
}

function Toggle(props: ToggleProps) {
  const className = classNames(
    "border rounded-xl text-sm font-medium select-none",
    "px-4 py-1.5 cursor-pointer text-center",
    {
      "text-white bg-blue-500 border-transparent": props.selected,
      "text-black bg-white border border-stone-300": !props.selected,
    }
  );

  return (
    <div className={className} onClick={props.handleClick}>
      {props.children}
    </div>
  );
}
