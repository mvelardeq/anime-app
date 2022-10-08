import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { cameraIcon, userIcon } from "../../assets/icons"
import { useForm } from "../../hooks";
import { MoviesLayout } from "../layout"

const initialForm = {
  displayName:'',
  email: "",
  password: "",
};

const valitationForm = {
  email: [ (value) => value.includes("@"), "Email must be contain @" ],
  password: [ (value) => value.length >= 6, "password must have at least 6 characters" ],
  displayName: [ (value) => value.length >= 1, "name is required" ],
};

export const ProfilePage = () => {

  const { onInputChange, formState, emailValid, passwordValid, displayNameValid } = useForm(
    initialForm,
    valitationForm
  );
  const [formSubmitted, setFormSubmitted] = useState(false)

  const dispatch = useDispatch()
  const [selectedFile, setselectedFile] = useState(null)
  const [url, setUrl] = useState(null)

  const {displayName,photoURL,email, password} = useSelector(state=>state.auth)

  const onFormSubmit = (e) => {
    e.preventDefault();
    // dispatch(startSignInWithEmailPassword({...formState,selectedFile}))
    // dispatch(startUploadingFile(selectedFile))
    console.log(formState)
    setFormSubmitted(true)
  };

  return (
    <MoviesLayout>
      <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
        <div className="input-section flex flex-col gap-3">
          <div className="avatar-image mx-auto overflow-hidden w-20 h-20 rounded-full bg-gray-300">
            <img src={photoURL ? photoURL : userIcon} className={photoURL ? "h-full w-full object-cover" : "m-4"} alt="" />
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
          <button className="mx-auto text-center bg-info-500 py-2 px-4 rounded-md self-center" type="submit">
            Update Profile
          </button>
        </div>
      </form>
      
    </MoviesLayout>
  )
}
