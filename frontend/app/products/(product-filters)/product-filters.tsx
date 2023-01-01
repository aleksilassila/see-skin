export function useProductFiltersState() {
  return {};
}

interface Props {}

export default function ProductFilters({
  ...state
}: ReturnType<typeof useProductFiltersState> & Props) {
  return <div className="flex flex-col border-r">Filters</div>;
}
