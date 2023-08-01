import { FC, ReactElement } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Todo } from "../features/todo/todoSlice"
import { useAppDispatch } from "../app/hooks"
import { openEditMenu, setSelectedTodo } from "../features/todo/todoSlice"

interface Props {
  heading: Array<string>
  body: Array<Todo>
  type: "Active" | "Summary" | "Archive"
}

const Table: FC<Props> = ({ heading, body, type }): ReactElement => {
  const dispatch = useAppDispatch()
  return (
    <table className="table">
      <thead>
        <tr>
          {heading.map((item, i) => {
            return <th key={i}>{item}</th>
          })}

          {type === "Active" || type === "Archive" ? (
            <th>
              <FontAwesomeIcon icon={"trash"} />
              <FontAwesomeIcon icon={"box-archive"} />
              <FontAwesomeIcon icon={"pen-to-square"} />
            </th>
          ) : (
            ""
          )}
        </tr>
      </thead>
      <tbody>
        {body.map((item) => {
          const { name, category, content, created, dates, id } = item
          return (
            <tr className="table-row" key={id}>
              <td className="table-cell">{name}</td>
              <td className="table-cell">{created}</td>
              <td className="table-cell">{category}</td>
              <td className="table-cell">{content}</td>
              <td className="table-cell">{dates}</td>
              <td className="table-cell">
                <button>
                  <FontAwesomeIcon icon={"trash"} />
                </button>
                <button>
                  <FontAwesomeIcon icon={"box-archive"} />
                </button>
                <button
                  onClick={() => {
                    dispatch(openEditMenu())
                    dispatch(setSelectedTodo(id))
                  }}
                >
                  <FontAwesomeIcon icon={"pen-to-square"} />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
