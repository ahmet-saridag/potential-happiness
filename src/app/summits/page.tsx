"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SummitListComponent from "@/components/SummitList";
import SummitListHeader from "@/components/SummitListHeader";
import {useState, useEffect} from "react"

// SummitsPage component'i
const SummitsPage = () => {
  const [isOnline, setIsOnline] = useState(false)
  const [isFree, setIsFree] = useState(false)
  const [searchValue, setSearchValue] = useState("")


  // Toggle seçeneklerini tanımlayalım
  const toggleOptions = [
    "All / Online summits",
    "All / Free summits"
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

  return (
    <DefaultLayout>
      <SummitListHeader
        toggleOptions={toggleOptions}
        onToggleChange={handleToggleChange}
        searchPlaceholder="Search summits..."
        setSearchValue={setSearchValue}
      />
      <SummitListComponent 
      isFree={isFree}
      isOnline={isOnline}
      searchValue={searchValue}
      />
    </DefaultLayout>
  );
};

export default SummitsPage;
