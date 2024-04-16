import React from "react";
import {Link} from "react-router-dom";

function LinkTo(props) {

  const text = props.text
  const page = props.page
  const color = props.color
  return (
    <Link to={`/${page}`} className={`text-${color} hover:text-lg transition-all`}>{text}</Link> /*add arrow icon*/
  )
}

export default LinkTo;