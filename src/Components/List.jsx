import { useState } from "react";
import { v4 as uuid } from "uuid";
import { convertMonthTo_ALPHABETS } from "../Functions/DateFunctions";

const List = ({
  CompleteData,
  Columns,
  OnTopOfTable,
  Actions,
  Date,
  onCancel,
}) => {
  var lengthOfArray;
  var gridColumns = "";

  if (Columns?.data[0]) {
    if (Actions?.length > 0) {
      lengthOfArray = Object.values(Columns?.data[0])?.length + 1;
    } else {
      lengthOfArray = Object.values(Columns?.data[0])?.length;
    }
  }
  for (var i = 0; i < lengthOfArray; i++) {
    gridColumns = gridColumns + `${100 / lengthOfArray + "%"} `;
  }

  const CalculateTotalCost = () => {
    let totalCost = 0;
    for (var i = 0; i < Columns?.data?.length; i++) {
      totalCost = Number(totalCost) + Number(Columns?.data[i]?.total_cost);
    }
    return totalCost;
  };

  //pagination
  return (
    <main className="border-l-2 w-full h-full relative">
      <section>
        {Columns?.data[0] && (
          <div className="border-b-2 h-[50px]  relative  bg-white  ">
            <div className="relative h-full  flex justify-between ">
              <div className="">
                <span>Total Cost </span>
                {"-- "}
                <span className="text-xl font-bold">
                  GHS {parseFloat(CalculateTotalCost())?.toLocaleString()}
                </span>
              </div>
              <button className="px-2 hover:bg-slate-700 text-white bg-slate-600">
                Submit
              </button>
            </div>
          </div>
        )}
        {Columns?.data[0] &&
          (Date?.title?.length > 0 || Date?.data?.length > 0) && (
            <div className="text-sm text-center h-[15px]">
              <span>{Date?.title && Date?.title}</span>
              {" : "}
              <span>{Date?.data && convertMonthTo_ALPHABETS(Date?.data)}</span>
            </div>
          )}
        <div>
          {OnTopOfTable &&
            Columns?.data[0] &&
            OnTopOfTable?.length > 0 &&
            OnTopOfTable?.map((data, index) => {
              return (
                <div key={index}>
                  <div className="text-lg font-semibold h-[30px] text-right ">
                    {`${data?.title} --`}
                  </div>
                  <div className="italic text-right text-red-600">
                    {data?.data?.map((i, index) => {
                      return (
                        index !== 0 && (
                          <span key={index} className="px-3">
                            {"--" + i}
                          </span>
                        )
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
        {Columns?.title && Columns?.data[0] && Columns?.title?.length > 0 && (
          <div
            className="grid w-full  bg-slate-300 h-[25px]"
            style={{ gridTemplateColumns: gridColumns }}
          >
            {Columns?.title?.map((title, index) => {
              //headings
              return (
                <div className="flex justify-center items-center" key={index}>
                  {title}
                </div>
              );
            })}
          </div>
        )}

        <section className="h-[calc(100vh-185px)] min-h-[350px] w-full overflow-y-scroll">
          {Columns?.data &&
            Columns?.data?.length > 0 &&
            Columns?.data?.map((item, index) => {
              return (
                <IndividualRecord
                  key={index}
                  selectedItem={item}
                  gridColumns={gridColumns}
                  Data_Array={Columns.data}
                  Actions={Actions}
                  index={index}
                  CompleteData={CompleteData}
                ></IndividualRecord>
              );
            })}
        </section>
      </section>
    </main>
  );
};

export default List;

const IndividualRecord = ({
  selectedItem,
  Data_Array,
  gridColumns,
  Actions,
  index,
  CompleteData,
}) => {
  return (
    <main>
      <div
        className={
          index % 2 === 0
            ? "grid bg-white h-[50px] hover:bg-slate-500/20"
            : "grid bg-slate-100/50 w-full h-[50px] hover:bg-slate-500/20"
        }
        key={uuid()}
        style={{ gridTemplateColumns: gridColumns }}
      >
        {Object.values(selectedItem)?.map((elements, index) => {
          return (
            <div
              className="flex justify-center items-center text-sm"
              key={index}
            >
              {elements}
            </div>
          );
        })}

        {Actions?.length > 0 && Data_Array?.length > 0 && (
          <div className="flex justify-center items-center">
            {Actions &&
              Actions?.length > 0 &&
              Actions.map((e, i) => {
                return (
                  <button
                    key={uuid()}
                    onClick={() => {
                      e.action(CompleteData?.data[index]?.id);
                    }}
                    style={e.btnColor ? { backgroundColor: e.btnColor } : {}}
                    className={
                      e.btnColor
                        ? "text-xs bg-slate-700 text-white px-1 ml-1 rounded-lg  hover:p-2"
                        : "text-xs bg-slate-700 text-white px-1 ml-1 rounded-lg   hover:p-2"
                    }
                  >
                    {e?.title}
                  </button>
                );
              })}
          </div>
        )}
      </div>
      {CompleteData &&
        CompleteData.detailsExpanded?.includes(
          CompleteData?.data[index]?.id
        ) && ( //index represents the index of the object in CompleteData.data //indexx represents index of titles in the CompleteData.tiltes as well as values in the CompleteData.data objects
          <div className="w-full text-sm ">
            <div className="border-2 mx- auto w-full">
              {CompleteData?.title?.map((item, indexx) => {
                return (
                  <div
                    key={indexx}
                    className={
                      "bg-zinc-300 text-black border-2 hover:bg-zinc-400"
                    }
                  >
                    {indexx !== 0 && (
                      <div className="grid grid-cols-3 ">
                        <span>{item}</span>
                        <span>{" - "}</span>
                        <span>
                          {CompleteData?.data[index] !== undefined &&
                            CompleteData?.data[index] !== null &&
                            Object.values(CompleteData?.data[index])[indexx]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div></div>
          </div>
        )}
    </main>
  );
};
