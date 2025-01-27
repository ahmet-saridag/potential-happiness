"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface SummitListComponentProps {
  isFree: boolean;
  isOnline: boolean;
  searchValue: string;
}

const SummitListComponent = ({
  isFree,
  isOnline,
  searchValue,
}: SummitListComponentProps) => {
  const [summits, setSummits] = useState<any[]>([]);
  const [filteredSummits, setFilteredSummits] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const summitsPerPage = 6;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isPastSummit = (endDate: string) => new Date(endDate) < new Date();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let filtered = [...summits];

    // Filtreleme işlemleri
    if (isFree) {
      filtered = filtered.filter((summit) => summit.summitType === "free");
    }

    if (isOnline) {
      filtered = filtered.filter((summit) => summit.isOnline);
    }

    if (searchValue && searchValue.length > 2) {
      filtered = filtered.filter((summit) => {
        const title = summit.title?.toLowerCase() || ""; // Eğer title yoksa boş bir string kullan
        const description = summit.shortDescription?.toLowerCase() || ""; // Eğer description yoksa boş bir string kullan
        return (
          title.includes(searchValue.toLowerCase()) ||
          description.includes(searchValue.toLowerCase())
        );
      });
    }

    setFilteredSummits(filtered);
  }, [isFree, isOnline, searchValue, summits]);

  const indexOfLastSummit = currentPage * summitsPerPage;
  const indexOfFirstSummit = indexOfLastSummit - summitsPerPage;
  const currentSummits = filteredSummits.slice(
    indexOfFirstSummit,
    indexOfLastSummit
  );
  const totalPages = Math.ceil(filteredSummits.length / summitsPerPage);

  return (
    <div className="px-7.5 py-6 bg-white border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm">
      <div className="grid md:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(summitsPerPage)].map((_, index) => (
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
          : currentSummits.map((summit) => {
            const isCountZero = Number(summit.participantCount) === 0
              const pastSummit = isPastSummit(summit.endDate);
              return (
                <div
                  key={summit.id}
                  className={`flex flex-col border border-gray-200 rounded-lg shadow-sm ${
                    pastSummit
                      ? "bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <Image
                    className="rounded-t-lg"
                    src="https://flowbite.com/docs/images/blog/image-1.jpg"
                    alt={summit.title}
                    width={600}
                    height={250}
                    objectFit="cover"
                  />
                  <div className="flex flex-col flex-grow p-5">
                    <h5 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {summit.title}
                    </h5>
                    <div className="flex xl:flex-row flex-col gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        {formatDate(summit.startDate)}
                      </span>
                      <span className="bg-purple-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        {summit.summitType === "paid" ? "Paid" : "Free"}
                      </span>
                      <span className="bg-yellow-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                        {summit.isOnline ? "Online" : ""}
                        {summit.isPhysical ? "Physical" : ""}
                      </span>
                      {(!isCountZero && summit.participantCount) && (
                          <span className="bg-yellow-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-md dark:bg-blue-900 dark:text-blue-300">
                            {"👥 " + summit.participantCount + " people"}
                          </span>
                        )}
                    </div>
                    <p className="flex-grow text-gray-700 dark:text-gray-400">
                      {summit.shortDescription}
                    </p>
                    {!pastSummit ? (
                      <Link
                        href={`/summits/${summit.id}`}
                        className="mt-4 text-center px-4 py-2 text-sm font-medium text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                      >
                        View summit detail →
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="mt-4 text-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg cursor-not-allowed"
                      >
                        Past Summit
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

export default SummitListComponent;
