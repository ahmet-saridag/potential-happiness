"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Image component'ini import ediyoruz
import {
  FaCar,
  FaLaptop,
  FaGraduationCap,
  FaRegMoneyBillAlt,
  FaLeaf,
  FaHeartbeat,
  FaUsers,
  FaMicrochip,
  FaChalkboardTeacher,
} from "react-icons/fa"; // Iconlar için react-icons
import { useUser } from "@clerk/nextjs";

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

export default function SummitDetail() {
  const [summit, setSummit] = useState<Summit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisteringLoading, setIsRegisteringLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { user } = useUser();

  const pathname = usePathname();
  const detailId = pathname?.split("/")[2];

  useEffect(() => {
    if (!detailId) return;

    const getSummitDetail = async () => {
      try {
        const response = await axios.get(`/api/getSummitDetail?id=${detailId}`);

        // Summit verisini aldıktan sonra, anahtar adlarını düzeltme işlemi
        const correctedSummit = { ...response.data };

        // Tüm checkbox'ların anahtar adlarını düzelt
        correctedSummit.automotiveCheckbox =
          response.data["automotive-checkbox"];
        correctedSummit.eCommerceCheckbox = response.data["e-commerce-checkbox"];
        correctedSummit.educationCheckbox = response.data["education-checkbox"];
        correctedSummit.fintechCheckbox = response.data["fintech-checkbox"];
        correctedSummit.greenEnergyCheckbox =
          response.data["green-energy-checkbox"];
        correctedSummit.healthTechCheckbox =
          response.data["health-tech-checkbox"];
        correctedSummit.hrCheckbox = response.data["hr-checkbox"];
        correctedSummit.networkingCheckbox =
          response.data["networking-checkbox"];
        correctedSummit.technologyCheckbox =
          response.data["technology-checkbox"];
        correctedSummit.workshopCheckbox = response.data["workshop-checkbox"];

        // Gereksiz eski anahtarları kaldır
        delete correctedSummit["automotive-checkbox"];
        delete correctedSummit["e-commerce-checkbox"];
        delete correctedSummit["education-checkbox"];
        delete correctedSummit["fintech-checkbox"];
        delete correctedSummit["green-energy-checkbox"];
        delete correctedSummit["health-tech-checkbox"];
        delete correctedSummit["hr-checkbox"];
        delete correctedSummit["networking-checkbox"];
        delete correctedSummit["technology-checkbox"];
        delete correctedSummit["workshop-checkbox"];

        // Yeni veriyi state'e set et
        setSummit(correctedSummit);

        if (
          correctedSummit.participantMemberIds &&
          correctedSummit.participantMemberIds.length > 0 &&
          user && user.id 
        ) {
          if (
            correctedSummit.participantMemberIds.some((id: string) => id === user?.id)
          ) {
            setIsCreated(true);
          }
        }
      } catch (error) {
        console.error("Error fetching summit detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSummitDetail();
  }, [detailId]);

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="animate-pulse flex flex-col items-center justify-center py-10">
          <div className="w-72 h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
          <div className="w-40 h-6 mt-4 bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-56 h-4 mt-2 bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </DefaultLayout>
    );
  }

  if (!summit) {
    return (
      <DefaultLayout>
        <div className="text-center py-10 text-lg text-red-500">
          Summit not found
        </div>
      </DefaultLayout>
    );
  }

  const handleRegister = async () => {
    if(!user) return
    setIsRegisteringLoading(true);

    const newSummit = {
      ...summit,
      participantMemberIds: summit.participantMemberIds
        ? [...summit.participantMemberIds, user.id]
        : [user.id],
      participantCount:
        (summit.participantCount ? summit.participantCount : 0) + 1,
    };

    setSummit(newSummit);

    try {
      const response = await axios.put(`/api/updateSummit?id=${detailId}`, {
        data: newSummit,
      });
      if (response) {
        setIsRegisteringLoading(false);
        setIsCreated(true);
      }
    } catch (error) {
      console.error("Error adding summit:", error);
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isPastSummit = (endDate: string) => new Date(endDate) < new Date();
  const pastSummit = isPastSummit(summit.endDate);

  return (
    <DefaultLayout>
      {/* Full-width banner */}
      <div className="relative w-full h-64">
        <Image
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt="Summit Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="py-10 px-6">
        <div className="mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {summit.title}
          </h1>
          <div className="mt-6">
            <div className="flex md:flex-row flex-col gap-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                {formatDate(summit.startDate)} - {formatDate(summit.endDate)}
              </span>
              <span className="bg-purple-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                {summit.summitType === "paid" ? "💰 Paid" : "🎉 Free"}
              </span>
              <span className="bg-yellow-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                {summit.isOnline ? "🌐 Online" : "🏢 Physical"}
              </span>
              {summit.participantCount && summit.participantCount !== 0 && (
                <span className="bg-yellow-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                  {summit.participantCount && summit.participantCount !== 0
                    ? "👥 " +
                      summit.participantCount +
                      " awesome people are in! Let the fun begin! 🚀🥳"
                    : ""}
                </span>
              )}
            </div>

            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
              {summit.shortDescription}
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
              {summit.longDescription}
            </p>

            {/* Additional fields */}
            <div className="mt-6 flex flex-col gap-4">
              <p>
                <strong>🏠 Capacity:</strong> {summit.capacity}
              </p>
              <p>
                <strong>📧 Organizer Email:</strong> {summit.organizerEmail}
              </p>
              {summit.isOnline && (
                <p>
                  <strong>🔗 Online Link:</strong> {summit.onlineLink}
                </p>
              )}
              {summit.isPhysical && (
                <div className="flex flex-col gap-3">
                  <p>
                    <strong>🏠 Country:</strong> {summit.country}
                  </p>
                  <p>
                    <strong>🏠 City:</strong> {summit.city}
                  </p>
                  <p>
                    <strong>🏠 Location name:</strong> {summit.locationName}
                  </p>
                  <p>
                    <strong>🏠 Location adress:</strong> {summit.locationAddress}
                  </p>
                </div>
              )}
              <p>
                <strong>🕒 Start Time:</strong> {summit.startTime}
              </p>
              <p>
                <strong>🕔 End Time:</strong> {summit.endTime}
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Summit Categories:
              </h3>
              <ul className="grid md:grid-cols-4 gap-6 mt-5">
                {summit.automotiveCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaCar className="text-blue-500" /> <span>Automotive</span>
                  </li>
                )}
                {summit.eCommerceCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaLaptop className="text-blue-500" />{" "}
                    <span>E-Commerce</span>
                  </li>
                )}
                {summit.educationCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaGraduationCap className="text-blue-500" />{" "}
                    <span>Education</span>
                  </li>
                )}
                {summit.fintechCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaRegMoneyBillAlt className="text-blue-500" />{" "}
                    <span>Fintech</span>
                  </li>
                )}
                {summit.greenEnergyCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaLeaf className="text-blue-500" />{" "}
                    <span>Green Energy</span>
                  </li>
                )}
                {summit.healthTechCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaHeartbeat className="text-blue-500" />{" "}
                    <span>Health Tech</span>
                  </li>
                )}
                {summit.hrCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaUsers className="text-blue-500" /> <span>HR</span>
                  </li>
                )}
                {summit.networkingCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaUsers className="text-blue-500" />{" "}
                    <span>Networking</span>
                  </li>
                )}
                {summit.technologyCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaMicrochip className="text-blue-500" />{" "}
                    <span>Technology</span>
                  </li>
                )}
                {summit.workshopCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaChalkboardTeacher className="text-blue-500" />{" "}
                    <span>Workshop</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-6">
              {pastSummit ? (
                <button className="px-6 py-3 text-lg font-medium text-white bg-gray-500 rounded-lg cursor-not-allowed">
                  Past Summit 🕒
                </button>
              ) : (
                <button
                  disabled={isCreated || isRegisteringLoading}
                  onClick={handleRegister}
                  className={
                    isCreated
                      ? "px-6 py-3 text-lg font-medium text-white bg-orange-400 rounded-lg hover:bg-orange-800"
                      : "px-6 py-3 text-lg font-medium text-white bg-yellow-700 rounded-lg hover:bg-yellow-800"
                  }
                >
                  {isRegisteringLoading
                    ? "Loading..."
                    : isCreated
                      ? "You're going 🎉"
                      : "Register 📝"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
