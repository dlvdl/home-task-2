import { FC, ReactElement } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Todo } from "../features/todo/todoSlice"

interface Props {
  heading: Array<string>
  body: Array<Todo>
  type: "Active" | "Summary" | "Archive"
}

const Table: FC<Props> = ({ heading, body, type }): ReactElement => {
  return (
    <div>
      <table>
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
              <tr key={id}>
                <td>{name}</td>
                <td>{created}</td>
                <td>{category}</td>
                <td>{content}</td>
                <td>{dates}</td>
                <td>
                  <button>
                    <FontAwesomeIcon icon={"trash"} />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={"box-archive"} />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={"pen-to-square"} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
