import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children }) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((x) => io.observe(x));
    return () => io.disconnect();
  }, [children]);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
