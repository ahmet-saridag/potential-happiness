"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdEvent } from "react-icons/md"; // MdEvent ikonu import et
import Link from "next/link";

interface Summit {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  summitType: string;
  shortDescription: string;
  longDescription: string;
  capacity: string;
  organizerEmail: string;
  onlineLink: string;
  automotiveCheckbox: boolean;
  eCommerceCheckbox: boolean;
  educationCheckbox: boolean;
  fintechCheckbox: boolean;
  greenEnergyCheckbox: boolean;
  healthTechCheckbox: boolean;
  hrCheckbox: boolean;
  networkingCheckbox: boolean;
  technologyCheckbox: boolean;
  workshopCheckbox: boolean;
  isPhysical: boolean;
  isOnline: boolean;
  startTime: string;
  endTime: string;
  country: string;
  city: string;
  locationName: string;
  locationAddress: string;
  participantCount: number;
  participantMemberIds: string[];
}
interface TableOneProps {
  combinedTotal: Summit[]; // combinedTotal props olarak alıyoruz
}

const TableOne: React.FC<TableOneProps> = ({ combinedTotal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Yükleniyor durumu
  const [data, setData] = useState<Summit[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData(combinedTotal); // Gerçek veri geldiğinde bu kısmı kullanarak veriyi ayarlayabilirsin
      setIsLoading(false); // Yükleniyor durumu sona erer
    }, 2000); // Bu süreyi veri yüklenme süresine göre ayarlayabilirsin
  }, [combinedTotal]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white sm:text-lg md:text-xl">
        🌟 Top Summits & Events 🌍
      </h4>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-xs sm:text-sm font-medium uppercase xsm:text-base">
                Title
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-xs sm:text-sm font-medium uppercase xsm:text-base">
                Start Date
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-xs sm:text-sm font-medium uppercase xsm:text-base">
                End Date
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-xs sm:text-sm font-medium uppercase xsm:text-base">
                Participants
              </h5>
            </div>
          </div>
        </div>

        {isLoading ? (
          // Skeleton Loader: Yükleniyor durumunda olan placeholder yapıları
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="grid grid-cols-4 sm:grid-cols-4 gap-4 animate-pulse">
                <div className="p-2.5 xl:p-5 bg-gray-300 rounded-md h-6"></div>
                <div className="p-2.5 text-center xl:p-5 bg-gray-300 rounded-md h-6"></div>
                <div className="p-2.5 text-center xl:p-5 bg-gray-300 rounded-md h-6"></div>
                <div className="p-2.5 text-center xl:p-5 bg-gray-300 rounded-md h-6"></div>
              </div>
            ))}
          </div>
        ) : (
          // Gerçek veri geldiğinde
          <div className="overflow-x-auto">
            {data.map((item, key) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-4 ${
                  key === data.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    {/* Summit için SVG ikonu */}
                    {item.summitType ? (
                      <svg
                        className="fill-current text-blue-500"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_130_9756)">
                          <path
                            d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_130_9756">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(0 0.052124)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : (
                      // Event için MdEvent ikonu
                      <MdEvent className="text-xl text-blue-500" />
                    )}
                  </div>
                  <p className="text-black dark:text-white text-xs sm:text-sm md:text-base">{item.title}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-xs sm:text-sm md:text-base text-black dark:text-white">
                    {new Date(item.startDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-xs sm:text-sm md:text-base text-meta-3">
                    {new Date(item.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-xs sm:text-sm md:text-base text-black dark:text-white">{item.participantCount}</p>
                </div>
              </div>
            ))}


{data.length === 0 && (
  <div className="w-full p-10 flex flex-col justify-center gap-3 items-center text-gray-500 dark:text-gray-400">
              <Link href="/dashboard">
            <Image
              width={176}
              height={32}
              src={"/images/logo/amblem.svg"}
              alt="Logo"
              priority
            />
          </Link>
    <p className="mt-2 text-center">No summits found matching your criteria.</p>
    <Link href="/create-summit">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create Summit
          </button>
        </Link>
  </div>
)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOne;
