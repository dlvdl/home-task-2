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
// type: "Edit_Menu" | "Create_Menu"
// action: function that describe action of a component

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

  const [actionSuccessed, setActionSuccessed] = useState(false)

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value)
  }

  const onCategoryChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoCategory(e.target.value as CategoryList)
  }

  const submitFormHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (todoName && todoContent && todoCategory) {
      action({ todoName, todoContent, todoCategory })
    }

    dispatch(unsetSelectedTodo())

    setTimeout(() => {
      setActionSuccessed(false)
    }, 500)

    setActionSuccessed(true)

    if (type === "Create_Menu") {
      setTodoName("")
      setTodoContent("")
      setTodoCategory("Task")
    }
  }

  const backButtonClickHandler = () => {
    if (type === "Create_Menu") {
      dispatch(openCreateMenu())
    }

    if (type === "Edit_Menu") {
      dispatch(openEditMenu())
    }
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
        <div className="">
          <Button title="Save" type="submit" className="button"></Button>
          <Button
            action={backButtonClickHandler}
            title="Back"
            className="button"
          ></Button>
        </div>
        {actionSuccessed ? (
          <div className="status-box">
            <p>{type === "Create_Menu" ? "Todo created!" : "Todo edited!"}</p>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  )
}

export default ActionMenu
