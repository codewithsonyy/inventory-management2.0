"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "@/components/Alert";
import ButtonPrimary from "../../../components/ButtonPrimary";

const Signup = () => {
  const [alert, setAlert] = useState(null);
  const [inputType, setInputType] = useState("password")

  const changeInputType = () => {
    if (inputType == "password") {
      setInputType("text")
    } else if (inputType == "text") {
      setInputType("password")
    }
  }
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
    <section className="h-screen">
      <Alert alert={alert} showAlert={showAlert} />

      <div className="h-full mt-8 p-8  rounded-md">
        <div className="g-6 flex h-full flex-wrap mx-auto items-center w-2/3  justify-center lg:justify-between">
          <div className="shrink-1 mb-8 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img src="/signup-bg.jpg" className="w-full border rounded-3xl" alt="Sample image" />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={submitHandler}>
              <div className="relative mb-6">
                <label className="" htmlFor="name">Name</label>
                <input
                  className="peer block min-h-[auto] w-full rounded  bg-white px-3 py-[0.32rem] leading-[2.15] outline-none"
                  type="text"
                  id="name"
                  required="true"
                  name="name"
                  value={credentials?.name || ""}
                  onChange={onChange}
                  placeholder="Enter your name"
                />
              </div>


              <div className="relative mb-6">
                <label className="" htmlFor="email">Email</label>
                <input
                  className="peer block min-h-[auto] w-full rounded  bg-white px-3 py-[0.32rem] leading-[2.15] outline-none"
                  type="email"
                  id="email"
                  name="email"
                  value={credentials?.email || ""}
                  onChange={onChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative mb-6">
                <label className="" htmlFor="password">Password</label>
                <input
                  type={inputType}
                  className="peer block min-h-[auto] w-full rounded  bg-white px-3 py-[0.32rem] leading-[2.15] outline-none"
                  value={credentials?.password || ""}
                  name="password"
                  id="password"
                  placeholder="Create a Password"
                  onChange={onChange}
                  minLength={5}
                />
              </div>

              <div className="flex mb-4">
                <input type="checkbox" id="checkbox" onChange={changeInputType} />
                <p className="ml-4">Show Password</p>
              </div>

              <div className="text-center lg:text-left">
                <button
                  className="inline-block rounded shadow-md bg-slate-900 hover:bg-[#2ff9c6] active:animate-ping hover:text-black px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white  focus:outline-none"
                  type="submit"
                >
                  Sign Up
                </button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Already have an account ?
                  <Link href="/login">
                    <span className=" text-green-500 hover:text-green-600 active:text-white "> Please login
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
