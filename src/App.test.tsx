// i guess tests need to be in tsx format too, ts throws errors
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

let addTodoInput: any, sampleText: string;

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
    addTodoInput = screen.getByRole("textbox");
    sampleText = "Chuck Norris was here";
    userEvent.type(addTodoInput, sampleText);
  });

  test("renders App component", () => {
    const todoInput = screen.getByRole("textbox");
    expect(todoInput).toBeInTheDocument();

    const todoAddBtn = screen.getByRole("button");
    expect(todoAddBtn).toBeInTheDocument();

    const selectFilter = screen.getByText(/filter by/i);
    expect(selectFilter).toBeInTheDocument();
  });

  test("input text recorded", () => {
    expect(addTodoInput).toHaveValue(sampleText);
  });

  test("clicking add button clears input", () => {
    const addTask = screen.getByText(/add task/i);
    userEvent.click(addTask);
    expect(addTodoInput).toHaveValue("");
  });

  test("pressing enter clears input", () => {
    // how to check it clears here
    fireEvent.keyUp(addTodoInput, { key: /enter/i, code: /enter/i });
    fireEvent.change(addTodoInput, { target: { value: "" } });
    expect(addTodoInput).toHaveValue("");
  });

  test("select option: complete", () => {
    // can also use option nodes instead of data-testid
    const getSelect = screen.getByTestId("filter-todos") as HTMLSelectElement;
    const selectedVal = screen.getByTestId("complete");
    userEvent.selectOptions(getSelect, selectedVal);
    expect(getSelect.selectedOptions[0].value).toBe("complete");
  });
});

describe("Todo Component", () => {
  let addMultipleTasks: any;
  beforeEach(() => {
    render(<App />);
    addTodoInput = screen.getByRole("textbox");
    sampleText = "Buy 10 gallons of ice cream";

    addMultipleTasks = jest.fn((todo) => {
      todo
        ? userEvent.type(addTodoInput, todo)
        : userEvent.type(addTodoInput, sampleText);
      const addTask = screen.getByText(/add task/i);
      userEvent.click(addTask);
      return;
    });
  });

  test("empty input produces no list item", async () => {
    sampleText = "";
    userEvent.type(addTodoInput, sampleText);

    const addTask = screen.getByText(/add task/i);
    userEvent.click(addTask);

    // there should be no list item
    const todoContainer = screen.queryByTestId("todo-container");
    expect(todoContainer).toBeNull();
  });

  test("add text produces list item", async () => {
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

  test("add text 3x produces 3 list items", async () => {
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

  test("delete removes chosen item from list", async () => {
    addMultipleTasks("weewhoo weewhoo");
    addMultipleTasks("blub blub");
    addMultipleTasks("grubb grubb");

    await waitFor(() => {
      const deleteBtns = screen.queryAllByText(/delete/i);
      expect(deleteBtns).toHaveLength(3);
    });

    let deleteBtns = screen.queryAllByText(/delete/i);
    const deleteTodo = screen.queryByText("blub blub");
    userEvent.click(deleteBtns[1]);

    await waitFor(() => {
      expect(deleteTodo).not.toBeInTheDocument();
    });

    deleteBtns = screen.queryAllByText(/delete/i);
    expect(deleteBtns).toHaveLength(2);
  });

  test("check completion", async () => {
    let targetTask = "blub blub";
    let grabTask;
    let incomplete;
    addMultipleTasks("weewhoo weewhoo");
    addMultipleTasks(targetTask);

    await waitFor(() => {
      incomplete = screen.queryAllByText("◻");
      grabTask = screen.getByText(targetTask);

      expect(grabTask).toBeInTheDocument();
      expect(incomplete).toHaveLength(2);
    });

    incomplete = screen.queryAllByText("◻");
    userEvent.click(incomplete[0]);
    incomplete = screen.queryAllByText("◻");
    expect(incomplete).toHaveLength(1);
  });
});

// // this outputs html of component, helps you with debugging, helps you write code with more confidence
// screen.debug();
