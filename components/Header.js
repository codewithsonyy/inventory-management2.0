"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    setName("");
    router.replace("/");
  };

  useEffect(() => {
    // Fetch products on load

    const fetchUser = async () => {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      let rjson = await response.json();
      if (rjson.success) {
        setName(rjson.user.name);
        setToken(rjson.token);
      } else {
        setName("");
      }
    };
    fetchUser();
  }, []);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-extrabold items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">Username- {name || ""}</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              Logout
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold">
              <Link href="/signup" role="button">
                Signup
              </Link>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
