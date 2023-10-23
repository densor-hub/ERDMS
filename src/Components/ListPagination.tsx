import React, { useState } from "react";

const ListPagination = ({
  ArrayOfItems,
  QuantityPerPage,
  startingPoint,
  setStartingPoint,
  endPointMultiplicator,
  setendPointMultiplicator,
  setCurrentContent,
  currentContent,
}) => {
  let NumberOfPages = Math.floor(ArrayOfItems.length / Number(QuantityPerPage));
  let buttonsLabelsArray = [];

  for (var i = 0; i < NumberOfPages; i++) {
    buttonsLabelsArray.push(i + 1);
  }

  const moveToNext = () => {
    if (buttonsLabelsArray.length - Number(startingPoint) > QuantityPerPage) {
      setStartingPoint(QuantityPerPage * endPointMultiplicator);
      setendPointMultiplicator(endPointMultiplicator + 1);
    }
  };

  const moveToPrevious = () => {
    if (Number(startingPoint) !== QuantityPerPage && startingPoint > 1) {
      setStartingPoint(startingPoint - QuantityPerPage);
      setendPointMultiplicator(endPointMultiplicator - 1);
    } else if (Number(startingPoint) === QuantityPerPage) {
      setStartingPoint(1);
      setendPointMultiplicator(1);
    }
  };

  const moveToLast = () => {
    setStartingPoint(
      Math.floor(NumberOfPages / QuantityPerPage) * QuantityPerPage
    );
    setendPointMultiplicator(Math.ceil(NumberOfPages / QuantityPerPage));
  };

  const moveToFirst = () => {
    setStartingPoint(1);
    setendPointMultiplicator(1);
  };

  return (
    <div
      style={{
        width: "100%",
        fontSize: "small",
        padding: "10px 0px",
        backgroundColor: "#E8E8E8",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <button
        style={{ backgroundColor: "#e6e6ff" }}
        onClick={(e) => {
          e.preventDefault();
          moveToPrevious();
        }}
      >
        « Previous
      </button>{" "}
      <button
        onClick={(e) => {
          moveToFirst();
        }}
      >
        First
      </button>
      {buttonsLabelsArray
        .slice(startingPoint - 1, endPointMultiplicator * QuantityPerPage)
        .map((elements, index) => {
          return (
            <button
              style={
                currentContent[0] ===
                ArrayOfItems[Number(elements) * Number(QuantityPerPage)]
                  ? { backgroundColor: "#9999ff", color: "white" }
                  : {
                      border: "0px",
                      textAlign: "center",
                      margin: "0px",
                      padding: "10px",
                      height: "100%",
                      backgroundColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
              }
              key={index}
              onClick={() => {
                setCurrentContent(
                  ArrayOfItems.slice(
                    Number(elements) * QuantityPerPage,
                    Number(elements) * QuantityPerPage + QuantityPerPage
                  )
                );
              }}
            >
              {elements}
            </button>
          );
        })}
      <button
        onClick={(e) => {
          e.preventDefault();
          moveToLast();
        }}
      >
        Last
      </button>
      <button
        style={{
          backgroundColor: "#e6e6ff",
        }}
        onClick={(e) => {
          e.preventDefault();
          moveToNext();
        }}
      >
        Next »
      </button>{" "}
    </div>
  );
};

export default ListPagination;
