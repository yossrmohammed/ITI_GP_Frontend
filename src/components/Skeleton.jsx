function Skeleton() {
  return (
        <div className="flex flex-col gap-4 w-80 ml-20 mt-10">
        <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
            </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        </div>
  )
}

export default Skeleton