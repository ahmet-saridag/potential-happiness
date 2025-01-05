import React from "react";
import { FaHackerNews, FaProductHunt } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaReddit } from "react-icons/fa";

export default function Publish() {
  // create links array contains featured icons
  const publishList = [
    {
      path: "https://news.ycombinator.com/item?id=37333976",
      className:
        "flex justify-center items-center gap-2 hover:text-hacker-news",
      name: "Hacker News",
      title: "Featured on Hackers New",
      logo: <FaHackerNews className="text-xl" />,
    },
    {
      path: "https://news.ycombinator.com/item?id=37333976",
      className:
        "flex justify-center items-center gap-2 hover:text-product-hunt",
      name: "Product Hunt",
      title: "Featured on Product Hunt",
      logo: <FaProductHunt className="text-xl" />,
    },
    {
      path: "https://news.ycombinator.com/item?id=37333976",
      className: "",
      name: "",
      title: "Featured on X",
      logo: <RiTwitterXLine className="text-xl hover:text-x-logo" />,
    },
    {
      path: "https://news.ycombinator.com/item?id=37333976",
      className:
        "flex justify-center items-center gap-2 hover:text-reddit-color",
      name: "Reddit",
      title: "Featured on Reddit",
      logo: <FaReddit className="text-xl" />,
    },
  ];

  return (
    <section className="p-8 md:p-12 flex flex-wrap items-center justify-center gap-4 md:gap-8">
      <span className="text-xs text-[10px] opacity-50">Featured on</span>
      {publishList.map((item, idx) => (
        <a
          key={idx}
          href={item.path}
          title={item.name}
          className={item.className}
        >
          {item.logo}
          {item.name}
        </a>
      ))}
    </section>
  );
}
