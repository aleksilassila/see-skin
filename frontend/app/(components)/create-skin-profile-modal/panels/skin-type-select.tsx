import Toggle, { ToggleData, useToggleState } from "../../ui/toggle";
import { useCreateSkinProfileModalState } from "../create-skin-profile-modal";
import { useSwitch } from "../../../(hooks)/use-toggle";
import { SkinType } from "../../../(api)/api-types";

export type SkinTypeSelectState = ReturnType<typeof useSkinTypeSelectState>;

export function useSkinTypeSelectState() {
  const skinTypeSwitch = useSwitch({
    [SkinType.NORMAL]: false,
    [SkinType.OILY]: false,
    [SkinType.DRY]: false,
    [SkinType.COMBINATION]: false,
  });
  const sensitiveSwitch = useSwitch({
    SENSITIVE: false,
  });

  function getSkinType(): SkinType | undefined {
    const skinType = Object.entries(skinTypeSwitch.state).find(
      ([_, value]) => value
    )?.[0];
    return skinType as SkinType;
  }

  return {
    skinTypeSwitch,
    sensitiveSwitch,
    getSkinType,
  };
}

export function SkinTypeSelect({
  skinTypeSwitch,
  sensitiveSwitch,
}: SkinTypeSelectState) {
  return (
    <>
      <h2 className="text-center text-lg font-medium text-zinc-800">
        What is your skin type?
      </h2>
      <div className="grid grid-cols-2 gap-4 w-64">
        <Toggle
          value={skinTypeSwitch.state.NORMAL}
          toggle={skinTypeSwitch.toggle(SkinType.NORMAL)}
        >
          Dry
        </Toggle>
        <Toggle
          value={skinTypeSwitch.state.OILY}
          toggle={skinTypeSwitch.toggle(SkinType.OILY)}
        >
          Normal
        </Toggle>
        <Toggle
          value={skinTypeSwitch.state.DRY}
          toggle={skinTypeSwitch.toggle(SkinType.DRY)}
        >
          Oily
        </Toggle>
        <Toggle
          value={skinTypeSwitch.state.COMBINATION}
          toggle={skinTypeSwitch.toggle(SkinType.COMBINATION)}
        >
          Combination
        </Toggle>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-zinc-600">Do you have a sensitive skin?</h2>
        <Toggle
          value={sensitiveSwitch.state.SENSITIVE}
          toggle={sensitiveSwitch.toggle("SENSITIVE")}
          className="w-32"
        >
          Sensitive
        </Toggle>
      </div>
    </>
  );
}
