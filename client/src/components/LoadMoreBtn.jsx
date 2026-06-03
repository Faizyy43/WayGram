import React from 'react'

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <button
              className="mx-auto my-6 block rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-neutral-800 hover:text-white"
              onClick={handleLoadMore}
            >
              Load more.
            </button>
          )}
    </>
  );
};

export default LoadMoreBtn
