import { HTMLAttributes, useState } from "react";

interface Props {
  updateSkinType: (value: string | undefined) => void;
}

const SkinTypeSelect = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const [skinType, setSkinType] = useState<string | undefined>(undefined);

  return (
    <div
      className="flex flex-col items-center justify-center flex-1"
      {...props}
    >
      <div className="text-center mb-4">
        <h1 className="font-medium text-md">To get started</h1>
        <h1 className="font-bold text-2xl">Select your skin type.</h1>
      </div>
      <select
        value={skinType}
        onChange={(e) => {
          setSkinType(e.target.value);
          props.updateSkinType(
            e.target.value === "unset" ? undefined : e.target.value
          );
        }}
      >
        <option value={"unset"}>Select Skin Type</option>
        <option value="dry">Dry</option>
        <option value="combination">Combination</option>
        <option value="oily">Oily</option>
      </select>
    </div>
  );
};

export default SkinTypeSelect;
