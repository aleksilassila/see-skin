import Link from "next/link";

export default function Results() {
  return (
    <>
      <div>
        <h1 className="font-bold text-xl">Irritant Analyze Results</h1>
        <p className="text-stone-700">
          On this page you can find a list of ingredients that are likely to
          irritate your skin. These results were calculated based on your inputs
          at{" "}
          <Link
            href={"/account/manage-irritants"}
            className="underline cursor-pointer"
          >
            manage irritants page
          </Link>
          .
        </p>
      </div>
    </>
  );
}
