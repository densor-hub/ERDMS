import React from "react";
import {
  render,
  screen,
  logDOM,
  logRoles,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Login from "../Pages/Login.tsx";

describe("Testing Login Page", () => {
  it("should render Logo", () => {
    render(<Login />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render name of app", () => {
    render(<Login />);
    const name1OfApp = screen.getByText(/C Y N O/i);
    const name2OfApp = screen.getByText(/S U R E/i);
    expect(name1OfApp).toBeInTheDocument();
    expect(name2OfApp).toBeInTheDocument();
  });

  it("should have required fleildset for email/username ", () => {
    render(<Login />);
    const emailOrUsernameFieldSet = screen.getByRole("group", {
      name: /email or username required/i,
    });
    expect(emailOrUsernameFieldSet).toBeInTheDocument();
  });

  it("should have required fleildset for password  ", () => {
    render(<Login />);
    const passwordFieldset = screen.getByRole("group", { name: /password/i });
    expect(passwordFieldset).toBeInTheDocument();
  });

  it("should have required email/username input with placeholder 'email or username'", () => {
    render(<Login />);
    const emailOrUsernameInput =
      screen.getByPlaceholderText(/email or username/i);
    expect(emailOrUsernameInput).toBeInTheDocument();
    expect(emailOrUsernameInput).toHaveProperty("required");
  });

  it("should have required password input with placeholder 'pasword'", () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveProperty("required");
  });

  it("should have a sumbit button inscriped 'login'", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveProperty("type", "submit");
  });

  it("should have a reset button inscriped 'cancel'", () => {
    render(<Login />);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveProperty("type", "reset");
  });

  it("should show feedback 'please enter all required fields' if any of the inputs are empty whiles login button is clicked and clear feedback after 3 seconds", async () => {
    const container = render(<Login />);
    const nullfeedbackText = screen.queryByText(
      /please enter all required fields/i
    );
    expect(nullfeedbackText).toBeNull();

    const emailOrUsernameInput =
      screen.getByPlaceholderText(/email or username/i);
    expect(emailOrUsernameInput).toHaveTextContent("");

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveTextContent("");

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
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

  it("should show Cancel Modal when Cancel button is clicked whiles there is value in Email/username input field", () => {
    render(<Login />);
    const nullcancelModal = screen.queryByTestId(/modal/i);
    expect(nullcancelModal).not.toBeInTheDocument();

    const emailOrUsernameInput =
      screen.getByPlaceholderText(/email or username/i);
    fireEvent.change(emailOrUsernameInput);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    const cancelModal = screen.queryByTestId(/modal/i);
    expect(cancelModal).not.toBeInTheDocument();
  });

  it("should show Cancel Modal when Cancel button is clicked whiles there is value in Password input field", () => {
    render(<Login />);
    const nullcancelModal = screen.queryByTestId(/modal/i);
    expect(nullcancelModal).not.toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/email or username/i);
    fireEvent.change(passwordInput);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    const cancelModal = screen.queryByTestId(/modal/i);
    expect(cancelModal).not.toBeInTheDocument();
  });
});
