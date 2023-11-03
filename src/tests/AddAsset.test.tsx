import React from "react";
import AddAsset from "../Pages/AddAsset.tsx";
import { BrowserRouter } from "react-router-dom";
import {
  render,
  screen,
  logDOM,
  logRoles,
  fireEvent,
  waitFor,
} from "@testing-library/react";

describe("Testing Add-Asset component", () => {
  it("should have a heading 'Add Asset'", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const formHeading = screen.getByRole("heading", { name: /Add Asset/i });
    expect(formHeading).toBeInTheDocument();
  });

  it("should have a required fielset with legend 'item name'", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const itemNameFieldSet = screen.getByRole("group", {
      name: /item name required/i,
    });
    expect(itemNameFieldSet).toBeInTheDocument();
  });

  it("should have a required input with placeholder 'item name'", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const itemNameRequiredInput = screen.getByPlaceholderText(/item name/i);
    expect(itemNameRequiredInput).toBeInTheDocument();
    expect(itemNameRequiredInput).toHaveProperty("required");
  });

  it("should have a required fielset with legend 'select type'", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const selectTypeFieldSet = screen.getByRole("group", {
      name: /select type/i,
    });
    expect(selectTypeFieldSet).toBeInTheDocument();
  });

  it("should have a required input with placeholder 'select type'", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const SelecTypeRequiredInput = screen.getByPlaceholderText(/select type/i);
    expect(SelecTypeRequiredInput).toBeInTheDocument();
    expect(SelecTypeRequiredInput).toHaveProperty("required");
  });

  it("should show select options when select input is clicked", async () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const SelecTypeRequiredInput = screen.getByPlaceholderText(/select type/i);
    let selectOptionsContainer;
    fireEvent.click(SelecTypeRequiredInput);
    await waitFor(
      () => {
        selectOptionsContainer = screen.getByTestId("select-options");
        expect(selectOptionsContainer).toBeInTheDocument();
      },
      { timeout: 100 }
    );
  });

  it("should close select options when any part of screen is clicked", async () => {
    fireEvent.click(document);
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const SelecTypeRequiredInput = screen.getByPlaceholderText(/select type/i);
    let selectOptionsContainer;
    fireEvent.click(SelecTypeRequiredInput);
    await waitFor(
      () => {
        selectOptionsContainer = screen.getByTestId("select-options");
        expect(selectOptionsContainer).toBeInTheDocument();
      },
      { timeout: 100 }
    );

    fireEvent.click(document);
    await waitFor(
      () => {
        const NullselectOptionsContainer =
          screen.queryByTestId("select-options");
        expect(NullselectOptionsContainer).not.toBeInTheDocument();
      },
      { timeout: 100 }
    );
  });

  it("should have a required fieldset with legend 'identification required' ", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    let identificationFieldset = screen.getByRole("group", {
      name: /Identification required/i,
    });

    expect(identificationFieldset).toBeInTheDocument();
  });

  it("should have required input with placeholder 'unique Identification'", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );

    let identificationInput = screen.getByPlaceholderText(
      /unique Identification/i
    );

    expect(identificationInput).toBeInTheDocument();
    expect(identificationInput).toHaveProperty("required");
  });

  it("should have a required fieldset with legend 'description required' ", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    let descriptionFieldset = screen.getByRole("group", {
      name: /description required/i,
    });
    expect(descriptionFieldset).toBeInTheDocument();
  });

  it("should have required input with placeholder 'short description'", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );

    let descriptionInput = screen.getByPlaceholderText(/short description/i);
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveProperty("required");
  });

  it("should render Button type submit with name 'submit' ", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    let submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should render Button type reset with name 'cancel' ", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    let cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it("should show feedback 'please enter all required fields' if any of the inputs are empty whiles submit button is clicked and clear feedback after 3 seconds", async () => {
    const container = render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );
    const nullfeedbackText = screen.queryByText(
      /please enter all required fields/i
    );
    expect(nullfeedbackText).toBeNull();
    const itemNameRequiredInput = screen.getByPlaceholderText(/item name/i);
    expect(itemNameRequiredInput).toHaveTextContent("");

    const SelecTypeRequiredInput = screen.getByPlaceholderText(/select type/i);
    expect(SelecTypeRequiredInput).toHaveTextContent("");

    let identificationInput = screen.getByPlaceholderText(
      /unique Identification/i
    );
    expect(identificationInput).toHaveTextContent("");

    let descriptionInput = screen.getByPlaceholderText(/short description/i);
    expect(descriptionInput).toHaveTextContent("");

    let submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    const feedbackText = screen.getByText(/please enter all required fields/i);
    expect(feedbackText).toBeInTheDocument();

    //clearing feedbcak after 3 seconds
    await waitFor(
      () => {
        const clearedFeedback = screen.queryByText(
          /please enter all required fields/i
        );
        expect(clearedFeedback).not.toBeInTheDocument();
      },
      { timeout: 3100 }
    );
  });

  it("should show cancel modal, if an input contains data and submit button is clicked", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );

    const nullCancelModal = screen.queryByTestId(/modal/i);
    expect(nullCancelModal).not.toBeInTheDocument();

    let inputForTest = screen.getByPlaceholderText(/item name/i);
    fireEvent.change(inputForTest);

    const cancelModal = screen.queryByTestId(/modal/i);
    if (inputForTest.textContent.length === 0) {
      expect(cancelModal).not.toBeInTheDocument();
    } else {
      expect(cancelModal).toBeInTheDocument();
    }
  });

  it("should render cancel notice on cancel modal", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );

    if (screen.queryByTestId(/modal/i) !== null) {
      let firstParagraph = screen.getByRole("paragraph", {
        name: /You will lose current operation/i,
      });
      let seconfParagraph = screen.getByRole("paragraph", {
        name: /Do you still want to Cancel?/i,
      });

      expect(firstParagraph).toBeInTheDocument();
      expect(seconfParagraph).toBeInTheDocument();
    }
  });

  it("should render Yes and No buttons on cancel modal", () => {
    render(
      <BrowserRouter>
        <AddAsset />
      </BrowserRouter>
    );

    if (screen.queryByTestId(/modal/i) !== null) {
      let YesButton = screen.getByRole("button", {
        name: /Yes/i,
      });
      let NoButton = screen.getByRole("button", {
        name: /No/i,
      });

      expect(YesButton).toBeInTheDocument();
      expect(NoButton).toBeInTheDocument();
    }
  });
});
