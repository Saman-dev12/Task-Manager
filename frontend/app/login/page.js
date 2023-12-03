"use client";
import { userAtom } from "@/atoms/userAtom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const setUser = useSetRecoilState(userAtom);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const router = useRouter();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const login = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const res = await login.json();

      if (!res.msg) {
        localStorage.setItem("token", JSON.stringify(res));
        setUser(res);
        router.push(`/dashboard`);
        toast.success("Login Successful");
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className=" shadow-md rounded px-10 py-8 w-96 bg-[#ECFEFD]"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <h1 className="text-center pt-5">
          Don't have an account?{" "}
          <Link className="underline text-blue-500 p-1 " href="/signup">
            Sign up
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Login;
