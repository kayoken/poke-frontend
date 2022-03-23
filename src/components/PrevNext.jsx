import React from "react";

const PrevNext = ({ currentPage }) => {
  function handleClick(url) {
    console.log(url);
  }

  const previousUrl = currentPage.previous;
  const nextUrl = currentPage.next;

  return (
    <footer>
      <button
        disabled={previousUrl === null && true}
        onClick={() => handleClick(currentPage.previous)}
      >
        Previous
      </button>
      <button onClick={() => handleClick(currentPage.next)}>Next</button>
    </footer>
  );
};

export default PrevNext;
