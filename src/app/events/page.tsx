"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EventListComponent from "@/components/EventList";
import EventListHeader from "@/components/EventListHeader";
import {useState, useEffect} from "react"


// EventsPage component'i
const EventsPage = () => {
  const [isOnline, setIsOnline] = useState(false)
  const [isFree, setIsFree] = useState(false)
  const [searchValue, setSearchValue] = useState("")


  // Toggle seçeneklerini tanımlayalım
  const toggleOptions = [
    "All / Online events",
    "All / Free events"
  ];

  // Toggle durumu değiştiğinde yapılacak işlem
  const handleToggleChange = (index: number) => {
    if(index === 1){
      setIsFree(!isFree)
    }
    if(index === 0){
      setIsOnline(!isOnline)
    }
  };

  useEffect(() => {
    console.log("searchValue", searchValue)
    console.log("isFree", isFree)
    console.log("isOnline", isOnline)

  }, [searchValue, isFree, isOnline])

  return (
    <DefaultLayout>
      <EventListHeader
        toggleOptions={toggleOptions}
        onToggleChange={handleToggleChange}
        searchPlaceholder="Search events..."
        setSearchValue={setSearchValue}
      />
      <EventListComponent 
      isFree={isFree}
      isOnline={isOnline}
      searchValue={searchValue}
      />
    </DefaultLayout>
  );
};

export default EventsPage;
