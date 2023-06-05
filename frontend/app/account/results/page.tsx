"use client";
import Link from "next/link";
import { useFetchApi } from "../../(api)/api";
import { GetSkinProfile } from "../../(api)/api-routes";
import { ResultItems } from "../../(components)/create-skin-profile-modal/result-items";

export default function Results() {
  const { data: skinProfile, ...skinProfileQuery } =
    useFetchApi<GetSkinProfile>(
      "/skin-profile",
      {},
      {
        suspense: false,
      }
    );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-bold text-xl mb-1">Irritant Analyze Results</h1>
        <p className="text-stone-600">
          On this page you can find a list of ingredients that are likely to
          irritate your skin. These results were calculated based on your inputs
          at{" "}
          <Link
            href={"/account/manage-irritants"}
            className="underline cursor-pointer"
          >
            manage irritants page
          </Link>
          . You can click an ingredient to get more information about it.
        </p>
      </div>
      <div>
        <ResultItems
          skinProfile={skinProfile}
          loading={skinProfileQuery.isLoading}
        />
      </div>
    </div>
  );
}
