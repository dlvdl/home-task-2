import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { openArchiveTable } from "../features/todo/todoSlice"

export const Switch: FC = () => {
  const openState = useAppSelector((state) => state.todo.archiveTableOpened)
  const dispatch = useAppDispatch()
  return (
    <div className="switch-container">
      <p>Show archived notes</p>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={() => {
          dispatch(openArchiveTable())
        }}
      />
      <label
        className={`react-switch-label ${openState ? "checked" : ""}`}
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </div>
  )
}
