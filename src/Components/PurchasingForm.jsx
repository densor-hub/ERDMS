import { useState, useEffect, useRef } from "react";
import {
  isValidDate,
  convertMonthTo_ALPHABETS,
} from "../Functions/DateFunctions";
import axios from "axios";
import Modal from "./Modal";
import List from "../Components/List";
import FormRightSide from "./FormRightSide";

import "../index.css";

const PurchaseForm = ({ TypeOfPurchase }) => {
  const ConvertNANtoZero = (data) => {
    if (!Number(data)) {
      return 0;
    } else {
      return Number(data);
    }
  };
  //purchase details states
  const [feedback, setFeedback] = useState(null);
  const [purchaseDetails, setPurcahseDetails] = useState({
    item: {},
    quantity: "",
    purchasePrice: "",
    totalCost: "",
    Supplier: {},
    dateofPurcahse: "",
    specificPurchase: "Pieces",
    piecesInPack: "",
    addOns: "",
    discount: "",
    VAT: "",
    ALLitemsPaidFor: [],
    detailsExpanded: [],
  });

  const [dataFromAPI, setDataFromAPI] = useState({
    fetchItemsResults: [
      {
        id: 1,
        name: "cement",
        sizeOrType: "Ghacem black",
        price: "80",
        code: "ds323433ddfdsf",
      },
      {
        id: 2,
        name: "Paint",
        sizeOrType: "Ghacem black",
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

  const [bools, setBools] = useState({
    showCancelModal: false,
    showLoading: false,
    showSwitchPurchaseTypeModal: false,
    showItemFilterBox: false,
    showSupplierFilterBox: false,
    dateAlreadySet: false,
    supplierAlreadySet: false,
  });

  //PAGE THEME COLORS
  const colors = {
    currentBtnColor: "#334155",
    defaultColor: "#cbd5e1",
    errorColor: "red",
    f3f3f3: "#f3f3f3",
    white: "white",
  };

  const purcahseType = {
    pieces: "Pieces",
    packs: "Packs",
  };

  //refs
  const RequiredRefs = useRef([]);
  const addToRequiredRefs = (element) => {
    if (element && !RequiredRefs?.current?.includes(element)) {
      RequiredRefs?.current?.push(element);
    } else {
      RequiredRefs.current.pop(element);
    }
  };

  const Not_RequiredRefs = useRef([]);
  const addTo_NOT_RequiredRefs = (element) => {
    if (element && !Not_RequiredRefs?.current?.includes(element)) {
      Not_RequiredRefs?.current?.push(element);
    } else {
      Not_RequiredRefs.current.pop(element);
    }
  };

  const SupplierFilterBoxRef = useRef();
  const filteredItemRef = useRef();

  const itemObject = {
    id: purchaseDetails?.item?.id,
    name: `${purchaseDetails.item?.name} ${purchaseDetails.item?.sizeOrType}`,
    quantity: purchaseDetails?.quantity,
    purchasePrice: purchaseDetails.purchasePrice,
    addOns: purchaseDetails.addOns,
    totalDiscount:
      ConvertNANtoZero(purchaseDetails.totalDiscount) *
      ConvertNANtoZero(purchaseDetails.quantity),
    totalVAT:
      ConvertNANtoZero(purchaseDetails.totalVAT) *
      ConvertNANtoZero(purchaseDetails.quantity),
    total_cost: parseFloat(
      ConvertNANtoZero(purchaseDetails.quantity) *
        ConvertNANtoZero(purchaseDetails.purchasePrice) -
        ConvertNANtoZero(purchaseDetails.totalDiscount) *
          ConvertNANtoZero(purchaseDetails.quantity) +
        ConvertNANtoZero(purchaseDetails.totalVAT) *
          ConvertNANtoZero(purchaseDetails.quantity)
    ).toFixed(2),
    totalpieces:
      ConvertNANtoZero(purchaseDetails.quantity) *
      ConvertNANtoZero(purchaseDetails.piecesInPack),
    dateInNumers: purchaseDetails?.dateofPurcahse,
  };

  //cancel Operation

  const cancelOperation = () => {
    setFeedback("");
    setPurcahseDetails((p) => {
      return {
        ...purchaseDetails,
        dateofPurcahse: "",
        totalCost: p.totalCost - p.totalCost,
        item: {},
        quantity: "",
        cost: "",
        Supplier: {},
        addOns: "",
        totalDiscount: "",
        totalVAT: "",
        piecesInPack: "",
        purchasePrice: "",
        discount: "",
        VAT: "",
        ALLitemsPaidFor: [],
      };
    });

    RequiredRefs.current?.forEach((element) => {
      element.style.borderColor = `${colors?.defaultColor}`;
      return (element.value = "");
    });
    Not_RequiredRefs.current?.forEach((element) => {
      element.style.borderColor = `${colors?.defaultColor}`;
      return (element.value = "");
    });

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
        showCancelModal: false,
        showSwitchPurchaseTypeModal: false,
      };
    });
  };

  const checkForOngoingOperation = () => {
    if (
      (purchaseDetails.specificPurchase === purcahseType.packs &&
        purchaseDetails.piecesInPack) ||
      (purchaseDetails.specificPurchase === purcahseType.pieces &&
        !purchaseDetails.piecesInPack &&
        (purchaseDetails.ALLitemsPaidFor.length > 0 ||
          Object.values(purchaseDetails?.item).length !== 0 ||
          Object.values(purchaseDetails?.Supplier).length !== 0 ||
          purchaseDetails.quantity ||
          purchaseDetails.purchasePrice ||
          purchaseDetails.addOns ||
          purchaseDetails.discount ||
          purchaseDetails.VAT ||
          purchaseDetails.dateofPurcahse))
    ) {
      return true;
    } else {
      return false;
    }
  };

  //CHANGING FORM'S titles buttons COLOR
  const piecesBtnRef = useRef();
  const packsBtnRef = useRef();

  useEffect(() => {
    if (purchaseDetails.specificPurchase === purcahseType.pieces) {
      piecesBtnRef.current.style.backgroundColor = colors.currentBtnColor;
      piecesBtnRef.current.style.color = colors.f3f3f3;
    } else {
      piecesBtnRef.current.style.backgroundColor = colors.f3f3f3;
      piecesBtnRef.current.style.color = colors.currentBtnColor;
    }
    if (purchaseDetails.specificPurchase === purcahseType.packs) {
      packsBtnRef.current.style.backgroundColor = colors.currentBtnColor;
      packsBtnRef.current.style.color = colors.f3f3f3;
    } else {
      packsBtnRef.current.style.backgroundColor = colors.f3f3f3;
      packsBtnRef.current.style.color = colors.currentBtnColor;
    }
  }, [purchaseDetails.specificPurchase]);

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
    getData();
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
          items: purchaseDetails.ALLitemsPaidFor,
          date: {
            numerical: purchaseDetails.dateofPurcahse,
            words: convertMonthTo_ALPHABETS(purchaseDetails.dateofPurcahse),
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

  const submitItemHandler = async (e) => {
    e.preventDefault();
    if (purchaseDetails.ALLitemsPaidFor.length === 0) {
      AddItem(e);
    } else {
      submitRequest();
    }
  };

  const VerifyNumericalInputValue = (value, inputElement, requirement) => {
    if (requirement) {
      if (value && Number(value) > 0) {
        inputElement.style.borderColor = `${colors?.defaultColor}`;
      } else {
        setFeedback("Invalid value detected");
        inputElement.style.borderColor = `${colors?.errorColor}`;
      }
    } else if (!requirement) {
      //console.log(!value);
      if (value && Number(value) > 0) {
        inputElement.style.borderColor = `${colors?.defaultColor}`;
      } else if (!value) {
        inputElement.style.borderColor = `${colors?.defaultColor}`;
      } else {
        inputElement.style.borderColor = `${colors?.errorColor}`;
      }
    }
  };

  const AddItem = (e) => {
    e.preventDefault();

    if (
      RequiredRefs?.current?.find((el) => {
        return el.value === "" || el.value === null;
      })
    ) {
      RequiredRefs?.current?.forEach((el) => {
        if (el.value === "" || el.value === null) {
          return (el.style.borderColor = `${colors.errorColor}`);
        }
      });
      setFeedback("Enter all required fields");
    } else {
      if (
        purchaseDetails.ALLitemsPaidFor.find((item) => {
          return item.id === purchaseDetails.item.id;
        })
      ) {
        RequiredRefs.current.find((element) => {
          return element.name === "itemname";
        }).style.borderColor = `${colors.errorColor}`;
        setFeedback("Item already selected");
      } else {
        RequiredRefs?.current?.forEach((element) => {
          if (!element?.value) {
            element.style.borderColor = `${colors?.errorColor}`;
          } else {
            element.style.borderColor = `${colors?.defaultColor}`;
          }

          if (element.name === "itemname") {
            if (
              dataFromAPI?.fetchItemsResults?.find((item) => {
                return (
                  item?.id === purchaseDetails.item?.id &&
                  `${item?.name} ${item?.sizeOrType}`.toLowerCase() ===
                    element?.value?.toLowerCase()
                );
              })
            ) {
              element.style.borderColor = `${colors?.defaultColor}`;
            } else {
              setFeedback("Plase select valid item");
              element.style.borderColor = `${colors?.errorColor}`;
            }
          }

          if (element?.name === "quantity") {
            VerifyNumericalInputValue(purchaseDetails.quantity, element, true);
          }

          if (element?.name === "piecesInPack") {
            VerifyNumericalInputValue(
              purchaseDetails?.piecesInPack,
              element,
              true
            );
          }

          if (element?.name === "cost") {
            VerifyNumericalInputValue(
              purchaseDetails.purchasePrice,
              element,
              true
            );
          }

          if (element?.name === "piecesInPacks") {
            if (purchaseDetails?.specificPurchase === purcahseType.packs) {
              VerifyNumericalInputValue(
                purchaseDetails.piecesInPack,
                element,
                true
              );
            }
          }

          if (
            element?.name === "supplier" &&
            purchaseDetails?.ALLitemsPaidFor.length === 0
          ) {
            if (
              dataFromAPI.fetchSuppliersResults?.find((supplier) => {
                return (
                  supplier?.id === purchaseDetails?.Supplier?.id &&
                  element.value.toLowerCase().trim() ===
                    supplier.name?.toLowerCase().trim()
                );
              })
            ) {
              setBools((p) => {
                return { ...p, supplierAlreadySet: true };
              });
              element.style.borderColor = `${colors?.defaultColor}`;
            } else {
              setFeedback("Please select valid supplier");
              element.style.borderColor = `${colors?.errorColor}`;
            }
          }

          if (
            element.name === "date" &&
            purchaseDetails?.ALLitemsPaidFor.length === 0
          ) {
            if (isValidDate(element.value)) {
              setBools((p) => {
                return { ...p, dateAlreadySet: true };
              });
              element.style.borderColor = `${colors?.defaultColor}`;
            } else {
              element.style.borderColor = `${colors?.errorColor}`;
            }
          }
        });

        //Not required values
        Not_RequiredRefs?.current?.forEach((element) => {
          if (element?.name === "addons") {
            VerifyNumericalInputValue(purchaseDetails.addOns, element, false);
          }

          if (element?.name === "discount") {
            VerifyNumericalInputValue(purchaseDetails.discount, element, false);
          }
          if (element?.name === "VAT") {
            VerifyNumericalInputValue(purchaseDetails.VAT, element, false);
          }
        });

        if (
          dataFromAPI?.fetchItemsResults?.find((item) => {
            return (
              item?.id === purchaseDetails.item?.id &&
              `${item?.name} ${item?.sizeOrType}`.toLowerCase() ===
                RequiredRefs.current
                  ?.find((e) => {
                    return e.name === "itemname";
                  })
                  ?.value?.toLowerCase()
            );
          }) &&
          dataFromAPI.fetchSuppliersResults?.find((supplier) => {
            return (
              supplier.id === purchaseDetails.Supplier?.id &&
              supplier?.name?.toLowerCase().trim() ===
                purchaseDetails?.Supplier?.name?.toLowerCase().trim()
            );
          }) &&
          purchaseDetails?.quantity &&
          purchaseDetails?.quantity > 0 &&
          purchaseDetails?.purchasePrice &&
          purchaseDetails?.purchasePrice > 0 &&
          (!purchaseDetails?.addOns ||
            (purchaseDetails?.addOns && purchaseDetails?.addOns > 0)) &&
          (!purchaseDetails?.discount ||
            (purchaseDetails?.discount && purchaseDetails?.discount > 0)) &&
          (!purchaseDetails?.VAT ||
            (purchaseDetails?.VAT && purchaseDetails?.VAT > 0)) &&
          ((purchaseDetails?.specificPurchase === purcahseType.packs &&
            purchaseDetails?.piecesInPack &&
            purchaseDetails?.piecesInPack > 0) ||
            (purchaseDetails?.specificPurchase === purcahseType.pieces &&
              !purchaseDetails?.piecesInPack))
        ) {
          const CalculateTotalCost = parseFloat(
            Number(purchaseDetails.totalCost) +
              (Number(purchaseDetails.quantity) *
                Number(purchaseDetails.purchasePrice) -
                Number(purchaseDetails.quantity) *
                  Number(purchaseDetails.discount)) +
              Number(purchaseDetails.quantity) * Number(purchaseDetails)
          ).toFixed(2);
          setPurcahseDetails((p) => {
            return {
              ...p,
              ALLitemsPaidFor: [...purchaseDetails.ALLitemsPaidFor, itemObject],
              item: {},
              quantity: "",
              cost: "",
              addOns: "",
              discount: "",
              VAT: "",
              piecesInPack: "",
              totalCost: CalculateTotalCost,
            };
          });
          RequiredRefs.current?.forEach((e) => {
            return (e.value = null);
          });
          Not_RequiredRefs.current?.forEach((e) => {
            return (e.value = null);
          });
          setFeedback("Item added successfully");
        }
      }
    }
  };

  //remove error messages after 3 seconds
  const topFeedback = useRef();
  function removeFeedback() {
    if (feedback) {
      topFeedback.current.style.visibility = "visible";

      if (
        feedback === "Submitted successfully" ||
        feedback === "Item added successfully"
      ) {
        topFeedback.current.style.backgroundColor = colors.defaultColor;
      } else {
        topFeedback.current.style.backgroundColor = colors.errorColor;
      }
    } else if (!feedback) {
      topFeedback.current.style.visibility = "hidden";
    }
    setTimeout(() => {
      if (feedback) {
        setFeedback("");
      }
    }, 3000);
  }
  useEffect(() => {
    removeFeedback();
  }, [feedback, removeFeedback]);

  const stopActionForModal = () => {
    setBools((p) => {
      return {
        ...p,
        showCancelModal: false,
        showSwitchPurchaseTypeModal: false,
      };
    });
  };

  return (
    <main
      className="relative flex w-full"
      style={{ height: "calc(100vh - 48px)", minHeight: "515px" }}
    >
      {bools?.showSwitchPurchaseTypeModal && (
        <Modal
          EffectNotice={"You will lose current operation"}
          ActionInOneWord={"Switch"}
          ActionFucntion={cancelOperation}
          CancelFunction={stopActionForModal}
        />
      )}

      {bools?.showCancelModal && (
        <Modal
          EffectNotice={"You will lose current operation"}
          ActionInOneWord={"Cancel"}
          ActionFucntion={cancelOperation}
          CancelFunction={stopActionForModal}
        />
      )}
      <div className="w-full">
        {bools?.showLoading && <div>LOADING....</div>}

        <div className="PURCHASEComponentContainer flex h-full">
          <FormRightSide
            appName={"CYNOSURE"}
            actions={[
              {
                ref: piecesBtnRef,
                label: `${TypeOfPurchase} Pieces`,
                onClick: () => {
                  if (checkForOngoingOperation()) {
                    setBools((p) => {
                      return { ...bools, showSwitchPurchaseTypeModal: true };
                    });
                  } else {
                    setPurcahseDetails((p) => {
                      return { ...p, specificPurchase: purcahseType?.pieces };
                    });
                  }
                },
              },
              {
                ref: packsBtnRef,
                label: `${TypeOfPurchase} Packs`,
                onClick: () => {
                  if (checkForOngoingOperation()) {
                    setBools((p) => {
                      return { ...p, showSwitchPurchaseTypeModal: true };
                    });
                  } else {
                    setPurcahseDetails((p) => {
                      return { ...p, specificPurchase: purcahseType?.packs };
                    });
                  }
                },
              },
            ]}
          />

          {
            <div className="leftsideContainer  w-full flex border-2 border-l-0 ">
              <div className="leftside w-full h-full">
                <div className=" w-full flex h-full">
                  <div className="formsContainer p-6 ">
                    <div className="heading w-full">
                      {
                        <div ref={topFeedback} className="feedback">
                          {feedback}{" "}
                          <span style={{ visibility: "hidden" }}>.</span>
                        </div>
                      }

                      <h4>
                        {TypeOfPurchase}
                        <span style={{ color: colors.errorColor }}>
                          <i>{` ${purchaseDetails.specificPurchase}`} </i>
                        </span>
                      </h4>
                    </div>

                    <form className="form1" autoComplete="off">
                      <table>
                        <tbody>
                          <tr>
                            <td className="IsRequired">
                              <label htmlFor="item"> Name</label>{" "}
                              <span className="RequiredHash">*</span>
                            </td>

                            <td>
                              <input
                                ref={addToRequiredRefs}
                                type={"text"}
                                name="itemname"
                                placeholder="Item name"
                                onChange={(e) => {
                                  e.preventDefault();
                                  setBools((p) => {
                                    return {
                                      ...p,
                                      showItemFilterBox: true,
                                    };
                                  });

                                  setPurcahseDetails((p) => {
                                    return {
                                      ...p,
                                      item: {
                                        ...purchaseDetails.item,
                                        name: e.target.value,
                                      },
                                    };
                                  });
                                }}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td> </td>
                            <td>
                              {/* FILTER FETCHED ITEMS AND MAP RESULTS TO  RESULTS WHEN ITEM NAME IS BEING TYPED*/}

                              {bools?.showItemFilterBox && (
                                <div
                                  ref={addToRequiredRefs}
                                  className="sellItemsListFilter"
                                  style={{
                                    position: "relative",
                                    left: "47px",
                                    top: "-20px",
                                  }}
                                >
                                  {dataFromAPI.fetchItemsResults
                                    .filter(({ name, sizeOrType }) => {
                                      let lowerCasetNameInInput;
                                      let lowerCaseNamesInDb = `${name.toLowerCase()} ${sizeOrType.toLowerCase()}`;

                                      if (purchaseDetails?.item?.name) {
                                        lowerCasetNameInInput =
                                          purchaseDetails?.item?.name.toLowerCase();
                                      }

                                      if (
                                        lowerCaseNamesInDb.startsWith(
                                          lowerCasetNameInInput
                                        )
                                      ) {
                                        return lowerCaseNamesInDb.startsWith(
                                          lowerCasetNameInInput
                                        );
                                      }

                                      return lowerCaseNamesInDb.includes(
                                        lowerCasetNameInInput
                                      );
                                    })
                                    .map((item) => {
                                      return (
                                        <button
                                          ref={filteredItemRef}
                                          key={item?.id}
                                          className="filteredItem"
                                          onClick={(e) => {
                                            e.preventDefault();

                                            setPurcahseDetails((p) => {
                                              return {
                                                ...p,
                                                item: {
                                                  ...item,
                                                },
                                              };
                                            });

                                            RequiredRefs.current.find(
                                              (element) => {
                                                return (
                                                  element?.name === "itemname"
                                                );
                                              }
                                            ).value = `${item?.name} ${item?.sizeOrType}`;

                                            setBools((p) => {
                                              return {
                                                ...p,
                                                showItemFilterBox: false,
                                              };
                                            });
                                          }}
                                        >
                                          {`${item?.name} ${item?.name}`}
                                        </button>
                                      );
                                    })}
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>

                    <form className="form2" autoComplete="off">
                      <table>
                        <tbody>
                          <tr>
                            <td className="IsRequired">
                              <label htmlFor="quatity">
                                {purchaseDetails?.specificPurchase ===
                                purcahseType.pieces
                                  ? "Pieces"
                                  : "Packs"}{" "}
                              </label>
                              <span className="RequiredHash">*</span>
                            </td>
                            <td>
                              <input
                                ref={addToRequiredRefs}
                                name="quantity"
                                type={"number"}
                                placeholder="Quantity"
                                onChange={(e) => {
                                  setPurcahseDetails((p) => {
                                    return { ...p, quantity: e.target.value };
                                  });
                                }}
                              ></input>
                            </td>
                          </tr>

                          {purchaseDetails?.specificPurchase ===
                            purcahseType.packs && (
                            <tr>
                              <td className="IsRequired">
                                <label htmlFor="piecesInPacks">
                                  Qty in Pack{" "}
                                </label>{" "}
                                <span className="RequiredHash">*</span>
                              </td>
                              <td>
                                <input
                                  ref={addToRequiredRefs}
                                  name="piecesInPack"
                                  type={"number"}
                                  placeholder="Quantity in Pack"
                                  onChange={(e) => {
                                    setPurcahseDetails((p) => {
                                      return {
                                        ...p,
                                        piecesInPack: e.target.value,
                                      };
                                    });
                                  }}
                                ></input>
                              </td>
                            </tr>
                          )}

                          <tr>
                            <td className="IsRequired">
                              <label htmlFor="cost">Unit price </label>{" "}
                              <span className="RequiredHash">*</span>
                            </td>
                            <td>
                              {" "}
                              <input
                                ref={addToRequiredRefs}
                                type={"number"}
                                name="cost"
                                placeholder="Unit cost"
                                onChange={(e) => {
                                  setPurcahseDetails((p) => {
                                    return {
                                      ...p,
                                      purchasePrice: e.target.value,
                                    };
                                  });
                                }}
                              ></input>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <label htmlFor="addons">Add Ons</label>
                            </td>
                            <td>
                              <input
                                ref={addTo_NOT_RequiredRefs}
                                type="NUMBER"
                                name="addons"
                                placeholder="Extra added on"
                                onChange={(e) => {
                                  setPurcahseDetails((p) => {
                                    return {
                                      ...p,
                                      addOns: e.target.value,
                                    };
                                  });
                                }}
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="discount"> Discount </label>
                            </td>
                            <td>
                              <input
                                ref={addTo_NOT_RequiredRefs}
                                type="NUMBER"
                                name="discount"
                                placeholder="Discount per item"
                                onChange={(e) => {
                                  setPurcahseDetails((p) => {
                                    return {
                                      ...p,
                                      discount: e.target.value,
                                    };
                                  });
                                }}
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="VAT"> VAT </label>
                            </td>
                            <td>
                              <input
                                ref={addTo_NOT_RequiredRefs}
                                type="NUMBER"
                                name="VAT"
                                placeholder="VAT per item"
                                onChange={(e) => {
                                  setPurcahseDetails((p) => {
                                    return {
                                      ...p,
                                      VAT: e.target.value,
                                    };
                                  });
                                }}
                              ></input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>

                    <form className="form3" autoComplete="off">
                      <table>
                        <tbody>
                          {purchaseDetails.ALLitemsPaidFor.length === 0 && (
                            <tr>
                              <td className="IsRequired">
                                <label htmlFor="Supplier">Supplier </label>{" "}
                                <span className="RequiredHash">*</span>
                              </td>
                              <td>
                                <input
                                  ref={addToRequiredRefs}
                                  type={"text"}
                                  name="supplier"
                                  placeholder="Supplier"
                                  onChange={(e) => {
                                    setPurcahseDetails((p) => {
                                      return {
                                        ...p,
                                        Supplier: {
                                          ...purchaseDetails.Supplier,
                                          name: e.target.value,
                                        },
                                      };
                                    });
                                    setBools((p) => {
                                      return {
                                        ...p,
                                        showSupplierFilterBox: true,
                                      };
                                    });
                                  }}
                                ></input>
                              </td>
                            </tr>
                          )}

                          <tr>
                            <td> </td>
                            <td id="filterBoxTDForm3">
                              {/* FILTER FETCHED ITEMS AND MAP RESULTS TO  RESULTS WHEN ITEM NAME IS BEING TYPED*/}

                              {bools?.showSupplierFilterBox && (
                                <div
                                  ref={SupplierFilterBoxRef}
                                  className="sellItemsListFilter"
                                  style={{
                                    position: "relative",
                                    left: "47px",
                                    top: "-20px",
                                  }}
                                >
                                  {dataFromAPI.fetchSuppliersResults
                                    .filter(({ name }) => {
                                      let lowerCasetNameInInput;
                                      if (purchaseDetails?.Supplier?.name) {
                                        lowerCasetNameInInput =
                                          purchaseDetails.Supplier?.name.toLowerCase();
                                      }
                                      let lowerCaseNamesInDb = `${name.toLowerCase()}`;

                                      if (
                                        lowerCaseNamesInDb.startsWith(
                                          lowerCasetNameInInput
                                        )
                                      ) {
                                        return lowerCaseNamesInDb.startsWith(
                                          lowerCasetNameInInput
                                        );
                                      }

                                      return lowerCaseNamesInDb.includes(
                                        lowerCasetNameInInput
                                      );
                                    })
                                    .map((supplier) => {
                                      return (
                                        <button
                                          key={supplier?.id}
                                          className="flteredSuppliers"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setPurcahseDetails((p) => {
                                              return {
                                                ...p,
                                                Supplier: { ...supplier },
                                              };
                                            });

                                            RequiredRefs.current.find((e) => {
                                              return e.name === "supplier";
                                            }).value = supplier.name;

                                            setBools((p) => {
                                              return {
                                                ...p,
                                                showSupplierFilterBox: false,
                                              };
                                            });
                                          }}
                                        >
                                          {`${supplier?.name}`}
                                        </button>
                                      );
                                    })}
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>

                    <form className="form4" autoComplete="off">
                      <table>
                        <tbody>
                          {purchaseDetails?.ALLitemsPaidFor.length === 0 && (
                            <tr>
                              <td className="IsRequired">
                                <label htmlFor="DateofPayment">Date </label>{" "}
                                <span className="RequiredHash">*</span>
                              </td>
                              <td>
                                <input
                                  style={{
                                    position: "relative",
                                    left: "0.5px",
                                  }}
                                  ref={addToRequiredRefs}
                                  type={"date"}
                                  name="date"
                                  placeholder="Date"
                                  onChange={(e) => {
                                    setPurcahseDetails((p) => {
                                      return {
                                        ...p,
                                        dateofPurcahse: e.target.value,
                                      };
                                    });
                                  }}
                                ></input>
                              </td>
                            </tr>
                          )}

                          <tr>
                            <td>
                              <button
                                id="btn"
                                type={"submit"}
                                style={{}}
                                onClick={(e) => AddItem(e)}
                              >
                                Add
                              </button>
                            </td>
                            <td>
                              <button
                                id="btn"
                                type={"cancel"}
                                style={{}}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (checkForOngoingOperation()) {
                                    setBools((p) => {
                                      return { ...p, showCancelModal: true };
                                    });
                                  } else {
                                    cancelOperation();
                                  }
                                }}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
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
                      data: purchaseDetails?.ALLitemsPaidFor,
                      detailsExpanded: purchaseDetails?.detailsExpanded,
                    }}
                    Columns={{
                      title: ["Name", "Price", "Quantity", "Total"],
                      data: purchaseDetails.ALLitemsPaidFor.map(
                        ({ name, purchasePrice, quantity, total_cost }) => {
                          return { name, purchasePrice, quantity, total_cost };
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
                        action: (id) => {
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
                        action: (id) => {
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
                                ALLitemsPaidFor:
                                  purchaseDetails?.ALLitemsPaidFor?.filter(
                                    (element) => {
                                      return element?.id !== id;
                                    }
                                  ),
                              };
                            });
                          } else {
                            setPurcahseDetails((p) => {
                              return {
                                ...p,
                                ALLitemsPaidFor:
                                  purchaseDetails?.ALLitemsPaidFor?.filter(
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
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  );
};

export default PurchaseForm;
