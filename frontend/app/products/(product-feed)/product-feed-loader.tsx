"use client";

import { Ref, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useProductFeedLoader(loadMoreContent: () => void) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) loadMoreContent();
  }, [inView]);

  return { ref, inView };
}

export default function ProductFeedLoader({
  loaderRef,
  isLoading,
}: {
  loaderRef: Ref<any>;
  isLoading: boolean;
}) {
  return <div ref={loaderRef}>{isLoading && <div>Loading...</div>}</div>;
}
