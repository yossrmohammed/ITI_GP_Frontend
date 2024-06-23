import Rating from "../Rating/Rating";

function ReviewCard({ review }) {
    return (
    <div className="m-auto shadow-lg border-2 rounded-lg w-full overflow-hidden mb-10">
      <div className="px-4 py-2">
        <div className="flex items-center">
          <div className="ml-3">
        <div className="mt-2">
          <p className="">{review.review}</p>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex items-center">
            <Rating rate={review.rating}/>
          </div>
        </div>
          </div>
        </div>
            <p className="font-semibold ml-4">{review.patient.user.name}</p>
      </div>
    </div>
  );
}

export default ReviewCard