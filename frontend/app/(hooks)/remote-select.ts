import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface RemoteSelectState<T> {
  searchResults: T[];
  setSearchResults: Dispatch<SetStateAction<T[]>>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selected: T[];
  setSelected: Dispatch<SetStateAction<T[]>>;
}

export function useRemoteSelectState<T>(
  fetcher: (searchTerm: string, selected: T[]) => Promise<T[]>
): RemoteSelectState<T> {
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [selected, setSelected] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetcher(searchTerm, selected)
        .then((res) => setSearchResults(res))
        .catch(console.error);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return {
    searchResults,
    setSearchResults,
    searchTerm,
    setSearchTerm,
    selected,
    setSelected,
  };
}
