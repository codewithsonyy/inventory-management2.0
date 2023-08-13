"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const router = useRouter();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const { name, email, password, cpassword } = credentials;
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const resjson = await response.json();

      if (response?.ok) {
        props.showAlert("Account Created Successful", "success");
        localStorage.setItem("token", resjson.authtoken);
        setCredentials({ name: "", email: "", password: "", cpassword: "" });
        router.push("/");
        return;
      } else {
        props.showAlert("Invalid Details", "danger");
        return;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="p-10 h-fit">
        <h1 className="mb-8 font-extrabold text-4xl">
          Create an account to use Inventory Management{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={submitHandler}>
            <div>
              <label className="block font-semibold" htmlFor="name">
                name
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
            <div className="mt-4">
              <label className="block font-semibold" htmlFor="password">
                Confirm Password
              </label>
              <input
                className=" shadow-inner bg-white rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                type="password"
                name="cpassword"
                id="cpassword"
                required="required"
                value={credentials?.cpassword || ""}
                onChange={onChange}
                minLength={5}
                placeholder="Confirm Password"
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:rounded-full md:py-4 md:text-lg md:px-10"
              >
                Submit
              </button>
              <h1>
                If user already exits&#x2192;
                <Link
                  className="text-white font-bold active:text-black"
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
