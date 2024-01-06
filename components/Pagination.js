import React, { useState } from "react";
import { Pagination } from "react-instantsearch";

const CustomPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (event) => {
    console.log("page change", event);
    // Update the current page
    setCurrentPage(event.selected);

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change this to 'auto' for instant scrolling
    });
  };

  return (
    <div>
      {/* Your other Algolia components go here */}
      <Pagination
        showLast={false}
        totalPages={10} // Replace with the actual total number of pages
        currentRefinement={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;
