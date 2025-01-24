"use client"

import Link from "next/link";

interface EventListHeaderProps {
  toggleOptions: string[]; // Toggle seçenekleri
  onToggleChange: (index: number) => void; // Toggle durumu değiştiğinde çalışacak fonksiyon
  searchPlaceholder: string; // Search input'unun placeholder'ı
  setSearchValue: any; // Search butonuna basıldığında yapılacak işlem
}

const EventListHeader = ({
  toggleOptions,
  onToggleChange,
  searchPlaceholder,
  setSearchValue,
}: EventListHeaderProps) => {
  const renderToggle = (label: string, index: number) => (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={() => onToggleChange(index)}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <h2 className="text-4xl font-medium">Find Events</h2>
        <Link href="/create-event">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create Event
          </button>
        </Link>
      </div>
        <div className="flex justify-between mt-5">
        <div className="flex gap-3">
          {toggleOptions.map((option, index) => renderToggle(option, index))}
        </div>

        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={searchPlaceholder}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        </div>

    </div>
  );
};

export default EventListHeader;
