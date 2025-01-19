"use client";

import { SignIn, ClerkLoading } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignInPage() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const emailInput: HTMLInputElement | null = document.querySelector(
        ".cl-formFieldInput__identifier"
      );
      if (emailInput) {
        emailInput.placeholder = "name@company.com";
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
        <SignIn
          signUpUrl="/sign-up"
          path="/sign-in"
          forceRedirectUrl="/dashboard"
        />
      </section>
    </>
  );
}
