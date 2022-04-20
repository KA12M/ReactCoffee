import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

Pagination.propTypes = {
  currentPages: PropTypes.number,
  totalPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPages: 1,
  totalPage: 1,
  onChange: (page) => {
    return page;
  },
};

export default function Pagination({
  onChange,
  currentPages,
  totalPage,
  totalRow,
}) {
  const [currentPage, setCurrentPage] = React.useState(currentPages);

  useEffect(() => {
    setCurrentPage(currentPages);
  }, [currentPages]);

  let maxPages = totalPage;
  let items = [];
  let leftSide = 0;
  let rightSide = 0;

  if (maxPages <= 5) {
    leftSide = 1;
    rightSide = maxPages;
  } else if (currentPage <= 4) {
    leftSide = 1;
    rightSide = 5;
  } else if (currentPage + 2 >= maxPages) {
    leftSide = maxPages - 4;
    rightSide = maxPages;
  } else {
    leftSide = currentPage - 2;
    rightSide = currentPage + 2;
  }

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <span
      className="m-2"
      key={number} 
        type="button"
        onClick={() => {
          setCurrentPage(number);
          onChange(number);
        }}
      >
        {number}
      </span>
    );
  }

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
      onChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onChange(currentPage - 1);
    }
  };
  return (
    < >
      <div className="col-lg-6 col-md-6 col-sm-6">
        <div className="shop__pagination">
          <a 
            type="button"
            onClick={() => {
              prevPage();
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </a> 
          {items}
          <a 
            type="button"
            onClick={() => {
              nextPage();
            }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6">
        <div className="shop__last__text">
          <p>
            แสดง {currentPage} จาก {totalPage} หน้า (ทั้งหมด {totalRow} รายการ )
          </p>
        </div>
      </div>
    </>
  );
}
