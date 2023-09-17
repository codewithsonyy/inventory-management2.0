"use client";
import React, { useMemo } from "react";

import ButtonPrimary from "./ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import Link from "next/link";

const Hero = ({
  listUser = [
    {
      name: "Users",
      number: "390",
      icon: "/assets/Icon/heroicons_sm-user.svg",
    },
    {
      name: "Locations",
      number: "20",
      icon: "/assets/Icon/gridicons_location.svg",
    },
    {
      name: "Server",
      number: "50",
      icon: "/assets/Icon/bx_bxs-server.svg",
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="w-full  overflow-hidden bg-cover bg-no-repeat bg-[url('/inventorym.png')]  h-screen">
      <div
        className="max-w-screen-xl  mt-14  px-8 xl:px-16 mx-auto "
        id="about"
      >
        <ScrollAnimationWrapper>
          <motion.div
            className="grid grid-flow-row sm:grid-flow-col grid-rows-1  sm:grid-cols-1 gap-8 py-6 sm:py-16"
            variants={scrollAnimation}
          >
            <div className=" flex flex-col justify-center p-8 rounded-lg pb-12  bg-transparent shadow-md backdrop-blur-md items-start row-start-2 sm:row-start-1">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                Lets make inventory management easy with{" "}
                <strong>Stockify</strong>
              </h1>
              <p className="text-black-500 mt-4 mb-10">
                A cloud-based inventory management tool to easily manage, track
                and search products at one place
              </p>
              <ButtonPrimary>
                <Link href="/signup">Get Started</Link>
              </ButtonPrimary>
            </div>
            {/* {listUser.map((listUsers, index) => (
              <motion.div
                className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                key={index}
                custom={{ duration: 2 + index }}
                variants={scrollAnimation}
              >
                <div className="flex mx-auto w-40 sm:w-auto">
                  <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                    <img src={listUsers.icon} className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl text-black-600 font-bold">
                      {listUsers.number}+
                    </p>
                    <p className="text-lg text-black-500">{listUsers.name}</p>
                  </div>
                </div>
              </motion.div>
            ))} */}
            {/* <div className="flex w-full">
              <motion.div className="h-full  w-full" variants={scrollAnimation}>
                <img src="/st-bg.png" />
              </motion.div>
            </div> */}
          </motion.div>
        </ScrollAnimationWrapper>
        <div className="relative w-full flex">
          <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-5 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10"></ScrollAnimationWrapper>
          <div
            className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
            style={{ filter: "blur(114px)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
