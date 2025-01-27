"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // axios importu eklenmeli
import UserCard from "../UserCard/UserCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { MdEvent } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

const DashboardComponent: React.FC = () => {
  const [summits, setSummits] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("/api/getEvents");
        if (response.data) {
          const formattedEvents: any = Object.entries(response.data).map(
            ([id, event]: any) => ({
              id,
              ...event,
            })
          );
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getSummits = async () => {
      try {
        const response = await axios.get("/api/getSummits");
        if (response.data) {
          const formattedSummits: any = Object.entries(response.data).map(
            ([id, summit]: any) => ({
              id,
              ...summit,
            })
          );
          setSummits(formattedSummits);
        }
      } catch (error) {
        console.error("Error fetching summits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSummits();
    getEvents();
  }, []);

  // Filtreleme işlemi: Son etkinlikleri ve zirveleri 'createdAt' tarihine göre sıralıyoruz
  // Combine both summits and events, then sort by 'createdAt' and take the latest 5
  const combinedTotal = [...summits, ...events]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Summit Card */}
        <CardDataStats title="Total Summit 👥" total={isLoading ? "Loading..." : `${summits.length} summits`} rate={`${summits.length === 0 ? "0%" : "0.43%"}`} levelUp>
          {isLoading ? (
            <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
          ) : (
            <svg
              className="fill-current text-blue-500"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_130_9756)">
                <path
                  d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_130_9756">
                  <rect width="18" height="18" fill="white" transform="translate(0 0.052124)" />
                </clipPath>
              </defs>
            </svg>
          )}
        </CardDataStats>

        {/* Event Card */}
        <CardDataStats title="Total Event 🎉" total={isLoading ? "Loading..." : `${events.length} events`} rate={`${events.length === 0 ? "0%" : "4.35%"}`} levelUp>
          {isLoading ? (
            <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
          ) : (
            <MdEvent className="text-2xl text-blue-500" />
          )}
        </CardDataStats>
      </div>

      {/* Table & Chat Section */}
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-1 xl:col-span-8">
          <TableOne combinedTotal={combinedTotal} />
        </div>
        <div className="col-span-1 xl:col-span-4">
          <UserCard events={events} summits={summits} />
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
