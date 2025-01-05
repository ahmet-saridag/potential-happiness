import React from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import User from "@/components/user";

export default function Header() {
  // create a navbarlist
  const navbarList = [
    {
      path: "/",
      text: "Pricing",
    },
    {
      path: "/",
      text: "Demo",
    },
    {
      path: "/",
      text: "Wall of love",
    },
    {
      path: "/",
      text: "Leaderboard",
    },
  ];

  return (
    <section className="container">
      <div className="flex justify-between items-center p-5">
        <a
          href="/"
          className="w-28 md:w-32 flex gap-1 justify-center items-center cursor-pointer"
        >
          <BsFillRocketTakeoffFill className="text-3xl text-primary" />
          <h2 className="text-2xl font-semibold">JetStart</h2>
        </a>
        <div>
          <ul className="flex gap-10">
            {navbarList.map((item, idx) => (
              <li className={idx > 0 ? "sm:block hidden" : ""} key={idx}>
                <a
                  href={item.path}
                  className="hover:border-b-2 border-primary leading-6"
                >
                  {item.text}
                </a>
              </li>
            ))}
               <User />
          </ul>
        </div>
      </div>
    </section>
  );
}
