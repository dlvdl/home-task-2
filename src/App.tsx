// import { useState } from "react"
import "./App.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { useAppSelector, useAppDispatch } from "./app/hooks"

import {
  Table,
  Button,
  ActionMenu,
  ActionFunctionProps,
  Switch,
} from "./components"
import {
  openCreateMenu,
  addTodo,
  editTodo,
  unsetSelectedTodo,
  refreshSummary,
} from "./features/todo/todoSlice"
import {
  faTrash,
  faBoxArchive,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { Factory, DateExtractor } from "./service/Todo"
library.add(faTrash, faBoxArchive, faPenToSquare, faPlus)
const todoBuilder = new Factory()
const extractDates = new DateExtractor()

function App() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todo.items)
  const id = useAppSelector((state) => state.todo.selectedTodoId)
  const summaryData = useAppSelector((state) => state.todo.summary)

  const openCreateMenuState = useAppSelector(
    (state) => state.todo.createMenuOpened
  )
  const openEditMenuState = useAppSelector((state) => state.todo.editMenuOpened)

  const openArchiveTableState = useAppSelector(
    (state) => state.todo.archiveTableOpened
  )

  function createButtonClickHandler() {
    dispatch(openCreateMenu())
  }

  function createMenuAction({
    todoName,
    todoCategory,
    todoContent,
  }: ActionFunctionProps) {
    const todo = todoBuilder.create(todoName, todoContent, todoCategory)
    dispatch(addTodo(todo))
    dispatch(refreshSummary())
  }

  function editMenuAction({
    todoName,
    todoCategory,
    todoContent,
  }: ActionFunctionProps) {
    const dates = extractDates.method(todoContent)

    dispatch(
      editTodo({
        category: todoCategory,
        content: todoContent,
        id: id as number,
        name: todoName,
        dates: dates as string[],
      })
    )
    dispatch(unsetSelectedTodo())
    dispatch(refreshSummary())
  }

  return (
    <div id="app">
      {openCreateMenuState ? (
        <ActionMenu type="Create_Menu" action={createMenuAction} />
      ) : openEditMenuState ? (
        <ActionMenu type="Edit_Menu" action={editMenuAction} />
      ) : (
        <div>
          <h2>Todo app</h2>
          <Table
            heading={["Name", "Created", "Category", "Content", "Dates"]}
            body={todos}
            type={openArchiveTableState ? "Archive" : "Active"}
          ></Table>
          <div className="button-box">
            {openArchiveTableState ? (
              ""
            ) : (
              <Button
                icon={faPlus}
                action={createButtonClickHandler}
                className="save-button"
              />
            )}
            <Switch />
          </div>
          <Table
            heading={["Category", "Active", "Archive"]}
            body={summaryData}
            type="Summary"
          ></Table>
        </div>
      )}
    </div>
  )
}

export default App
