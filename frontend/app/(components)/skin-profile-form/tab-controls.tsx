import { Dispatch, SetStateAction } from "react";
import { UseQueryResult } from "react-query";
import { Button } from "../../(ui)/Button";

export function tabControls({
  selectedIndex,
  setSelectedIndex,
  resultsQuery,
}: {
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  resultsQuery: UseQueryResult<any>;
}) {
  return function TabControls({ canAdvance }: { canAdvance: boolean }) {
    const nextButton = (
      <Button
        size="sm"
        disabled={!canAdvance}
        loading={resultsQuery.isFetching}
        onClick={() => {
          if (selectedIndex === 1 && !resultsQuery.isFetching) {
            resultsQuery
              .refetch()
              .then(() => setSelectedIndex((prev) => prev + 1))
              .catch();
          } else {
            setSelectedIndex((prev) => prev + 1);
          }
        }}
      >
        Next
      </Button>
    );
    const previousButton = (
      <Button size="sm" onClick={() => setSelectedIndex((prev) => prev - 1)}>
        Previous
      </Button>
    );

    if (selectedIndex === 0) {
      return nextButton;
    } else if (selectedIndex === 2) {
      return previousButton;
    }

    return (
      <div className="flex gap-2">
        {previousButton}
        {nextButton}
      </div>
    );
  };
}

export type TabControlsRendered = ReturnType<typeof tabControls>;
