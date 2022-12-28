import { AnchorButton } from "../(ui)/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export default function UnderConstruction() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center h-96 bg-zinc-900 text-white gap-2">
      <h1 className="font-medium text-3xl">This page is under construction</h1>
      <p>
        We are working hard to make this very page! Please check back later.
      </p>
      <AnchorButton
        className="mt-8 inline-flex items-center gap-2"
        intent="secondary"
        href={"/"}
      >
        Go back to the homepage{" "}
        <FontAwesomeIcon className="h-4" icon={faArrowRightLong} />
      </AnchorButton>
    </div>
  );
}
