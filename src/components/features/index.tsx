"use client";
import { useState } from "react";
import {
  MdAlternateEmail,
  MdPayment,
  MdOutlineScreenSearchDesktop,
} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { BsDatabaseAdd } from "react-icons/bs";
import { PiPaintBrushDuotone } from "react-icons/pi";
import { CgMoreO } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";

export default function Features() {
  const [tabIndex, setTabIndex] = useState(0);
  const featuresList: any = [
    {
      name: "Emails",
      // logo: <MdAlternateEmail className="text-3xl" />,
    },

    {
      name: "Payments",
      // logo: <MdPayment className="text-3xl" />,
    },
    {
      name: "Login",
      // logo: <FaRegUserCircle className="text-3xl" />,
    },
    {
      name: "Databases",
      // logo: <BsDatabaseAdd className="text-3xl" />,
    },
    {
      name: "SEO",
      // logo: <MdOutlineScreenSearchDesktop className="text-3xl" />,
    },
    {
      name: "Styles",
      // logo: <PiPaintBrushDuotone className="text-3xl" />,
    },
    {
      name: "More",
      // logo: <CgMoreO className="text-3xl" />,
    },
  ];

  const featuresDetailList = [
    {
      id: 0,
      title: "Emails",
      checkList: [
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
      ],
    },
    {
      id: 1,
      title: "Payments",
      checkList: [
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
      ],
    },
    {
      id: 2,
      title: "Login",
      checkList: [
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
        {
          name: "DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)",
        },
      ],
    },
  ];

  return (
    <section className="pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-100 max-md:px-8 max-w-3xl">
          <p className="text-accent font-medium text-sm font-mono mb-3">
            const launch_time = "05:48 PM";
          </p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-8">
            Supercharge your app instantly, launch faster, make $
          </h2>
          <div className="text-base-content/80 leading-relaxed mb-8 lg:text-lg">
            Login users, process payments and send emails at lightspeed. Spend
            your time building your startup, not integrating APIs. ShipFast
            provides you with the boilerplate code you need to launch, FAST.
          </div>
        </div>
        <div className="grid grid-cols-4 md:flex justify-start gap-4 md:gap-12 max-md:px-8 max-w-3xl mx-auto mb-8">
          {featuresList.map((item: any, idx: number) => {
            return (
              <span
                onClick={() => setTabIndex(idx)}
                key={idx}
                className={
                  idx === tabIndex
                    ? "text-primary flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-base-content/50"
                    : "flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-base-content/50"
                }
              >
                {/* <span>{item.logo}</span> */}
                <span className="font-medium text-sm">{item.name}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="bg-base-200">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
          <div className="text-base-content/80 leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-xl animate-opacity">
            {featuresDetailList.map((item, idx) => {
              if (item.id === Number(tabIndex)) {
                return (
                  <div key={idx}>
                    <p className="font-medium text-base-content text-lg mb-4">
                      {item.title}
                    </p>
                    <ul className="space-y-1 flex flex-col gap-2">
                      {item.checkList.map((check, idx) => {
                        return (
                          <li key={idx} className="flex items-center gap-2">
                            <FaCheck className="text-xl text-primary" />
                            {check.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
