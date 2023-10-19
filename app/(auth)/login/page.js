"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Alert from "@/components/Alert";

Alert;
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        header: "application/json",
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const res = await response.json();

      if (res.success) {
        localStorage.setItem("token", res.authtoken);

        showAlert("Logged In Successfully!", "success");
        setCredentials({ email: "", password: "" });
        router.replace(callbackUrl);
      } else {
        showAlert(res.error ? res.error : "Something went wrong!", "danger");
      }
    } catch (error) {
      console.log(error);
      showAlert(
        error instanceof Object && error.message
          ? error.message
          : "Something went wrong!",
        "danger"
      );
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <section className="h-screen">
      <Alert alert={alert} showAlert={showAlert} />
      <div className="h-full mt-8 p-8  rounded-md">
        <div className="g-6 flex h-full flex-wrap mx-auto items-center w-2/3  justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img src="/st-bg.png" className="w-full" alt="Sample image" />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={submitHandler}>
              <div className="relative mb-6">
                <label className="">Email address</label>
                <input
                  className="peer block min-h-[auto] w-full rounded  bg-white px-3 py-[0.32rem] leading-[2.15] outline-none"
                  type="email"
                  id="email"
                  name="email"
                  value={credentials?.email || ""}
                  onChange={onChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="relative mb-6">
                <label className="">Password</label>
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded  bg-white px-3 py-[0.32rem] leading-[2.15] outline-none"
                  value={credentials?.password || ""}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  className="inline-block rounded shadow-md bg-slate-900 hover:bg-[#2ff9c6] active:animate-ping hover:text-black px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white  focus:outline-none"
                  type="submit"
                >
                  Sign in
                </button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <span className=" text-green-400 active:text-white ">
                      Register Now
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

export default Login;
