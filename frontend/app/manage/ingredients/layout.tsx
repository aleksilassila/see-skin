import { PropsWithChildren } from "react";
import Link from "next/link";

export default function ManageIngredientsLayout(props: PropsWithChildren<{}>) {
  return (
    <div>
      <div className="border-b mb-2 flex gap-2 p-1">
        <Link href="/manage/ingredients" className="underline">
          Browse
        </Link>
        <Link href="/manage/ingredients/actions" className="underline">
          Actions
        </Link>
      </div>
      {props.children}
    </div>
  );
}
