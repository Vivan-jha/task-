import React, { useRef, useEffect } from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import ImageGrid from '../components/Imagegrid';

const PAGE_SIZE = 20;

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchRecognitionPage = async ({ pageParam = 1 }) => {
    const res = await fetch(`http://localhost:8000/api/recognitions?page=${pageParam}`);
    const responseData = await res.json();
    return responseData.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["test"],
    fetchRecognitionPage,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGE_SIZE) {
          return undefined;
        }
        return allPages.length + 1;
      },
    }
  );

  const allRecognitionData = data?.pages.flatMap(page => page) || [];

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = containerElement;
      if (scrollHeight - (scrollTop + clientHeight) < 100) {
        fetchNextPage();
      }
    };

    containerElement.addEventListener('scroll', handleScroll);

    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="flex">
      <div className="my-masonry-grid" ref={containerRef} style={{ height: '1000px', overflowY: 'scroll', paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px' }}>
  <ImageGrid recognitionData={allRecognitionData} />
</div>

    </section>
  );
};

export default Home;
///////////////////////////////////////////////////


