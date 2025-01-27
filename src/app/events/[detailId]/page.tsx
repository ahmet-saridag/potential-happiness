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

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  eventType: string;
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

export default function EventDetail() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisteringLoading, setIsRegisteringLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { user } = useUser();

  const pathname = usePathname();
  const detailId = pathname?.split("/")[2];

  useEffect(() => {
    if (!detailId) return;

    const getEventDetail = async () => {
      try {
        const response = await axios.get(`/api/getEventDetail?id=${detailId}`);

        // Event verisini aldıktan sonra, anahtar adlarını düzeltme işlemi
        const correctedEvent = { ...response.data };

        // Tüm checkbox'ların anahtar adlarını düzelt
        correctedEvent.automotiveCheckbox =
          response.data["automotive-checkbox"];
        correctedEvent.eCommerceCheckbox = response.data["e-commerce-checkbox"];
        correctedEvent.educationCheckbox = response.data["education-checkbox"];
        correctedEvent.fintechCheckbox = response.data["fintech-checkbox"];
        correctedEvent.greenEnergyCheckbox =
          response.data["green-energy-checkbox"];
        correctedEvent.healthTechCheckbox =
          response.data["health-tech-checkbox"];
        correctedEvent.hrCheckbox = response.data["hr-checkbox"];
        correctedEvent.networkingCheckbox =
          response.data["networking-checkbox"];
        correctedEvent.technologyCheckbox =
          response.data["technology-checkbox"];
        correctedEvent.workshopCheckbox = response.data["workshop-checkbox"];

        // Gereksiz eski anahtarları kaldır
        delete correctedEvent["automotive-checkbox"];
        delete correctedEvent["e-commerce-checkbox"];
        delete correctedEvent["education-checkbox"];
        delete correctedEvent["fintech-checkbox"];
        delete correctedEvent["green-energy-checkbox"];
        delete correctedEvent["health-tech-checkbox"];
        delete correctedEvent["hr-checkbox"];
        delete correctedEvent["networking-checkbox"];
        delete correctedEvent["technology-checkbox"];
        delete correctedEvent["workshop-checkbox"];

        // Yeni veriyi state'e set et
        setEvent(correctedEvent);

        if (
          correctedEvent.participantMemberIds &&
          correctedEvent.participantMemberIds.length > 0 &&
          user && user.id 
        ) {
          if (
            correctedEvent.participantMemberIds.some((id: string) => id === user?.id)
          ) {
            setIsCreated(true);
          }
        }
      } catch (error) {
        console.error("Error fetching event detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getEventDetail();
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

  if (!event) {
    return (
      <DefaultLayout>
        <div className="text-center py-10 text-lg text-red-500">
          Event not found
        </div>
      </DefaultLayout>
    );
  }

  const handleRegister = async () => {
    if(!user) return
    setIsRegisteringLoading(true);

    const newEvent = {
      ...event,
      participantMemberIds: event.participantMemberIds
        ? [...event.participantMemberIds, user.id]
        : [user.id],
      participantCount:
        (event.participantCount ? event.participantCount : 0) + 1,
    };

    setEvent(newEvent);

    try {
      const response = await axios.put(`/api/updateEvent?id=${detailId}`, {
        data: newEvent,
      });
      if (response) {
        setIsRegisteringLoading(false);
        setIsCreated(true);
      }
    } catch (error) {
      console.error("Error adding event:", error);
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isPastEvent = (endDate: string) => new Date(endDate) < new Date();
  const pastEvent = isPastEvent(event.endDate);

  return (
    <DefaultLayout>
      {/* Full-width banner */}
      <div className="relative w-full h-64">
        <Image
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt="Event Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="py-10 px-6">
        <div className="mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {event.title}
          </h1>
          <div className="mt-6">
            <div className="flex gap-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                {formatDate(event.startDate)} - {formatDate(event.endDate)}
              </span>
              <span className="bg-purple-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                {event.eventType === "paid" ? "💰 Paid" : "🎉 Free"}
              </span>
              <span className="bg-yellow-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                {event.isOnline ? "🌐 Online" : "🏢 Physical"}
              </span>
              {event.participantCount && event.participantCount !== 0 && (
                <span className="bg-yellow-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                  {event.participantCount && event.participantCount !== 0
                    ? "👥 " +
                      event.participantCount +
                      " awesome people are in! Let the fun begin! 🚀🥳"
                    : ""}
                </span>
              )}
            </div>

            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
              {event.shortDescription}
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
              {event.longDescription}
            </p>

            {/* Additional fields */}
            <div className="mt-6 flex flex-col gap-4">
              <p>
                <strong>🏠 Capacity:</strong> {event.capacity}
              </p>
              <p>
                <strong>📧 Organizer Email:</strong> {event.organizerEmail}
              </p>
              {event.isOnline && (
                <p>
                  <strong>🔗 Online Link:</strong> {event.onlineLink}
                </p>
              )}
              {event.isPhysical && (
                <div className="flex flex-col gap-3">
                  <p>
                    <strong>🏠 Country:</strong> {event.country}
                  </p>
                  <p>
                    <strong>🏠 City:</strong> {event.city}
                  </p>
                  <p>
                    <strong>🏠 Location name:</strong> {event.locationName}
                  </p>
                  <p>
                    <strong>🏠 Location adress:</strong> {event.locationAddress}
                  </p>
                </div>
              )}
              <p>
                <strong>🕒 Start Time:</strong> {event.startTime}
              </p>
              <p>
                <strong>🕔 End Time:</strong> {event.endTime}
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Event Categories:
              </h3>
              <ul className="grid md:grid-cols-4 gap-6 mt-5">
                {event.automotiveCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaCar className="text-blue-500" /> <span>Automotive</span>
                  </li>
                )}
                {event.eCommerceCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaLaptop className="text-blue-500" />{" "}
                    <span>E-Commerce</span>
                  </li>
                )}
                {event.educationCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaGraduationCap className="text-blue-500" />{" "}
                    <span>Education</span>
                  </li>
                )}
                {event.fintechCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaRegMoneyBillAlt className="text-blue-500" />{" "}
                    <span>Fintech</span>
                  </li>
                )}
                {event.greenEnergyCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaLeaf className="text-blue-500" />{" "}
                    <span>Green Energy</span>
                  </li>
                )}
                {event.healthTechCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaHeartbeat className="text-blue-500" />{" "}
                    <span>Health Tech</span>
                  </li>
                )}
                {event.hrCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaUsers className="text-blue-500" /> <span>HR</span>
                  </li>
                )}
                {event.networkingCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaUsers className="text-blue-500" />{" "}
                    <span>Networking</span>
                  </li>
                )}
                {event.technologyCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaMicrochip className="text-blue-500" />{" "}
                    <span>Technology</span>
                  </li>
                )}
                {event.workshopCheckbox && (
                  <li className="flex items-center justify-start space-x-3">
                    <FaChalkboardTeacher className="text-blue-500" />{" "}
                    <span>Workshop</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-6">
              {pastEvent ? (
                <button className="px-6 py-3 text-lg font-medium text-white bg-gray-500 rounded-lg cursor-not-allowed">
                  Past Event 🕒
                </button>
              ) : (
                <button
                  disabled={isCreated || isRegisteringLoading}
                  onClick={handleRegister}
                  className={
                    isCreated
                      ? "px-6 py-3 text-lg font-medium text-white bg-purple-400 rounded-lg hover:bg-purple-800"
                      : "px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
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
