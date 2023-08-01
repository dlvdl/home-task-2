import { FC, ReactElement } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Todo, Summary } from "../features/todo/todoSlice"
import { useAppDispatch } from "../app/hooks"
import {
  openEditMenu,
  setSelectedTodo,
  changeState,
  refreshSummary,
  deleteTodo,
} from "../features/todo/todoSlice"

interface TableProps {
  heading: Array<string>
  body: Array<Todo> | Array<Summary>
  type: "Active" | "Summary" | "Archive"
}

interface RowDefaultProps {
  data: Todo
  type: "Active" | "Archive"
}

interface RowArchiveProps {
  data: Summary
}

const render = (
  data: Array<Todo> | Array<Summary>,
  type: "Summary" | "Archive" | "Active"
) => {
  return data.map((item, i) => {
    return type === "Summary" ? (
      <TableRowSummary key={i} data={item as Summary} />
    ) : (
      <TableRowDefault key={i} data={item as Todo} type={type} />
    )
  })
}

const Table: FC<TableProps> = ({ heading, body, type }): ReactElement => {
  // const dispatch = useAppDispatch()
  // dispatch(refreshSummary())
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
      <tbody>{render(body, type)}</tbody>
    </table>
  )
}

const TableRowDefault: FC<RowDefaultProps> = ({ data, type }): ReactElement => {
  const dispatch = useAppDispatch()
  const { category, content, created, dates, id, name, archived } = data
  if ((type == "Archive" && !archived) || (type == "Active" && archived)) {
    return <></>
  }

  return (
    <tr className="table-row" key={id}>
      <td className="table-cell">{name}</td>
      <td className="table-cell">{created}</td>
      <td className="table-cell">{category}</td>
      <td className="table-cell">{content}</td>
      <td className="table-cell">{dates}</td>

      <td className="table-cell">
        <button>
          <FontAwesomeIcon
            icon={"trash"}
            onClick={() => {
              dispatch(deleteTodo(id))
              dispatch(refreshSummary())
            }}
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={"box-archive"}
            onClick={() => {
              dispatch(changeState(id))
              dispatch(refreshSummary())
            }}
          />
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
}

const TableRowSummary: FC<RowArchiveProps> = ({ data }): ReactElement => {
  const { active, archived, category } = data

  return (
    <tr className="table-row">
      <td className="table-cell">{category}</td>
      <td className="table-cell">{active}</td>
      <td className="table-cell">{archived}</td>
    </tr>
  )
}

export default Table
