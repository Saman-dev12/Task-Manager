"use client";
import { userAtom } from "@/atoms/userAtom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const setUser = useSetRecoilState(userAtom);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate username
    if (!signupData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupData.email.trim() || !emailRegex.test(signupData.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    // Validate password
    if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const router = useRouter();
  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      if (validateForm()) {
        const signup = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });

        const res = await signup.json();

        if (!res.msg) {
          localStorage.setItem("token", JSON.stringify(res));
          setUser(res);
          router.push(`/dashboard`);
          toast.success("Sign up successful");
        } else {
          toast.error(res.msg);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-[#ECFEFD] shadow-md rounded px-10 py-4 w-96 "
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.username ? "border-red-500" : ""
            }`}
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={signupData.username}
            onChange={handleInputChange}
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic">{errors.username}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={signupData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={signupData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <h1 className="text-center pt-5 ">
          Already have an account?{" "}
          <Link className="underline text-blue-500 p-1 " href="/login">
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Signup;
