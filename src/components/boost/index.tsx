import React from "react";
import { BsFillRocketFill } from "react-icons/bs";

export default function Boost() {
  return (
    <section>
      <div className="pb-32 pt-16 px-8 max-w-3xl mx-auto flex flex-col items-center gap-8 md:gap-12">
        <div>
          <div className="relative">
            <div className="absolute -right-4 -top-4">
              <BsFillRocketFill className="animate-bounce  text-4xl text-primary" />
            </div>
          </div>
          <h2 className="fire-animation relative font-bold text-3xl md:text-5xl tracking-tight mt-4 mb-4 md:mb-8 ">
            Boost your app, launch, earn
          </h2>
          <p className="relative text-lg text-base-content/80">
            Don't waste time on Stripe subscriptions or designing a pricing
            section...
          </p>
          <div className="w-full flex justify-center items-center">
            <button className="btn btn-primary group btn-wide text-md mt-5">
              <span>
                <BsFillRocketFill className="text-2xl" />
              </span>
              <span className="tracking-tighter">Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
