import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import axiosClient from "../axios.js";

export default function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [responseError, setResponseError] = useState({ __html: "" });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = () => {
    let inputError = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (
      !formInput.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formInput.email)
    ) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      });
      return false;
    }

    if (formInput.password.length <= 4) {
      setFormError({
        ...inputError,
        password: "Password must be longer than 4 characters",
      });
      return false;
    }
    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password confirmation does not match",
      });
      return false;
    }

    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setResponseError({ __html: "" });
    setFormError({});
    if (!validateFormInput()) return;
    axiosClient
      .post("/signup", {
        name: formInput.name,
        email: formInput.email,
        password: formInput.password,
        password_confirmation: formInput.confirmPassword,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setResponseError({ __html: finalErrors.join("<br>") });
        }
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create New Account
      </h2>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-4"
          action="#"
          method="POST"
          onSubmit={onSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          {responseError.__html && (
            <div
              className="response-error"
              dangerouslySetInnerHTML={responseError}
            ></div>
          )}
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div>
              <input
                id="full-name"
                name="name"
                type="text"
                value={formInput.name}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formInput.email}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span className="error-message">{formError.email}</span>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password{" "}
                <span className="text-xs font-normal">
                  (more than 4 characters)
                </span>
              </label>
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formInput.password}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span className="error-message">{formError.password}</span>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password-confirmation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password Confirmation
              </label>
            </div>
            <div>
              <input
                id="password-confirmation"
                name="confirmPassword"
                type="password"
                required
                value={formInput.confirmPassword}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <span className="error-message">{formError.confirmPassword}</span>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Signup
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Already have an account?
          </a>
        </p>
      </div>
    </>
  );
}
