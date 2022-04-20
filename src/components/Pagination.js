import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import Icons from "../assets/icons/Icons";

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
      <li
        className={"page-item " + (number === currentPage ? "active" : "")}
        key={number}
      >
        <button
          className="page-link"
          onClick={() => {
            setCurrentPage(number);
            onChange(number);
          }} 
        >
          {number}
        </button>
      </li>
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
    <div
      id={nanoid()}
      className={
        "flex items-center justify-between py-3  " +
        (totalRow === 0 ? "hidden" : "")
      }
    >
      <div>
        <p className="text-sm ">
          แสดง <span className="font-medium">{currentPage}</span> จาก{" "}
          <span className="font-medium">{totalPage}</span> หน้า (
          <span className="font-medium">ทั้งหมด {totalRow} รายการ</span> )
        </p>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-primary  justify-content-end">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => {
                prevPage();
              }} 
            >
              Previous
            </button>
          </li>
          {items}
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => {
                nextPage();
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
