import React, { FC } from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  action?: React.MouseEventHandler
  title?: string
  icon?: IconProp
  className?: string
  type?: "submit" | "reset" | "button" | undefined
}

const Button: FC<Props> = ({ action, title, icon, className, type }) => {
  return (
    <button className={className} onClick={action} type={type}>
      {title ? <p>{title}</p> : icon ? <FontAwesomeIcon icon={icon} /> : ""}
    </button>
  )
}

export default Button
