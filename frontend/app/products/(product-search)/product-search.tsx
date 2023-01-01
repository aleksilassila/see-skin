export function useProductSearchState() {
  return {};
}

interface Props {}

export default function ProductSearch({
  ...state
}: ReturnType<typeof useProductSearchState> & Props) {
  return <div className="border-b">Search</div>;
}
