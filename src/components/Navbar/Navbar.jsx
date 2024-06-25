import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
<div className="navbar bg-base-200 border-b-2">
  <div className="navbar-start">
    <div className="dropdown block md:hidden ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

          {/* patient links */}
          
          {(
            !loggedUser ||
            loggedUser?.role === 'patient' ) && 
          <>
            <li><Link to={"/doctors"} className=""> Doctors </Link></li>
            <li><Link to={"/nurses"} className=""> Nurses </Link></li>
            <li><Link to={"/doctors/home-visit"} className=""> Home visit </Link></li>
          </>
          }

          {/* doctor links */}

          { loggedUser?.role === 'doctor' &&
            <>
            <li><Link to={"/doctor/profile"} className="font-normal text-blue-600 mx-2 text-lg"> Profile </Link></li>
            <li><Link to={"/doctor/prescriptions/read"} className="font-normal text-blue-600 mx-2 text-lg"> Prescriptions </Link></li>
            <li><Link to={"/doctor/prescriptions/unread"} className="font-normal text-blue-600 mx-2 text-lg"> Unread </Link></li>
            <li><Link to={"/doctor/appointments"} className="font-normal text-blue-600 mx-2 text-lg"> Appointments </Link></li>
            </>
          }

          {/* nurse links */}

          {
            loggedUser?.role === 'nurse' &&
            <>
            <li><Link to={"/nurse/profile"} className="font-normal text-blue-600 mx-2 text-lg btn btn-ghost"> Profile </Link></li>
            <li><Link to={"/nurse/appointments"} className="font-normal text-blue-600 mx-2 text-lg btn btn-ghost"> Appointments </Link></li>
            </>
          }

      </ul>
    </div>
  
  <div className="navbar-start w-full">
    <Link to={'/'} className="btn btn-ghost text-2xl">MediPal</Link>
  
  {/* patient links */}
  
  {(loggedUser?.role === 'patient' || !loggedUser) &&
  <>
    <div className='hidden md:inline-block'>
    <Link to={"/doctors"} className="font-normal text-blue-600 mx-2 text-lg btn btn-ghost"> Doctors </Link>
    <Link to={"/nurses"} className="font-normal text-blue-600 mx-2 text-lg btn btn-ghost"> Nurses </Link>
    <Link to={"/doctors/home-visit"} className="font-normal text-blue-600 mx-2 text-lg btn btn-ghost"> Home visit </Link>
    </div>
  </>
  }

  { loggedUser?.role === 'patient' &&
    <>
    <div className='hidden md:inline-block'> 
    <Link to={"/patient/profile"} className="font-bold text-blue-600 mx-2 text-lg"> Profile </Link>
    <Link to={"/patient/appointments"} className="font-bold text-blue-600 mx-2 text-lg"> Appointments </Link>
    <Link to={"/patient/reviews"} className="font-bold text-blue-600 mx-2 text-lg"> Reviews </Link>
    </div>
    </>
  }

  {/* doctor links */}

  { loggedUser?.role === 'doctor' &&
    <>
    <div className='hidden md:inline-block'>
    <Link to={"/doctor/profile"} className="font-normal text-blue-600 mx-2 text-lg"> Profile </Link>
    <Link to={"/doctor/prescriptions/read"} className="font-normal text-blue-600 mx-2 text-lg"> Prescriptions </Link>
    <Link to={"/doctor/prescriptions/unread"} className="font-normal text-blue-600 mx-2 text-lg"> Unread </Link>
    <Link to={"/doctor/appointments"} className="font-normal text-blue-600 mx-2 text-lg"> Appointments </Link>
    </div>
    </>
  }


  {/* nurse links */}

  {
    loggedUser?.role === 'nurse' &&
    <>
    <Link to={"/nurse/profile"} className="font-normal text-blue-600 mx-2 text-lg btn btn-ghost"> Profile </Link>
    <Link to={"/nurse/appointments"} className="font-normal text-blue-600 mx-2 text-lg btn btn-ghost"> Appointments </Link>
    </>
  }

  {/* hospital links */}

  </div>
  </div>

  <div className="navbar-end">


    { loggedUser?.role === 'patient' || !loggedUser &&
      <Link to={"/icu"} className="font-normal text-blue-600 mx-2 p-2 text-lg btn btn-ghost"> Book ICU </Link>
    }
 
  {loggedUser &&
  <div className="avatar mx-3">
    <div className="w-12 rounded-full">
    
    {
    !loggedUser.image && 
    (loggedUser.role === 'doctor' || loggedUser.role === 'nurse') &&
    <>
    <img src={loggedUser.role === 'doctor' ? 'default_doctor.jpg' : 'default_nurse.jpg'} />
    </>
    }

    {
      loggedUser.image &&
      <>
      <img src={loggedUser.image} />
      <p>{loggedUser.name}</p>
      </>
    }
    </div>
  </div>
  }
    
  { loggedUser?.name && <p>{loggedUser.name}</p> }
    

  { !loggedUser &&
  <>
  <Link to={"/login"} className="btn btn-outline mx-2">
    Login
  </Link>
  <Link to={"/register"} className="btn btn-outline text-blue-600 hover:bg-blue-600 mx-2">
   Register
  </Link>
  </>
  }

  {
    loggedUser &&
  <button className="btn btn-sm btn-outline mx-2" onClick={handleLogout}>
   Logout
  </button>
  }


<label className="swap swap-rotate mx-3">
  <input type="checkbox" value="halloween" className="theme-controller" />

  <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
  <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
</label>

</div>

  </div>
);

}

export default Navbar;