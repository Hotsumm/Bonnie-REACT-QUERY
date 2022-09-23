import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, isLoading, isError, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['sw-people'],
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
      }
    );

  if (isLoading) return <p className="loading">Loading...</p>;
  if (isError) return <p className="error">Something went wrong...</p>;
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <p className="loading">Loading...</p>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) =>
          pageData.results.map((person) => (
            <Person
              name={person.name}
              hairColor={person.hairColor}
              eyeColor={person.eyeColor}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
