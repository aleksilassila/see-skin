import Toggle, { ToggleData, useToggleState } from "../ui/toggle";
import { Button } from "../ui/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const skinTypeToggleData = {
  dry: false,
  normal: false,
  oily: false,
  combination: false,
} satisfies ToggleData;

const sensitive = {
  sensitive: false,
} satisfies ToggleData;

export default function SkinTypeSelect() {
  const skinTypeToggles = useToggleState(skinTypeToggleData, false);
  const sensitiveToggle = useToggleState(sensitive, false);

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl mx-auto px-10 py-6 gap-4 border border-stone-400">
      <h2 className="text-center text-lg font-medium text-zinc-800">
        What is your skin type?
      </h2>
      <div className="grid grid-cols-2 gap-4 w-64">
        <Toggle
          value={skinTypeToggles.values.dry}
          toggle={skinTypeToggles.toggle("dry")}
        >
          Dry
        </Toggle>
        <Toggle
          value={skinTypeToggles.values.normal}
          toggle={skinTypeToggles.toggle("normal")}
        >
          Normal
        </Toggle>
        <Toggle
          value={skinTypeToggles.values.oily}
          toggle={skinTypeToggles.toggle("oily")}
        >
          Oily
        </Toggle>
        <Toggle
          value={skinTypeToggles.values.combination}
          toggle={skinTypeToggles.toggle("combination")}
        >
          Combination
        </Toggle>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-zinc-600">Do you have a sensitive skin?</h2>
        <Toggle
          value={sensitiveToggle.values.sensitive}
          toggle={sensitiveToggle.toggle("sensitive")}
          className="w-32"
        >
          Sensitive
        </Toggle>
      </div>
      <Button
        intent="primary"
        disabled={!skinTypeToggles.getFirstActive()}
        trailingIcon={faArrowRight}
      >
        Continue
      </Button>
    </div>
  );
}
