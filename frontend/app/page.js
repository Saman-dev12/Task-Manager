"use client";
import { userAtom } from "@/atoms/userAtom";
import Card from "@/components/Card";
import {
  ArrowBigLeft,
  BadgeIndianRupee,
  BookCheck,
  ScrollText,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";

const Page = () => {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <main className="first flex flex-col gap-20 h-auto">
        <div className="container flex flex-col lg:flex-row h-auto overflow-hidden mt-10">
          {/* Left Section */}
          <div className="left text-black text-4xl lg:text-5xl lg:w-1/2 relative lg:top-8 lg:left-20">
            <h1 className="flex flex-col text-5xl lg:text-7xl ">
              Manage
              <span>
                {" "}
                your <span className="font-semibold">tasks</span>
              </span>{" "}
              <span className="flex gap-1">
                quickly
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle-2 pt-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
            </h1>
            <p className="text-sm lg:text-base flex flex-wrap mt-6 lg:mr-10 text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsa
              quis enim maxime ullam tempora deserunt?
            </p>
            <div className="learn">
              <Link
                href="/about"
                className="bg-blue-600 text-base lg:text-lg p-3 rounded-xl text-white hover:bg-blue-700"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="right w-full lg:w-1/2 flex justify-center items-center pt-10">
            <img
              className="rounded-xl w-full lg:max-w-lg"
              src="/mainpageimg.webp"
              alt=""
            />
          </div>
        </div>
        <div className="second bg-[#ECFEFD] h-auto lg:h-screen flex flex-col gap-10 lg:pt-10 ">
          <div className="heading">
            <div className="feature">
              <p className="text-blue-500 text-center text-lg lg:text-xl">
                Feature
              </p>
            </div>
            <h1 className="text-2xl lg:text-4xl text-center font-semibold">
              Our Special Feature
            </h1>
          </div>
          <div className="cards flex flex-col lg:flex-row justify-center lg:justify-evenly items-center gap-5 lg:gap-10">
            <Card
              icon={<Users size={32} />}
              heading={"User Friendly"}
              content={
                "Easy to use for people who are either new or professional."
              }
            />
            <Card
              icon={<BookCheck size={32} />}
              heading={"Trusted App"}
              content={"Official app which can be trusted for security."}
            />
            <Card
              icon={<ScrollText size={32} />}
              heading={"Flexibility"}
              content={"Can be used on any kind of devices"}
            />
            <Card
              icon={<BadgeIndianRupee size={32} />}
              heading={"100% Free"}
              content={"The application is totally free, without any charges"}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
