import { Link } from "react-router-dom"

function NotAuthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center">
            <p className="text-3xl font-bold mb-4">403</p>
            <p className="text-2xl text-red-600 mb-8">You are Not Authorized</p>
            <Link to={"/"} className="px-4 py-2 rounded-md btn btn-info ">
                Go Home
            </Link>
        </div>
    </div>
  )
}

export default NotAuthorized