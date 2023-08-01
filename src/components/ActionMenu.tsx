import React, { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  openCreateMenu,
  openEditMenu,
  unsetSelectedTodo,
} from "../features/todo/todoSlice"
import { Button } from "./index"

interface Props {
  type: "Edit_Menu" | "Create_Menu"
  action: ActionFunction
  id?: number
}

export interface ActionFunctionProps {
  todoName: string
  todoContent: string
  todoCategory: CategoryList
  id?: number
}

type CategoryList = "Task" | "Idea" | "Quote" | "Random Thought"

export type ActionFunction = ({
  todoCategory,
  todoContent,
  todoName,
  id,
}: ActionFunctionProps) => void

const ActionMenu: FC<Props> = ({ type, action }) => {
  const dispatch = useAppDispatch()
  const selctedTodoId = useAppSelector((state) => state.todo.selectedTodoId)
  const todos = useAppSelector((state) => state.todo.items)
  const todo = selctedTodoId
    ? todos.find((item) => item.id === selctedTodoId)
    : null

  const [todoContent, setTodoContent] = useState<string | undefined>(
    todo ? todo.content : ""
  )
  const [todoCategory, setTodoCategory] = useState<CategoryList>(
    todo ? todo.category : "Task"
  )
  const [todoName, setTodoName] = useState<string | undefined>(
    todo ? todo.name : ""
  )

  function onNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoName(e.target.value)
  }

  function onContentChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoContent(e.target.value)
  }

  function onCategoryChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    setTodoCategory(e.target.value as CategoryList)
  }

  function submitFormHandler(e: React.SyntheticEvent) {
    e.preventDefault()

    if (todoName && todoContent && todoCategory) {
      action({ todoName, todoContent, todoCategory })
    }
  }

  function backButtonClickHandler() {
    if (type === "Create_Menu") {
      dispatch(openCreateMenu())
    }

    if (type === "Edit_Menu") {
      dispatch(openEditMenu())
    }

    dispatch(unsetSelectedTodo())
  }

  return (
    <div>
      <h2>{type.split("_")[0]} Todo</h2>
      <form className="form" id="form" onSubmit={submitFormHandler}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={todoName}
          onChange={onNameChanged}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          value={todoContent}
          onChange={onContentChanged}
        />
        <select
          name="category"
          id="category"
          value={todoCategory}
          onChange={onCategoryChanged}
        >
          <option value="Task">Task</option>
          <option value="Idea">Idea</option>
          <option value="Quote">Quote</option>
          <option value="Quote">Random Thought</option>
        </select>
        <div className="button-box">
          <Button title="Save" type="submit" className="button"></Button>
          <Button
            action={backButtonClickHandler}
            title="Back"
            className="button"
          ></Button>
        </div>
        <div className="status-box hide">
          <p>Todo created!</p>
        </div>
      </form>
    </div>
  )
}

export default ActionMenu
