import React from "react";
import { LuRocket } from "react-icons/lu";
import { IoIosArrowRoundDown } from "react-icons/io";

export default function Timeline() {
  // create an array list of timelines
  const timelines = [
    {
      title: "First Macintosh computer",
      hours: "+4 hours",
    },
    {
      title: "Designing a landing page",
      hours: "+4 hours",
    },
    {
      title: "First Macintosh computer",
      hours: "+4 hours",
    },
    {
      title: "First Macintosh computer",
      hours: "+4 hours",
    },
    {
      title: "∞ overthinking...",
      hours: "+4 hours",
    },
  ];

  return (
    <section className="relative py-24 sm:px-8 px-3">
      <div className="relative bg-neutral text-neutral-content rounded-lg p-8 md:p-16 max-w-lg mx-auto text-center text-md">
        <ul className="timeline timeline-vertical">
          {timelines.map((item, idx) => {
            return (
              <li key={idx}>
                <hr />
                <div className="timeline-start mr-2">{item.hours}</div>
                <div className="timeline-middle text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box mt-4">
                  {item.title}
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
        <div className="text-left mt-5 text-2xl">+</div>
        <hr className="mb-5" />
        <div className="flex justify-center items-center gap-2">
          <LuRocket className="text-3xl text-primary" />
          <h6 className="fire-animation">22+ hours saved</h6>
        </div>
      </div>
      <div className="absolute bottom-8 inset-x-0 text-center flex gap-1 justify-center text-sm opacity-80 ">
        <IoIosArrowRoundDown className="animate-bounce text-2xl text-primary" />
        <p>There's an easier way</p>
      </div>
    </section>
  );
}
