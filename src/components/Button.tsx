import React, { FC } from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  action: React.MouseEventHandler
  title?: string
  icon: IconProp
}

const Button: FC<Props> = ({ action, title, icon }) => {
  return (
    <button onClick={action}>
      {title ? <p>{title}</p> : <FontAwesomeIcon icon={icon} />}
    </button>
  )
}

export default Button
