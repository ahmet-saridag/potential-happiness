import React from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

export default function Footer() {
  return (
    <section className="container">
      <footer className="footer p-10  text-base-content ">
        <aside>
          <a
            href="/"
            className="w-28 md:w-32 flex gap-1 justify-center items-center cursor-pointer"
          >
            <BsFillRocketTakeoffFill className="text-3xl text-primary" />
            <h2 className="text-2xl font-semibold">JetStart</h2>
          </a>
          <p>
            Ship your startup in days, not weeks <br />
            Copyright © 2024 - All rights reserved
          </p>
          <button className="btn btn-outline btn-primary group btn-wide text-md mt-2 flex">
            <span>Built with</span>
            <BsFillRocketTakeoffFill className="text-2xl" />
            <span className="tracking-tighter">JetStart</span>
          </button>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </section>
  );
}
