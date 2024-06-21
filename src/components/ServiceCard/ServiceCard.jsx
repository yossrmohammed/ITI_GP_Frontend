/* eslint-disable react/prop-types */
function ServiceCard(props) {
  return (
    <div className="card w-60 bg-base-100">
  <div className="card-body">
    <h2 className="card-title">{props.title}</h2>
    <p>{props.body}</p>
    
  </div>
</div>
  )
}

export default ServiceCard