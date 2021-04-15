// i guess tests need to be in tsx format too, ts throws errors

// this is from robin wieruch
import React from "react";
// default from cra
import { render, screen, fireEvent } from "@testing-library/react";
// from the docs
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  xtest("renders App component", () => {
    render(<App />);

    // arrange
    const todoInput = screen.getByRole("textbox");
    expect(todoInput).toBeInTheDocument();

    const todoAddBtn = screen.getByRole("button");
    expect(todoAddBtn).toBeInTheDocument();

    const selectFilter = screen.getByText(/filter by/i);
    expect(selectFilter).toBeInTheDocument();
  });

  xtest("input text recorded", () => {
    render(<App />);

    const addTodoInput = screen.getByRole("textbox");
    const sampleText = "Chuck Norris was here";
    userEvent.type(addTodoInput, sampleText);
    expect(addTodoInput).toHaveValue(sampleText);
  });

  // act
  xtest("clicking add button clears input", () => {
    render(<App />);

    const addTodoInput = screen.getByRole("textbox");
    const sampleText = "Chuck Norris was here";
    userEvent.type(addTodoInput, sampleText);

    const addTask = screen.getByText(/add task/i);
    userEvent.click(addTask);
    expect(addTodoInput).toHaveValue("");
  });

  xtest("pressing enter clears input", () => {
    render(<App />);

    const addTodoInput = screen.getByRole("textbox");
    const sampleText = "Chuck Norris was here";
    userEvent.type(addTodoInput, sampleText);

    // how to check it clears here
    fireEvent.keyUp(addTodoInput, { key: /enter/i, code: /enter/i });
    expect(addTodoInput).toHaveValue("");
  });

  test("select options", () => {
    render(<App />);

    // can also use option nodes instead of data-testid
    const getSelect = screen.getByTestId("filter-todos") as HTMLSelectElement;
    const selectedVal = screen.getByTestId("complete");
    userEvent.selectOptions(getSelect, selectedVal);
    expect(getSelect.selectedOptions[0].value).toBe("complete");
  });
});

// select option

// // this outputs html of component, helps you with debugging, helps you write code with more confidence
// screen.debug();

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
