function Rating(props) {
    const arr = [];

    for(let i=0 ; i < 5 ; i++)
        {
            if (props.rate -1 == i)
                {
                    arr.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" key={i} checked disabled/>)
                }
            else 
            {
                arr.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" key={i} disabled/>)
            }
        }
  return (
        <div className="rating rating-md mt-2 mb-5 flex">
            {arr.map((el) => el)}
        </div>
  )
}

export default Rating