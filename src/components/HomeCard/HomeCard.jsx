import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
function HomeCard(props) {
  return (
    <div className="card card-side bg-base-100 shadow-xl m-5">
        <figure className="w-42 h-42 overflow-hidden">
            <img
            src={props.image}
            alt="Movie"
            className="w-full h-full object-cover" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{props.title}</h2>
            <p>{props.content}</p>
            <div className="card-actions justify-end">
            <Link to={props.link} className="link-hover text-blue-600">{props.book}</Link>
            </div>
        </div>
    </div>

  )
}

export default HomeCard