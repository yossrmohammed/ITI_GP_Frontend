/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function ServiceCard(props) {
  return (
    <div className="card w-60 bg-base-100">
  <div className="card-body">
    <FontAwesomeIcon className="self-start text-4xl text-blue-600 border-b-2 border-red-500 p-3" icon={props.icon}></FontAwesomeIcon>
    <h2 className="card-title">{props.title}</h2>
    <p>{props.body}</p>
    
  </div>
</div>
  )
}

export default ServiceCard