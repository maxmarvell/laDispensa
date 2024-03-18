import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth"
import LoginBanner from "../../assets/display/loginBanner.jpeg"
import LoginBanner2 from "../../assets/display/loginBanner2.jpeg"
import * as light from '../../assets/icons/light'

export default function Login() {

  const { state } = useLocation();

  let { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [dataValue, setDataValues] = useState({
    "email": state?.email ? state.email : "",
    "password": "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [invalidInput, setInvalid] = useState(false)

  const handleLogin = async (e) => {
    try {
      await loginUser(e);
      navigate("/");
    } catch (error) {
      setInvalid(true);
    };
  }

  return (
    <div className="justify-center w-screen h-screen absolute">
      <img className="h-1/3 border-slate-950 absolute top-0 w-full object-cover -z-20" src={LoginBanner2} alt="" />
      <img className="h-2/3 border-t-4 border-slate-950 absolute bottom-0 w-full object-cover -z-20" src={LoginBanner} alt="" />
      <div className="absolute top-10 left-10 space-x-5">
        <button
          className={`p-1 border-2 bg-slate-950 border-slate-950`}
          onClick={() => navigate(-1)}
        >
          <img src={light.RefundBack} alt="go back" />
        </button>
        <button
          className={`p-1 border-2 bg-slate-950 border-slate-950`}
          onClick={() => navigate('/')}
        >
          <img src={light.Home} alt="go back" />
        </button>
      </div>
      <form
        className="flex space-y-10 flex-col mt-40 p-10 ml-20 mr-10  shadow-xl relative bg-slate-950 text-slate-50"
        onSubmit={handleLogin}
      >
        <div className="text-slate-950 uppercase text-6xl font-bold absolute left-0 -top-12 text-center">La Dispensa</div>
        <label className="flex flex-col space-y-4">
          <div className="font-bold uppercase">Email</div>
          <input
            type="text"
            value={dataValue.email}
            name="email"
            className="border-0 border-b-2 bg-slate-950 border-slate-50 py-2 focus:border-orange-300 focus:outline-none"
            placeholder="Type email here..."
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className="flex flex-col space-y-4">
          <div className="font-bold uppercase">Password</div>
          <input
            type="password"
            value={dataValue.password}
            name="password"
            className="border-0 border-b-2 bg-slate-950 border-slate-50 py-2 border-grey focus:border-orange-300 focus:outline-none"
            placeholder="Type password here..."
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        {invalidInput ? (
          <div className="text-xs text-red-500">The username and password provided have not matched any credentials please try again</div>
        ) : (
          null
        )}
        <div className="flex justify-center space-x-10 text-center">
          <button
            className="uppercase border-2 border-white px-2 py-1 hover:bg-orange-300 hover:text-slate-950 hover:border-slate-950"
            type="submit"
          >
            Submit
          </button>
          <NavLink
            className="uppercase border-2 border-white px-2 py-1 hover:bg-orange-300 hover:text-slate-950 hover:border-slate-950"
            to="/register"
          >
            Signup
          </NavLink>
        </div>
      </form>
    </div>
  )
}