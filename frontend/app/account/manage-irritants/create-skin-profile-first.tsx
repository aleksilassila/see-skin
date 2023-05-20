import { AnchorButton } from "../../(components)/ui/button";

export function CreateSkinProfileFirst() {
  return (
    <div className="flex flex-col items-center gap-4 my-16">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-medium">
          It looks like you don&apos;t have a SkinProfile set up.
        </h1>
        <p className="text-stone-700">
          This page is for managing your personal irritants.
        </p>
      </div>
      <AnchorButton href="/" intent="primary" nextLink>
        Create a Skin Profile
      </AnchorButton>
    </div>
  );
}
