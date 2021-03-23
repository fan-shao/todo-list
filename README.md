# Task: Todo List

**Features**

- Add new items and append them to the bottom of the list with an input and button
- Remove items from the list

**Optional Features Included**

- Mark item as complete
- Edit item on list
- Delete item from list

## Installation

Clone the repo into your local machine with the following:

### `git clone https://github.com/fan-shao/todo-list.git`

Install dependencies using:

### `npm install`

This app uses React v.17. In the project directory, run the following:

### `yarn start` or `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. This app is running in development mode.

## App Information

The app contains two components: **`App`** and **`Todo`**

### App Component

The top level **`App`** component contains the following user actions: `Add Todo` and `Filter Todo by Completion`. The default view for filter is _`View All`_.

The user can add items to the list either by clicking the _`Add Task`_ button or by pressing the `Enter` key. The item will not add if the input box is empty. Added tasks will display on the page.

The `Filter` allows users to display their tasks by completion. The default view is _`View All`_, and they can select also between _`Complete`_ and _`Incomplete`_.

### Todo Component

Contents of the task can be found in the **`Todo`** component. It contains the following user actions:

- `Complete Task`: Clicking on the empty box to the left of the task will check off the box and put a strikethrough on the targeted task.
- `Edit Task`: Clicking on the _`Edit`_ button causes a toggle on both the task and the button for the selected task. The task field will display a text input and the _`Edit`_ button will switch to a _`Save`_ button.
  - If the user makes no changes or has nothing in the input and clicks _`Save`_, the task will not be modified.
  - If the user makes a change, upon clicking _`Save`_, if the task was previously complete, it will reset to incomplete: The _`Complete`_ box will become unmarked and the task will not have a strikethrough. If the task was previously incomplete, the display will not change.
- `Delete Task`: Clicking on the _`Delete`_ button will remove the targeted task from the list.

The list of tasks is displayed with alternating colors to help distinguish between the tasks.

### HTML and CSS

The app is split into 3 sections: _`Header`_, _`User Action`_, and the _`List of Todos`_.

The _`User Action`_ is added in a **`section`** tag because other tags don't seem to fit. The closest is **`nav`**, but the user is not navigating anywhere else.

_`List of Todos`_ contains the main content of the page, so it is assigned the **`main`** tag.

**`div`** tags are used to help with content placement.

The CSS is named using the _BEM methodology_. Styling is grouped by component, with the exception of the header.
