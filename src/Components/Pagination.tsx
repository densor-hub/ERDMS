import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import React, { useEffect, useRef, useState } from "react";
import { iStyles } from "../Interfaces/Interfaces";

interface iPagination {
  allData: Array<any>;
  quantityPerPage: number;
  setQuantityPerPage: Function;
  startingPoint: number;
  setStartingPoint: Function;
  endPointMultiplicator: number;
  setendPointMultiplicator: Function;
  currentContent: Array<any>;
  setCurrentContent: Function;
  Styles: iStyles;
}

const ListPagination = ({
  allData,
  quantityPerPage,
  setQuantityPerPage,
  startingPoint,
  setStartingPoint,
  endPointMultiplicator,
  setendPointMultiplicator,
  currentContent,
  setCurrentContent,
  Styles,
}: iPagination) => {
  // const Styles = {
  //   button: {
  //     display: "flex",
  //     border: "0px",
  //     textAlign: "",
  //     margin: "0px",
  //     padding: "2px",
  //     height: "100%",
  //     backgroundColor: "transparent",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     width: "25px",
  //   },
  //   bottonOnFocus: {
  //     backgroundColor: "#9999ff",
  //     color: "white",
  //     height: "25px",
  //     width: "20px",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   row: {
  //     width: "100%",
  //     fontSize: "small",
  //     padding: "10px 0px",
  //     backgroundColor: "#E8E8E8",
  //     position: "relative",
  //   },
  //   input: {
  //     width: "128px",
  //   },
  // };

  const [currentNumberOfItems, setCurrentNumberOfItems] =
    useState(quantityPerPage);
  const [feedback, setFeedback] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  let NumberOfPages = Math.floor(allData.length / Number(quantityPerPage));
  let buttonsLabelsArray = [];

  for (var i = 0; i <= NumberOfPages; i++) {
    buttonsLabelsArray.push(i);
  }

  const moveToNext = () => {
    if (buttonsLabelsArray.length - Number(startingPoint) > quantityPerPage) {
      setStartingPoint(quantityPerPage * endPointMultiplicator + 1);
      setendPointMultiplicator(endPointMultiplicator + 1);

      setCurrentContent(
        allData.slice(
          quantityPerPage * endPointMultiplicator * quantityPerPage,
          quantityPerPage * endPointMultiplicator * quantityPerPage +
            quantityPerPage
        )
      );

      setCurrentNumberOfItems(
        (quantityPerPage * endPointMultiplicator + 1) * quantityPerPage
      );
    }
  };

  const moveToPrevious = () => {
    if (Number(startingPoint) !== quantityPerPage && startingPoint > 1) {
      setStartingPoint(startingPoint - quantityPerPage);
      setendPointMultiplicator(endPointMultiplicator - 1);

      setCurrentContent(
        allData?.slice(
          ((startingPoint * quantityPerPage - quantityPerPage) /
            quantityPerPage -
            quantityPerPage +
            1 -
            1) *
            quantityPerPage,
          ((startingPoint * quantityPerPage - quantityPerPage) /
            quantityPerPage -
            quantityPerPage +
            1 -
            1) *
            quantityPerPage +
            quantityPerPage
        )
      );

      setCurrentNumberOfItems(
        (startingPoint - quantityPerPage) * quantityPerPage
      );
    } else if (Number(startingPoint) === quantityPerPage) {
      setStartingPoint(1);
      setendPointMultiplicator(1);
    }
  };

  const moveToLast = () => {
    setStartingPoint(
      Math.floor(NumberOfPages / quantityPerPage) * quantityPerPage + 1
    );

    setendPointMultiplicator(Math.ceil(NumberOfPages / quantityPerPage));

    setCurrentContent(allData.slice(NumberOfPages * quantityPerPage));

    setCurrentNumberOfItems(NumberOfPages * quantityPerPage + quantityPerPage);
  };

  const moveToFirst = () => {
    setStartingPoint(1);
    setendPointMultiplicator(1);

    setCurrentContent(allData.slice(0, quantityPerPage));

    setCurrentNumberOfItems(quantityPerPage);
  };

  //clear feedback
  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  }, [feedback]);

  return (
    <div
      style={{
        ...Styles?.row,
      }}
    >
      <button
        style={{ ...Styles.button, width: "fit-content" }}
        onClick={(e) => {
          moveToFirst();
        }}
      >
        First
      </button>
      <button
        style={{
          ...Styles.button,
          width: "fit-content",
          margin: "0px 5px",
        }}
        onClick={(e) => {
          e.preventDefault();
          moveToPrevious();
        }}
      >
        <GiPreviousButton />
      </button>{" "}
      {buttonsLabelsArray
        .slice(startingPoint - 1, endPointMultiplicator * quantityPerPage)
        .map((elements, index) => {
          return (
            <button
              style={
                currentContent[0] ===
                allData[Number(elements) * Number(quantityPerPage)]
                  ? {
                      ...Styles?.bottonOnFocus,
                    }
                  : {
                      ...Styles?.button,
                    }
              }
              key={index}
              onClick={() => {
                setCurrentContent(
                  allData.slice(
                    Number(elements) * quantityPerPage,
                    Number(elements) * quantityPerPage + quantityPerPage
                  )
                );

                setCurrentNumberOfItems((elements + 1) * quantityPerPage);
              }}
            >
              {Number(elements + 1)}
            </button>
          );
        })}
      <button
        style={{
          ...Styles.button,
          width: "fit-content",
          margin: "0px 5px",
        }}
        onClick={(e) => {
          e.preventDefault();
          moveToNext();
        }}
      >
        <GiNextButton />
      </button>{" "}
      <button
        style={{
          ...Styles.button,
          width: "fit-content",
        }}
        onClick={(e) => {
          e.preventDefault();
          moveToLast();
        }}
      >
        Last
      </button>
      <div
        style={{
          position: "absolute",
          right: "0",
          marginRight: "10px",
          display: "flex",
        }}
      >
        <span style={{ display: "flex", marginRight: "10px" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{ color: "red", fontSize: "small", marginRight: "5px" }}
            >
              <span style={{ visibility: "hidden" }}>.</span>
              {feedback}
            </div>
            <input
              type="number"
              placeholder="Set page quantity"
              ref={inputRef}
              style={{ ...Styles?.input }}
            ></input>
          </div>
          <button
            style={{ ...Styles.bottonOnFocus }}
            onClick={() => {
              if (
                inputRef.current.value?.length > 0 &&
                Number(inputRef.current.value) > 0
              ) {
                setQuantityPerPage(Number(inputRef.current.value));
                setCurrentNumberOfItems(Number(inputRef.current.value));
                setStartingPoint(1);
                setendPointMultiplicator(1);
                setCurrentContent(
                  allData.slice(0, Number(inputRef.current.value))
                );
              } else {
                setFeedback("Enter valid number");
              }
            }}
          >
            Set
          </button>
        </span>
        <span>
          {`${currentNumberOfItems - quantityPerPage + 1} - ${
            Number(currentNumberOfItems) > Number(allData.length)
              ? allData.length
              : currentNumberOfItems
          } of ${allData.length} items`}
        </span>
      </div>
    </div>
  );
};

export default ListPagination;
