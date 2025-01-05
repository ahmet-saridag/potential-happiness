import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CommonLayout({ children }: any) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
