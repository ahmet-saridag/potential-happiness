"use client";

import { SignUp, ClerkLoading } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignUpPage() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const emailInput: HTMLInputElement | null = document.querySelector(
        ".cl-formFieldInput__emailAddress"
      );
      const passwordInput: HTMLInputElement | null = document.querySelector(
        ".cl-formFieldInput__password"
      );

      if (emailInput) {
        emailInput.placeholder = "name@company.com";
      }
      if (passwordInput) {
        passwordInput.placeholder = "Must have at least 6 characters";
      }
    }, 100);

    // Temizlik işlemi
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="p-8 md:p-12 flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <ClerkLoading>
          <span className="loading loading-infinity loading-lg h-[35rem]"></span>
        </ClerkLoading>
        <SignUp path="/sign-up" forceRedirectUrl="/dashboard" />
      </section>
    </>
  );
}
