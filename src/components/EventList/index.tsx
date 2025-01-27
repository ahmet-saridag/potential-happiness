"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface EventListComponentProps {
  isFree: boolean;
  isOnline: boolean;
  searchValue: string;
}

const EventListComponent = ({
  isFree,
  isOnline,
  searchValue,
}: EventListComponentProps) => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const eventsPerPage = 6;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isPastEvent = (endDate: string) => new Date(endDate) < new Date();

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

    getEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Filtreleme işlemleri
    if (isFree) {
      filtered = filtered.filter((event) => event.eventType === "free");
    }

    if (isOnline) {
      filtered = filtered.filter((event) => event.isOnline);
    }

    if (searchValue && searchValue.length > 2) {
      filtered = filtered.filter((event) => {
        const title = event.title?.toLowerCase() || ""; // Eğer title yoksa boş bir string kullan
        const description = event.shortDescription?.toLowerCase() || ""; // Eğer description yoksa boş bir string kullan
        return (
          title.includes(searchValue.toLowerCase()) ||
          description.includes(searchValue.toLowerCase())
        );
      });
    }

    setFilteredEvents(filtered);
  }, [isFree, isOnline, searchValue, events]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="px-7.5 py-6 bg-white border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm">
      <div className="grid md:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(eventsPerPage)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col border border-gray-200 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800"
              >
                <div className="w-full h-[250px] bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
                <div className="p-5">
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-3"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-3"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                </div>
              </div>
            ))
          : currentEvents.map((event) => {
              const pastEvent = isPastEvent(event.endDate);
              return (
                <div
                  key={event.id}
                  className={`flex flex-col border border-gray-200 rounded-lg shadow-sm ${
                    pastEvent
                      ? "bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <Image
                    className="rounded-t-lg"
                    src="https://flowbite.com/docs/images/blog/image-1.jpg"
                    alt={event.title}
                    width={400}
                    height={250}
                    objectFit="cover"
                  />
                  <div className="flex flex-col flex-grow p-5">
                    <h5 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <div className="flex gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        {formatDate(event.startDate)}
                      </span>
                      <span className="bg-purple-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        {event.eventType === "paid" ? "Paid" : "Free"}
                      </span>
                      <span className="bg-yellow-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        {event.isOnline ? "Online" : ""}
                        {event.isPhysical ? "Physical" : ""}
                      </span>
                      {event.participantCount &&
                        event.participantCount !== 0 && (
                          <span className="bg-yellow-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-md dark:bg-blue-900 dark:text-blue-300">
                            {event.participantCount &&
                            event.participantCount !== 0
                              ? "👥 " + event.participantCount + " people"
                              : ""}
                          </span>
                        )}
                    </div>
                    <p className="flex-grow text-gray-700 dark:text-gray-400">
                      {event.shortDescription}
                    </p>
                    {!pastEvent ? (
                      <Link
                        href={`/events/${event.id}`}
                        className="mt-4 text-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        View event detail →
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="mt-4 text-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg cursor-not-allowed"
                      >
                        Past Event
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 text-sm font-medium rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EventListComponent;
