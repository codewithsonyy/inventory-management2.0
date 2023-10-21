"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "@/components/Alert";

const Signup = () => {
  const [alert, setAlert] = useState(null);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const { name, email, password } = credentials;
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const res = await response.json();

      if (res?.success) {
        showAlert("Account Created Successful!", "success");
        localStorage.setItem("token", res.authtoken);

        setCredentials({ name: "", email: "", password: "" });
        //router.push("/");
        return;
      } else {
        showAlert(res.error ? res.error : "Something went wrong!", "danger");
        setCredentials({ name: "", email: "", password: "" });
        // router.push("/login");
        return;
      }
    } catch (error) {
      showAlert(
        error instanceof Object && error.message
          ? error.message
          : error
          ? error
          : "Something went wrong!",
        "danger"
      );
    }
  };

  return (
    <div>
      <div className="p-10 h-fit">
        <Alert alert={alert} showAlert={showAlert} />

        <div className="grid grid-cols-1 md:grid-cols-2 rounded-md xl:w-2/3 lg:p-10 gap-8">
          <form onSubmit={submitHandler}>
            <div>
              <label className="block font-semibold" htmlFor="name">
                Name
              </label>
              <input
                className="w-full shadow-inner bg-white rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
                type="text"
                name="name"
                required="required"
                id="name"
                placeholder="Enter name"
                value={credentials?.name || ""}
                onChange={onChange}
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="email ">
                Email
              </label>
              <input
                className=" shadow-inner bg-white rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                type="email"
                name="email"
                id="email"
                value={credentials?.email || ""}
                onChange={onChange}
                placeholder="Enter email"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className=" shadow-inner bg-white rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                type="password"
                name="password"
                required="required"
                value={credentials?.password || ""}
                onChange={onChange}
                minLength={5}
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-800 hover:rounded-none active:animate-ping md:py-4 md:text-lg md:px-10"
              >
                Submit
              </button>
              <h1 className="ml-4">
                If user already exits&#x2192;
                <Link
                  className="text-green-400 font-bold active:text-gray-200"
                  href="/login"
                >
                  {" "}
                  Please Login
                </Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
