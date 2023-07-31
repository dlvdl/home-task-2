import { useState } from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import "./App.css"
import { Table } from "./components"
import {
  faTrash,
  faBoxArchive,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons"

library.add(faTrash, faBoxArchive, faPenToSquare)

function App() {
  const todos = useAppSelector((state) => state.todo.items)

  return (
    <>
      {
        <Table
          heading={["Name", "Created", "Category", "Content", "Dates"]}
          body={todos}
          type="Active"
        ></Table>
      }
    </>
  )
}

export default App
