// i guess tests need to be in tsx format too, ts throws errors

// this is from robin wieruch
import React from "react";
// default from cra
import {
  render,
  screen,
  fireEvent,
  findByText,
  waitFor,
  getByText,
  waitForElementToBeRemoved,
  queryByText,
} from "@testing-library/react";
// from the docs
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Todo from "./Todo";

xdescribe("App Component", () => {
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

  xtest("select option: complete", () => {
    render(<App />);

    // can also use option nodes instead of data-testid
    const getSelect = screen.getByTestId("filter-todos") as HTMLSelectElement;
    const selectedVal = screen.getByTestId("complete");
    userEvent.selectOptions(getSelect, selectedVal);
    expect(getSelect.selectedOptions[0].value).toBe("complete");
  });
});

describe("Todo Component", () => {
  xtest("empty input produces no list item", async () => {
    render(<App />);

    const addTodoInput = screen.getByRole("textbox");
    const sampleText = "";
    userEvent.type(addTodoInput, sampleText);

    const addTask = screen.getByText(/add task/i);
    userEvent.click(addTask);

    // there should be no list item
    const todoContainer = screen.queryByTestId("todo-container");
    expect(todoContainer).toBeNull();
  });

  xtest("add text produces list item", async () => {
    render(<App />);

    const addTodoInput = screen.getByRole("textbox");
    const sampleText = "Buy 10 gallons of ice cream";
    userEvent.type(addTodoInput, sampleText);

    const addTask = screen.getByText(/add task/i);
    userEvent.click(addTask);
    await waitFor(() => {
      const deleteBtn = screen.getByText(/delete/i);
      expect(deleteBtn).toBeInTheDocument();
      const editBtn = screen.getByText(/edit/i);
      expect(editBtn).toBeInTheDocument();
      const listText = screen.getByText(sampleText);
      expect(listText).toBeInTheDocument();
    });
  });

  xtest("add text 3x produces 3 list items", async () => {
    render(<App />);
    const addTodoInput = screen.getByRole("textbox");
    const sampleText = "Buy 10 gallons of ice cream";

    const addMultipleTasks = jest.fn(() => {
      userEvent.type(addTodoInput, sampleText);
      const addTask = screen.getByText(/add task/i);
      userEvent.click(addTask);
      return;
    });

    addMultipleTasks();
    addMultipleTasks();
    addMultipleTasks();

    expect(addMultipleTasks).toHaveReturnedTimes(3);

    await waitFor(() => {
      // query returns array of matching nodes
      // find and get by returns some weird ass nodes
      const list = screen.queryAllByText("Buy 10 gallons of ice cream");
      expect(list).toHaveLength(3);
    });
  });

  xtest("delete removes chosen item from list", async () => {
    render(<App />);
    const addTodoInput = screen.getByRole("textbox");

    const addMultipleTasks = jest.fn((todo) => {
      userEvent.type(addTodoInput, todo);
      const addTask = screen.getByText(/add task/i);
      userEvent.click(addTask);
      return;
    });

    addMultipleTasks("weewhoo weewhoo");
    addMultipleTasks("blub blub");
    addMultipleTasks("grubb grubb");

    await waitFor(() => {
      const deleteBtns = screen.queryAllByText(/delete/i);
      expect(deleteBtns).toHaveLength(3);
    });

    let deleteBtns = screen.queryAllByText(/delete/i);
    const deleteTodo = screen.queryByText("blub blub");
    console.log("btn delete", deleteBtns[1]);
    userEvent.click(deleteBtns[1]);

    await waitFor(() => {
      expect(deleteTodo).not.toBeInTheDocument();
    });

    deleteBtns = screen.queryAllByText(/delete/i);
    expect(deleteBtns).toHaveLength(2);
  });

  test("check completion", () => {
    render(<App />);
  });

  // if container OR check box is clicked, then strike through should only occur in that container

  // this is its own test
  // EDITING
  // if click on edit, several things should happen:
  // edit button should now be save
  // input text should appear
  // upon clicking text, input should clear
  // if save when input is clear:
  // button switches back to edit
  // input box is removed
  // original text is back
  // if it was incomplete, it will display incomplete
  // if not clear
  // it should be incomplete
  // button switches back
  // input removed
  // new text in place

  // FILTER
  // if value is filter, all the items on the list should have the given value
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
