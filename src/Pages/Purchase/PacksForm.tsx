import React, { useState, useEffect, useRef } from "react";
import { CovertMonthNumbersToAlphabets } from "../../Functions/DateFunctions.ts";
import axios from "axios";
import Modal from "../../Components/Modal.tsx";
import List from "../../Components/List.tsx";
import "../../index.css";
import RegularForm from "../../Components/Form/RegularForm.tsx";
import {
  insertArrayItem,
  removeArrayItem,
} from "../../Functions/FormatArraysAndObjects.ts";
import { convertToCurrency } from "../../Functions/FormatString.ts";
import { iFormDataObject } from "../../Interfaces/Interfaces.ts";

const PurchaseForm = () => {
  const ConvertNANtoZero = (data: any) => {
    if (!Number(data)) {
      return 0;
    } else {
      return Number(data);
    }
  };
  //purchase details states
  const [feedback, setFeedback] = useState<string>("");

  const [dataFromAPI, setDataFromAPI] = useState({
    fetchItemsResults: [
      {
        id: 1,
        name: "cement",
        type: "Ghacem black",
        size: "50kg",
        price: "80",
        code: "ds323433ddfdsf",
      },
      {
        id: 2,
        name: "Paint",
        type: "Azar",
        size: "Mini bucket",
        price: "80",
        code: "ds323433ddfdsf",
      },
    ],
    fetchSuppliersResults: [
      {
        id: 1,
        name: "David Ensor",
        phone: "0233443353",
        company: "Obaapa Gyasi Enterprise",
      },
    ],
  });

  const [purchaseDetails, setPurcahseDetails] = useState({
    Supplier: {},
    dateofPurcahse: "",
    specificPurchase: "Pieces",
    ALLitemsSelected: [],
    detailsExpanded: [],
  });

  const purcahseType = {
    pieces: "Pieces",
    packs: "Packs",
  };

  const [bools, setBools] = useState({
    showCancelModal: false,
    showLoading: false,
    showSwitchPurchaseTypeModal: false,
    dateAlreadySet: false,
    supplierAlreadySet: false,
  });

  const [PiecesformData, setPiecesformData] = useState<iFormDataObject[]>([
    {
      label: "Item",
      data: "",
      input: {
        type: "select",
        required: true,
        autoComplete: "off",
        placeholder: "Item name",
      },
      validator: (itemanme: string) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      children: dataFromAPI?.fetchItemsResults,
    },
    {
      label: "Total Packs",
      data: "",
      input: {
        type: "number",
        required: true,
        autoComplete: "off",
        placeholder: "Total Packs",
      },
      validator: (totalPacks: number) => {
        if (totalPacks > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Qty per Pack",
      data: "",
      input: {
        type: "number",
        required: true,
        autoComplete: "off",
        placeholder: "Quatity per pack",
      },
      validator: (quantityPerPack: number) => {
        if (quantityPerPack > 0) {
          return true;
        } else {
          return false;
        }
      },
    },

    {
      label: "Unit price",
      data: "",
      input: {
        type: "number",
        required: true,
        autoComplete: "off",
        placeholder: "Unit cost",
      },
      validator: (itemanme: string) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "AddOns",
      data: "",
      input: {
        type: "number",
        required: false,
        autoComplete: "off",
        placeholder: "Extra added on",
      },
      validator: (itemanme: string) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Discount",
      data: "",
      input: {
        type: "number",
        required: false,
        autoComplete: "off",
        placeholder: "Discount per Item",
      },
      validator: (itemanme: string) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "VAT",
      data: "",
      input: {
        type: "text",
        required: false,
        autoComplete: "off",
        placeholder: "VAT per item",
      },
      validator: (itemanme: string) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      label: "Supplier",
      data: "",
      input: {
        type: "select",
        required: true,
        autoComplete: "off",
        placeholder: "Select Supplier",
      },
      validator: (itemanme: string) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      children: dataFromAPI?.fetchSuppliersResults,
    },
    {
      label: "Date",
      data: "",
      input: {
        type: "date",
        required: true,
        autoComplete: "off",
        placeholder: "Select Supplier",
      },
      validator: (itemanme: string) => {
        if (itemanme.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);

  //PAGE THEME COLORS
  const colors = {
    currentBtnColor: "#334155",
    defaultColor: "#cbd5e1",
    errorColor: "red",
    f3f3f3: "#f3f3f3",
    white: "white",
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const cancelOperation = () => {
    formRef?.current?.clearInputs();

    if (bools.showSwitchPurchaseTypeModal) {
      if (purchaseDetails?.specificPurchase === purcahseType?.packs) {
        purchaseDetails.specificPurchase = purcahseType.pieces;
      } else if (purchaseDetails?.specificPurchase === purcahseType?.pieces) {
        purchaseDetails.specificPurchase = purcahseType.packs;
      }
    }
    setBools((p) => {
      return {
        ...p,
        showSwitchPurchaseTypeModal: false,
      };
    });

    setPurcahseDetails((p) => {
      return { ...p, ALLitemsSelected: [], detailsExpanded: [] };
    });
  };

  const checkForOngoingOperation = () => {
    if (
      PiecesformData?.find((element) => {
        return element.data !== "";
      }) ||
      purchaseDetails?.ALLitemsSelected?.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };



  //close filterBox

  //FETCH DATA
  const getData = async (e) => {
    // setBools((p) => {
    //   // return { ...p, showLoading: true };
    // });
    // try {
    //   //fetch ITEMS and suppliers
    //   let itemsResponse = await axios.get(`${BaseURL}/items`, {
    //     withCredentials: true,
    //   });
    //   if (itemsResponse.status === 200) {
    //     setFetchItemshResults(itemsResponse.data.items);
    //     getSuppliers();
    //   }
    //   if (itemsResponse?.status === 204) {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setFeedback("Add items you sell");
    //   }
    // } catch (error) {
    //   console.log(error.response.status);
    //   if (!error?.response?.data) {
    //     setFeedback("Could not connect");
    //   } else if (error?.response?.status === 401) {
    //     GotoRefreshEndPoint(auth).then((r) => {
    //       if (r.status === 200) {
    //         getData();
    //       } else {
    //         navigateTo(
    //           `/${auth?.usersNameInURL?.trim()?.toLowerCase()}/sign-out`
    //         );
    //       }
    //     });
    //   } else {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setStatuscodeErrorMessage(error?.response?.status, setFeedback);
    //   }
    // }
  };

  const getSuppliers = async () => {
    // try {
    //   let suppliersResponse = await axios.get(`${BaseURL}/suppliers`, {
    //     withCredentials: true,
    //   });
    //   if (suppliersResponse.status === 200) {
    //     setFetchSuppliershResults(suppliersResponse.data.suppliers);
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     itemNameRef.current.focus();
    //   }
    //   if (suppliersResponse?.status === 204) {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setFeedback("Add suppliers you purchase from");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (!error?.response?.data) {
    //     setFeedback("Could not connect");
    //   } else if (error?.response?.status === 401) {
    //     GotoRefreshEndPoint(auth).then((r) => {
    //       if (r.status === 200) {
    //         getSuppliers();
    //       } else {
    //         navigateTo(
    //           `/${auth?.usersNameInURL?.trim()?.toLowerCase()}/sign-out`
    //         );
    //       }
    //     });
    //   } else {
    //     setBools((p) => {
    //       return { ...p, showLoading: false };
    //     });
    //     setStatuscodeErrorMessage(error?.response?.status, setFeedback);
    //   }
    // }
  };

  useEffect(() => {
    //getData();
  }, []);

  //Make final submission handler
  const submitRequest = async () => {
    try {
      setBools((p) => {
        return { ...p, showLoading: true };
      });

      let response = await axios.post(
        `${process.env.REACT_APP_LOCAL_BASE_URL}/purcahseitems`,
        {
          items: purchaseDetails.ALLitemsSelected,
          date: {
            numerical: purchaseDetails.dateofPurcahse,
            words: CovertMonthNumbersToAlphabets(
              purchaseDetails.dateofPurcahse
            ),
          },
          supplier: purchaseDetails.Supplier,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setFeedback("Submitted successfully");
        cancelOperation();
        setBools((p) => {
          return { ...p, showLoading: false };
        });
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data) {
        setFeedback("Could not connect");
      } else if (error?.response?.status === 401) {
        //     GotoRefreshEndPoint(auth).then((r) => {
        //       if (r.status === 200) {
        //         submitRequest();
        //       } else {
        //         navigateTo(
        //           `/${auth?.usersNameInURL?.trim()?.toLowerCase()}/sign-out`
        //         );
        //       }
        //     });
        //   } else {
        //     setBools((p) => {
        //       return { ...p, showLoading: false };
        //     });
        //     setStatuscodeErrorMessage(error?.response?.status, setFeedback);
      }
    }
  };

  const stopActionForModal = () => {
    setBools((p) => {
      return {
        ...p,
        showCancelModal: false,
        showSwitchPurchaseTypeModal: false,
      };
    });
  };

  const onFormCancel = () => {
    //clear AllItemsSelected and clear detailsExpanded
    setPurcahseDetails((p) => {
      return { ...p, ALLitemsSelected: [], detailsExpanded: [] };
    });

    //insert Supplier and Date back into the form thus if item and supplier are not in the form already.
    if (
      PiecesformData?.find((element) => {
        return element?.label?.trim()?.toLowerCase() === "supplier";
      })
    ) {
      setPiecesformData((p) => {
        p?.forEach((item) => {
          item.data = "";
        });
        return [...p];
      });
    } else {
      setPiecesformData((p) => {
        p.forEach((item) => {
          item.data = "";
        });
        return [
          ...p,
          {
            label: "Supplier",
            data: "",
            input: {
              type: "select",
              required: true,
              autoComplete: "off",
              placeholder: "Select supplier",
            },
            validCondintion: (itemanme) => {
              if (itemanme.length > 0) {
                return true;
              } else {
                return false;
              }
            },
            children: dataFromAPI?.fetchSuppliersResults,
          },
          {
            label: "Date",
            data: "",
            input: {
              type: "date",
              required: true,
              autoComplete: "off",
              placeholder: "Select Supplier",
            },
            validCondintion: (supplier: string) => {
              if (supplier.length > 0) {
                return true;
              } else {
                return false;
              }
            },
          },
        ];
      });
    }
  };

  const OnFormSubmit = (ValidatedData_FromForm) => {
    let piecesInPacks;
    if (ConvertNANtoZero(ValidatedData_FromForm?.pcs_in_packs) > 0) {
      piecesInPacks = ConvertNANtoZero(ValidatedData_FromForm?.pcs_in_packs);
    } else {
      piecesInPacks = 1;
    }
    const itemObject = {
      id: ValidatedData_FromForm?.item?.id,
      name: `${ValidatedData_FromForm?.item?.name
        ? ValidatedData_FromForm?.item?.name
        : ""
        } ${ValidatedData_FromForm?.item?.type
          ? ValidatedData_FromForm?.item?.type
          : ""
        } ${ValidatedData_FromForm?.item?.size
          ? ValidatedData_FromForm?.item?.size
          : ""
        }`,
      quantity: ValidatedData_FromForm?.quantity,
      price: ValidatedData_FromForm?.unit_price,
      addons: ConvertNANtoZero(ValidatedData_FromForm?.addons),
      totalDiscount:
        ConvertNANtoZero(ValidatedData_FromForm?.discount) *
        ConvertNANtoZero(ValidatedData_FromForm?.quantity),
      totalVAT:
        ConvertNANtoZero(ValidatedData_FromForm?.vat) *
        ConvertNANtoZero(ValidatedData_FromForm?.quantity),
      total_cost: parseFloat(
        String(
          ConvertNANtoZero(ValidatedData_FromForm?.quantity) *
          ConvertNANtoZero(ValidatedData_FromForm?.unit_price) -
          ConvertNANtoZero(ValidatedData_FromForm?.discount) *
          ConvertNANtoZero(ValidatedData_FromForm?.quantity) +
          ConvertNANtoZero(ValidatedData_FromForm?.vat) *
          ConvertNANtoZero(ValidatedData_FromForm?.quantity)
        )
      ).toFixed(2),
      totalpieces:
        ConvertNANtoZero(ValidatedData_FromForm?.quantity) *
        ConvertNANtoZero(piecesInPacks) +
        ConvertNANtoZero(ValidatedData_FromForm?.addons),
      dateInNumers: CovertMonthNumbersToAlphabets(ValidatedData_FromForm?.date),
    };

    if (purchaseDetails?.ALLitemsSelected?.length === 0) {
      setPurcahseDetails((p) => {
        return {
          ...p,
          Supplier: ValidatedData_FromForm?.supplier,
          dateofPurcahse: ValidatedData_FromForm?.date,
          ALLitemsSelected: [...p.ALLitemsSelected, itemObject],
        };
      });

      //remove supplier  and date from form data
      setPiecesformData((p) => {
        return p.slice(
          0,
          p.indexOf(
            p.find((item) => {
              return item.label?.toLowerCase()?.trim() === "supplier";
            })
          )
        );
      });

      setFeedback("Added successfully.");
      formRef.current?.clearInputs();
    } else {
      if (
        purchaseDetails?.ALLitemsSelected?.find((element) => {
          return element?.id === ValidatedData_FromForm?.item?.id;
        })
      ) {
        setFeedback("Item already added to list.");
      } else {
        setPurcahseDetails((p) => {
          return {
            ...p,
            ALLitemsSelected: [...p.ALLitemsSelected, itemObject],
          };
        });
        setFeedback("Added successfully.");
        formRef.current?.clearInputs();
      }
    }
  };

  const confirmSwitch = () => {
    if (
      purchaseDetails?.specificPurchase?.toLowerCase()?.trim() ===
      purcahseType?.pieces?.toLowerCase()?.trim()
    ) {
      //its already pieces
      if (checkForOngoingOperation()) {
        setPiecesformData((p) => {
          return insertArrayItem(
            p,
            {
              label: "Pcs in Packs",
              data: "",
              input: {
                type: "number",
                required: true,
                autoComplete: "off",
                placeholder: "Pieces in pack",
              },
              validCondintion: (number: number) => {
                if (Number(number) > 0) {
                  return true;
                } else {
                  return false;
                }
              },
            },
            2
          );
        });

        setPurcahseDetails((p) => {
          return {
            ...p,
            ALLitemsSelected: [],
            detailsExpanded: [],
            specificPurchase: purcahseType?.packs,
          };
        });
      }
    } else {
      //its already packs
      if (checkForOngoingOperation()) {
        let indexOfItemToBeRemoved: number = PiecesformData.indexOf(
          PiecesformData.find((element) => {
            return (
              element.label?.toLowerCase() === "Pcs in Packs"?.toLowerCase()
            );
          })
        );
        setPiecesformData((p: iFormDataObject[]) => {
          return removeArrayItem(p, indexOfItemToBeRemoved);
        });

        setPurcahseDetails((p) => {
          return {
            ...p,
            ALLitemsSelected: [],
            detailsExpanded: [],
            specificPurchase: purcahseType?.pieces,
          };
        });
      }
    }
    if (purchaseDetails?.ALLitemsSelected?.length > 0) {
      setPiecesformData((p) => {
        p.forEach((item) => {
          item.data = "";
        });
        return [
          ...p,
          {
            label: "Supplier",
            data: "",
            input: {
              type: "select",
              required: true,
              autoComplete: "off",
              placeholder: "Select Supplier",
            },
            validCondintion: (itemanme) => {
              if (itemanme.length > 0) {
                return true;
              } else {
                return false;
              }
            },
            children: dataFromAPI?.fetchSuppliersResults,
          },
          {
            label: "Date",
            data: "",
            input: {
              type: "date",
              required: true,
              autoComplete: "off",
              placeholder: "Select Supplier",
            },
            validCondintion: (itemanme) => {
              if (itemanme.length > 0) {
                return true;
              } else {
                return false;
              }
            },
          },
        ];
      });
    }

    setPiecesformData((p) => {
      p.forEach((ele) => {
        return (ele.data = "");
      });
      return p;
    });

    formRef?.current?.clearInputs();

    setBools((p) => {
      return { ...p, showSwitchPurchaseTypeModal: false };
    });
  };

  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  });


  const CalculateTotalCost = () => {
    let totalCost = 0;
    for (var i = 0; i < purchaseDetails.ALLitemsSelected.length; i++) {
      totalCost = Number(totalCost) + Number(purchaseDetails.ALLitemsSelected[i]?.total_cost);
    }
    return totalCost;
  };
  return (
    <main
      className="relative flex w-full h-full"
      style={{
        backgroundColor: "white", height: "calc(100% - 48px)"
      }}
    >
      {bools?.showSwitchPurchaseTypeModal && (
        <Modal
          EffectNotice={"You will lose current operation"}
          ActionInOneWord={"Switch"}
          CancelInOneWord="Cancel"
          ActionFucntion={confirmSwitch}
          CancelFunction={stopActionForModal}
          Styles={{ button: {} }}
        />
      )}

      <div className="w-full h-full">
        {bools?.showLoading && <div>LOADING....</div>}

        <div className="PURCHASEComponentContainer flex h-full">
          {
            <section className="leftsideContainer  w-full h-full flex border-2 border-l-0 ">
              <div className="leftside w-full h-full">
                <div className=" w-full flex h-full">
                  <div className="formsContainer p-2 border-r-2">
                    <h4 className="text-center text-lg relative top-6">
                      {"Purchase"}
                      <span style={{ color: colors.errorColor }}>
                        <i>{` ${purchaseDetails.specificPurchase}`} </i>
                      </span>
                    </h4>

                    <div
                      className={
                        feedback?.includes("successfull")
                          ? "text-center relative top-4 text-green-600 shadow-md shadow-green-200 w-fit mx-auto"
                          : "text-center relative top-4 text-red-600 shadow-md shadow-red-200 w-fit mx-auto"
                      }
                    >
                      {feedback} <span style={{ visibility: "hidden" }}>.</span>
                    </div>

                    <RegularForm
                      ref={formRef}
                      formData={PiecesformData}
                      setformData={setPiecesformData}
                      onSubmit={OnFormSubmit}
                      onCancel={onFormCancel}
                      formType={{ regular: true }}
                      Styles={{
                        row: { display: "flex", width: "300px" },
                        label: { width: "150px", textAlign: "left" },
                        form: { width: "fit-content", textAlign: "center" },
                        input: { borderTop: "0px", borderLeft: "0px", borderRight: "0px", borderRadius: "0px" }
                      }}
                    />
                  </div>


                  <section className="w-full h-full">
                    <div style={{ height: "calc(100% - 50px)" }}>
                      <List
                        Date={{
                          //date is the only prop that is an object, all other props are arrays of objects {title, data}
                          title: "Date",
                          data: purchaseDetails?.dateofPurcahse,
                        }}
                        CompleteData={{
                          title: [
                            "id",
                            "name",
                            "quantity",
                            "price",
                            "add-ons",
                            "total discount",
                            "total vat",
                            "total cost",
                            "total pieces",
                          ],
                          data: [...purchaseDetails?.ALLitemsSelected],
                          detailsExpanded: purchaseDetails?.detailsExpanded,
                        }}
                        Columns={{
                          title: ["Name", "Price", "Quantity", "Total"],
                          data: purchaseDetails?.ALLitemsSelected?.map(
                            ({ name, price, quantity, total_cost }) => {
                              let costToCurrency = convertToCurrency(total_cost);
                              let priceToCurrency = convertToCurrency(price);
                              return {
                                name,
                                priceToCurrency,
                                quantity,
                                costToCurrency,
                              };
                            }
                          ),
                        }}
                        OnTopOfTable={[
                          {
                            title: "Supplier",
                            data: Object.values(purchaseDetails?.Supplier),
                          },
                        ]}
                        Actions={[
                          {
                            title: "details",
                            action: (id: any) => {
                              if (
                                purchaseDetails.detailsExpanded?.find((ID) => {
                                  return ID === id;
                                })
                              ) {
                                setPurcahseDetails((p) => {
                                  return {
                                    ...p,
                                    detailsExpanded:
                                      purchaseDetails.detailsExpanded?.filter(
                                        (ID) => {
                                          return ID !== id;
                                        }
                                      ),
                                  };
                                });
                              } else {
                                setPurcahseDetails((p) => {
                                  return {
                                    ...p,
                                    detailsExpanded: [
                                      ...purchaseDetails?.detailsExpanded,
                                      id,
                                    ],
                                  };
                                });
                              }
                            },
                          },
                          {
                            title: "delete",
                            btnColor: "red",
                            action: (id: any) => {
                              if (
                                purchaseDetails?.ALLitemsSelected?.length === 1
                              ) {
                                //onFormCancel empties allItemsSelected and detailsOpened
                                //onFormCancel also sets supplier and data back into form
                                onFormCancel();
                                setPurcahseDetails((p) => {
                                  return {
                                    ...p,
                                    ALLitemsSelected: [],
                                  };
                                });
                              } else {
                                setPurcahseDetails((p) => {
                                  return {
                                    ...p,
                                    ALLitemsSelected:
                                      purchaseDetails?.ALLitemsSelected?.filter(
                                        (element) => {
                                          return element?.id !== id;
                                        }
                                      ),
                                  };
                                });
                              }
                            },
                          },
                        ]}
                      />
                    </div>

                    <div className="border-b-2 h-[50px]  relative  bg-white  ">
                      <div className="relative h-full  flex justify-between ">
                        <div className="">
                          <span className="text-xl font-bold relative left-2">
                            GHC {convertToCurrency(CalculateTotalCost().toString())}
                          </span>
                        </div>
                        <button className="px-2 hover:bg-slate-700 text-white bg-slate-600">
                          Submit
                        </button>
                      </div>
                    </div>



                  </section>
                </div>
              </div>
            </section>
          }
        </div>
      </div>
    </main>
  );
};

export default PurchaseForm;
