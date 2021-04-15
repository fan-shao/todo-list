// i guess tests need to be in tsx format too, ts throws errors

// this is from robin wieruch
import React from "react";
// default from cra
import { render, screen } from "@testing-library/react";
// from the docs
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  test("renders App component", () => {
    render(<App />);

    // arrange
    const todoInput = screen.getByRole("textbox");
    expect(todoInput).toBeInTheDocument();

    const todoAddBtn = screen.getByRole("button");
    expect(todoAddBtn).toBeInTheDocument();

    const selectFilter = screen.getByText(/filter by/i);
    expect(selectFilter).toBeInTheDocument();
  });

  test("input text recorded", () => {
    render(<input />);
  });

  // act
  xtest("click add button", () => {
    render(<App />);

    const addTask = screen.getByText(/add task/i);
    userEvent.click(addTask);
    // what happens when you click

    // submit button
    // on enter

    // fireEvent.keyDown(domNode, { key: 'Enter', code: 'Enter' })

    // select option

    // // this outputs html of component, helps you with debugging, helps you write code with more confidence
    // screen.debug();
  });
});

// test("renders input, button, dropdown", () => {
//   render(<App />);
//   // should have input
//   const textbox = screen.getByRole("form");
//   // should have button
//   const addBtn = screen.getByRole("button", { name: /add task/i });
//   // should have dropdown
//   const selectFilter = screen.getByRole("combobox", {
//     name: /filter list by completion/i,
//   });

//   expect(textbox).toBeInTheDocument();
//   expect(addBtn).toBeInTheDocument();
//   expect(selectFilter).toBeInTheDocument();
// });

// testing
/**
 * arrange
 * render the app component
 * app component should contain:
 * input text box, submit button, filter
 *
 * act
 * if no text in input, submit should render nothing
 * if text input, click submit should result in a new component to be rendered
 *
 * if filter, view all should have text with and without strikethough
 * and vice versa for other components
 */
