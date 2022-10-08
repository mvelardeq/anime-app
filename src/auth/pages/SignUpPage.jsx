import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { startSignInWithEmailPassword, startUploadingFile } from "../../store/auth";
import { AuthLayout } from "../layout";
import {cameraIcon, userIcon} from "../../assets/icons"
import { useRef } from "react";
import { useEffect } from "react";
import { CameraIcon } from "../components/CameraIcon";

const initialForm = {
  displayName:'',
  email: "",
  password: "",
};

const valitationForm = {
  email: [ (value) => value.includes("@"), "Email must be contain @" ],
  password: [ (value) => value.length >= 6, "Password must have at least 6 characters" ],
  displayName: [ (value) => value.length >= 1, "Name is required" ],
};

export const SignUpPage = () => {

  const { email, password, displayName, onInputChange, formState, emailValid, passwordValid, displayNameValid, checkValidation } = useForm(
    initialForm,
    valitationForm
  );
  const [formSubmitted, setFormSubmitted] = useState(false)

  const dispatch = useDispatch()
  const [selectedFile, setselectedFile] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(()=>{

    if(!selectedFile){
      return
    }
    
    const ruta = URL.createObjectURL(selectedFile)
    setUrl(ruta)
    
  },[selectedFile])

  
  const onFormSubmit = (e) => {
    e.preventDefault();
    if(checkValidation) dispatch(startSignInWithEmailPassword({...formState,selectedFile}))
    // dispatch(startUploadingFile(selectedFile))
    console.log(formState)
    setFormSubmitted(true)
  };




  return (
    <AuthLayout title={"Sign Up"}>
      {/* <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
        <div className="input-section flex flex-col gap-3">
          <div className="avatar-image mx-auto overflow-hidden w-20 h-20 rounded-full bg-gray-300">
            <img src={url ? url : userIcon} className={url ? "h-full w-full object-cover" : "m-4"} alt="" />
          </div>
          <input
            type="file"
            id="photo"
            className="hidden"
            name="photo"
            onChange={e=>setselectedFile(e.target.files[0])}
            disabled={false}
          />
          <label htmlFor="photo" className={`${false ? 'bg-gray-500' : 'hover:cursor-pointer' } p-2 rounded-lg camera-text flex items-center gap-3 mx-auto`}>
            <img src={cameraIcon} className="w-7" alt="" />
            <p>Add an avatar</p>
          </label>
        </div>
        <div className="input-section flex flex-col">
          <label htmlFor="name" className="mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            className={`${(displayNameValid && formSubmitted) ? 'border-red-500' : 'border-white' } bg-inherit border focus:outline-none rounded-md h-8 px-2`}
            onChange={onInputChange}
            value={displayName}
            name="displayName"
          />
          <span className="text-error-500">{formSubmitted && displayNameValid}</span>
        </div>
        <div className="input-section flex flex-col">
          <label htmlFor="email" className="mb-2">Email</label>
          <input
            type="email"
            id="email"
            className={`${(emailValid && formSubmitted) ? 'border-red-500' : 'border-white' } bg-inherit border focus:outline-none rounded-md h-8 px-2`}
            onChange={onInputChange}
            value={email}
            name="email"
          />
          <span className="text-error-500">{formSubmitted && emailValid}</span>
        </div>
        <div className="input-section flex flex-col">
          <label htmlFor="password" className="mb-2">Password</label>
          <input
            type="password"
            id="password"
            className={`${(passwordValid && formSubmitted) ? 'border-red-500' : 'border-white' } bg-inherit border focus:outline-none rounded-md h-8 px-2`}
            onChange={onInputChange}
            value={password}
            name="password"
          />
          <span className="text-error-500">{formSubmitted && passwordValid}</span>
        </div>
        <div className="button-login flex mt-3">
          <button className="mx-auto w-24 text-center bg-info-500 py-2 rounded-md self-center" type="submit">
            Sign Up
          </button>
        </div>
        <span className="text-sm">
          You have a count?{" "}
          <Link to="/auth/login" className="text-primary-500 underline">
            Login
          </Link>
        </span>
      </form> */}

      <form className="space-y-6" onSubmit={onFormSubmit}>
        <div className="input-section flex flex-col gap-3">
          <div className="avatar-image mx-auto overflow-hidden w-20 h-20 rounded-full bg-gray-300">
            <img src={url ? url : userIcon} className={url ? "h-full w-full object-cover" : "m-4"} alt="" />
          </div>
          <input
            type="file"
            id="photo"
            className="hidden"
            name="photo"
            onChange={e=>setselectedFile(e.target.files[0])}
            disabled={false}
          />
          <label htmlFor="photo" className={`${false ? 'bg-gray-500' : 'hover:cursor-pointer' } p-2 rounded-lg camera-text flex items-center gap-3 mx-auto`}>
            <CameraIcon fill={"#1A7BE5"} with={25} height={25} />
            <p className="text-gray-900 dark:text-gray-300">Add an avatar</p>
          </label>
        </div>
        <div>
          <label
            htmlFor="displayName"
            className={`${
              displayNameValid && formSubmitted
                ? "text-red-700 dark:text-red-500"
                : "text-gray-900 dark:text-gray-300"
            } block mb-2 text-sm font-medium`}
          >
            Your Full Name
          </label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Full Name"
            className={
              displayNameValid && formSubmitted
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            }
            required=""
            onChange={onInputChange}
            value={displayName}
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {formSubmitted && displayNameValid}
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className={`${
              emailValid && formSubmitted
                ? "text-red-700 dark:text-red-500"
                : "text-gray-900 dark:text-gray-300"
            } block mb-2 text-sm font-medium`}
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
            className={
              emailValid && formSubmitted
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            }
            required=""
            onChange={onInputChange}
            value={email}
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {formSubmitted && emailValid}
          </p>
        </div>
        <div>
          <label
            htmlFor="password"
            className={`${
              passwordValid && formSubmitted
                ? "text-red-700 dark:text-red-500"
                : "text-gray-900 dark:text-gray-300"
            } block mb-2 text-sm font-medium`}
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className={
              passwordValid && formSubmitted
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            }
            required=""
            onChange={onInputChange}
            value={password}
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {formSubmitted && passwordValid}
          </p>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign up
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          You have a count?{" "}
          <Link
            to="/auth/login"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
