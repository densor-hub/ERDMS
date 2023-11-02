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

  it("should close select options when any part of document is clicked", async () => {
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
});
