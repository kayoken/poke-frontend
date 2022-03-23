import React from "react";

const PrevNext = ({ currentPage, onButtonClick }) => {
  const previousUrl = currentPage.previous;
  const nextUrl = currentPage.next;

  return (
    <footer>
      <button
        disabled={previousUrl === null && true}
        onClick={() => onButtonClick(currentPage.previous)}
      >
        Previous
      </button>
      <button
        disabled={nextUrl === null && true}
        onClick={() => onButtonClick(currentPage.next)}
      >
        Next
      </button>
    </footer>
  );
};

export default PrevNext;
