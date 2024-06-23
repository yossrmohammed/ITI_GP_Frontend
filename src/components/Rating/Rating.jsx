function Rating(props) {
    const arr = [];
    const rate = Number(props.rate) || 0;
    for(let i=0 ; i < 5 ; i++)
        {
            if (rate -1 == i)
                {
                    arr.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" key={i} checked disabled/>)
                }
            else 
            {
                arr.push(<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-500" key={i} disabled/>)
            }
        }
  return (
        <div className="rating rating-md mt-2 mb-5 flex">
            { rate == 0 
            ? <div className="rating">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
            </div> 
            :
             arr.map((el) => el)
             }
            <p className="ml-3">{rate}</p>
        </div>
  )
}

export default Rating