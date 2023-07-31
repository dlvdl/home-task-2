// import { useState } from "react"
import "./App.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { useAppSelector, useAppDispatch } from "./app/hooks"
import { Table, Button } from "./components"
import { openCreateMenu } from "./features/todo/todoSlice"
import {
  faTrash,
  faBoxArchive,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
library.add(faTrash, faBoxArchive, faPenToSquare, faPlus)

function App() {
  const todos = useAppSelector((state) => state.todo.items)
  const dispatch = useAppDispatch()

  function createButtonClickHandler() {
    dispatch(openCreateMenu())
  }

  return (
    <div id="app">
      <Table
        heading={["Name", "Created", "Category", "Content", "Dates"]}
        body={todos}
        type="Active"
      ></Table>
      <Button
        icon={faPlus}
        //title="Create todo"
        action={createButtonClickHandler}
      />
    </div>
  )
}

export default App
