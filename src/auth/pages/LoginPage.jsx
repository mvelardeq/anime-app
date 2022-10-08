import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout";

import { googleIcon } from "../../assets/icons";
import {
  startLoginWithEmailPassword,
  startLoginWithGoogle,
} from "../../store/auth";

const initialForm = {
  email: "",
  password: "",
};

const valitationForm = {
  email: [(value) => value.includes("@"), "Email must be contain @"],
  password: [
    (value) => value.length >= 6,
    "password must have at least 6 characters",
  ],
};

export const LoginPage = () => {
  const {
    email,
    password,
    onInputChange,
    formState,
    emailValid,
    passwordValid,
    checkValidation,
  } = useForm(initialForm, valitationForm);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(checkValidation) dispatch(startLoginWithEmailPassword({ email, password }));
  };

  // console.log(formSubmitted && !!emailValid);

  return (
    <AuthLayout title={"Login"}>
      {/* <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
        <div className="input-section flex flex-col">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`${
              formSubmitted && !!emailValid ? "border-red-500" : "border-white"
            } bg-inherit border focus:outline-none rounded-md h-8 px-2`}
            onChange={onInputChange}
            value={email}
            name="email"
          />
          <span className="text-error-500">{formSubmitted && emailValid}</span>
        </div>
        <div className="input-section flex flex-col">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`${
              passwordValid && formSubmitted ? "border-red-500" : "border-white"
            } bg-inherit border focus:outline-none rounded-md h-8 px-2`}
            onChange={onInputChange}
            value={password}
            name="password"
          />
          <span className="text-error-500">
            {formSubmitted && passwordValid}
          </span>
        </div>
        <div className="button-login flex justify-between mt-3">
          <button
            className="w-24 text-center flex justify-center bg-info-500 py-2 rounded-md"
            type="submit"
          >
            Login
          </button>
          <div
            className=" hover:cursor-pointer w-24 text-center flex justify-center bg-info-500 py-2 rounded-md gap-1"
            onClick={() => dispatch(startLoginWithGoogle())}
          >
            <img src={googleIcon} alt="" />
          </div>
        </div>
        <span className="text-sm">
          You don't have a count?{" "}
          <Link to="/auth/sign-up" className="text-primary-500 underline">
            Sign Up
          </Link>
        </span>
      </form> */}

      <form className="space-y-6" onSubmit={onFormSubmit}>
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

        {/* <div className="flex items-start">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                </div>
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
        </div> */}

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2 mb-2"
          onClick={() => dispatch(startLoginWithGoogle())}
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to="/auth/sign-up"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
