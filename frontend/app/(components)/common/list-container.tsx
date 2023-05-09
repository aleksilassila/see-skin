import { PropsWithChildren, ReactNode } from "react";

export default function ListContainer(
  props: PropsWithChildren<{ heading: ReactNode; empty: ReactNode }>
) {
  return (
    <div className="flex flex-col border border-stone-200 rounded overflow-hidden">
      <div className="bg-stone-100 p-4 py-1 font-medium text-stone-700">
        {props.heading}
      </div>
      <div className="flex flex-col gap-2 bg-stone-50">
        {props.children || (
          <div className="text-center text-stone-500 text-sm py-4">
            {props.empty}
          </div>
        )}
      </div>
    </div>
  );
}
