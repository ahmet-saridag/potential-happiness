import React from "react";
import { IoGiftOutline } from "react-icons/io5";
import Image from "next/image";
import RightImg from "@/public/right-image.webp";
import { BsFillRocketFill } from "react-icons/bs";

export default function MainSection() {
  return (
    <section className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-5 lg:items-start px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-12 items-center justify-center text-center lg:text-left lg:items-start">
        <div>
          <a
            href="https://www.producthunt.com/products/transferchain/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-transferchain"
            target="_blank"
            className="flex lg:justify-start justify-center"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=526056&theme=light"
              alt="TransferChain - Blockchain&#0045;based&#0032;Secure&#0032;&#0038;&#0032;Private&#0032;file&#0032;sharing&#0032;for&#0032;everyone | Product Hunt"
              height="54"
            />
          </a>
          <h1 className="font-extrabold text-4xl lg:text-7xl tracking-tight md:-mb-4 mt-5 gap-3 items-center lg:items-start">
            Ship your startup in days,
            <span className="fire-animation ml-2">not weeks</span>
          </h1>
        </div>
        <p className="text-lg opacity-80 leading-relaxed">
          The NextJS boilerplate with all you need to build your SaaS, AI tool,
          or any other web app and make your first $ online fast.
        </p>
        <div>
          <button className="btn btn-primary group btn-wide text-md">
            <span>
              <BsFillRocketFill className="text-2xl" />
            </span>
            <span className="tracking-tighter">Get Started</span>
          </button>
          <p className="mt-2 text-sm flex justify-center items-center gap-1 md:text-sm">
            <span className="text-green-500 flex">
              <IoGiftOutline className="text-lg lg:mr-2 mr-1" />
              $100 off
            </span>
            <span> for the first 3350 customers (8 left)</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center align-center gap-3">
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-primary"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-primary"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-primary"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-primary"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-primary"
                // checked={true}
              />
            </div>
            <div className="text-base text-base-content/80">
              <span className="text-base-content">
                <span className="font-semibold">3353 </span>
                maker ship faster
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-md:-m-4 lg:w-full flex justify-end">
        <Image src={RightImg} height={500} alt="Picture of the author" />
      </div>
    </section>
  );
}
