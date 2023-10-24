import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import React, { useEffect, useRef, useState } from "react";
import { iStyles } from "../Interfaces/Interfaces";

interface iPageNavigation {
  all: Array<number>;
  displayed: Array<number>;
  hidden: Array<number>;
  previouslyDisplayed: Array<number>;
}

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
  const [currentNumberOfItems, setCurrentNumberOfItems] =
    useState<number>(quantityPerPage);

  const inputRef = useRef<HTMLSelectElement | null>(null);

  let NumberOfPages: number = Math.floor(
    allData.length / Number(quantityPerPage)
  );
  let buttonsLabelsArray: Array<number> = [];

  for (var i = 0; i <= NumberOfPages; i++) {
    buttonsLabelsArray.push(i);
  }

  const [pagesNavigation, setPagesNavigations] = useState({
    all: buttonsLabelsArray.slice(
      startingPoint - 1,
      endPointMultiplicator * quantityPerPage
    ),
    displayed: buttonsLabelsArray
      .slice(startingPoint - 1, endPointMultiplicator * quantityPerPage)
      ?.slice(0, 10),
    hidden: buttonsLabelsArray
      .slice(startingPoint - 1, endPointMultiplicator * quantityPerPage)
      .slice(10),
    previouslyDisplayed: [],
  });

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

  const changeQuantityPerPage = () => {
    if (
      inputRef.current.value?.length > 0 &&
      Number(inputRef.current.value) > 0
    ) {
      setQuantityPerPage(Number(inputRef.current.value));
      setCurrentNumberOfItems(Number(inputRef.current.value));
      setStartingPoint(1);
      setendPointMultiplicator(1);
      setCurrentContent(allData.slice(0, Number(inputRef.current.value)));
    } else {
    }
  };

  //set the navigation buttons when quatityPerPage or StartingPoint or EndPointMultiplicator changes
  useEffect(() => {
    setPagesNavigations((p: iPageNavigation) => {
      return {
        all: buttonsLabelsArray.slice(
          startingPoint - 1,
          endPointMultiplicator * quantityPerPage
        ),
        displayed: buttonsLabelsArray
          .slice(startingPoint - 1, endPointMultiplicator * quantityPerPage)
          ?.slice(0, 10),
        hidden: buttonsLabelsArray
          .slice(startingPoint - 1, endPointMultiplicator * quantityPerPage)
          .slice(10),
        previouslyDisplayed: p.previouslyDisplayed,
      };
    });
  }, [quantityPerPage, startingPoint, endPointMultiplicator]);

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
      {pagesNavigation.previouslyDisplayed?.length > 0 && (
        <button
          style={{
            ...Styles.bottonOnFocus,
            backgroundColor: "#ddd6fe",
            color: "black",
            border: "1px solid rgb(0,0,0,0.3)",
          }}
          onClick={() => {
            setPagesNavigations((p) => {
              return {
                all: p.all,
                displayed: p.previouslyDisplayed,
                hidden: p.displayed,
                previouslyDisplayed: [],
              };
            });
          }}
        >
          ...
        </button>
      )}
      {pagesNavigation.displayed.map((elements, index) => {
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
      {pagesNavigation.hidden.length > 0 && (
        <button
          style={{
            ...Styles.bottonOnFocus,
            backgroundColor: "#ddd6fe",
            color: "black",
            border: "1px solid rgb(0,0,0,0.3)",
          }}
          onClick={() => {
            setPagesNavigations((p) => {
              return {
                all: p.all,
                displayed: p.hidden,
                hidden: [],
                previouslyDisplayed: p.displayed,
              };
            });
          }}
        >
          ...
        </button>
      )}
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
            <select
              placeholder="Set page quantity"
              ref={inputRef}
              style={{ ...Styles?.input, width: "50px" }}
              onChange={() => {
                changeQuantityPerPage();
              }}
              defaultValue={quantityPerPage}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
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
