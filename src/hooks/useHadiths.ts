// useHadiths.ts
import { useState, useEffect } from "react";
import { fetchHadiths } from "../api/hadith.api";

export const useHadiths = (initialHadithNo: number) => {
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [currentHadithNo, setCurrentHadithNo] = useState(initialHadithNo);

  const loadHadiths = async () => {
    const fetchedHadiths = await fetchHadiths(currentHadithNo);
    setHadiths(fetchedHadiths);
  };
  useEffect(() => {
    loadHadiths();
  }, [currentHadithNo]);

  const reload =async ()=>{
    setHadiths([])
   await loadHadiths()
  }

  const goToNextHadith = () => setCurrentHadithNo((prev) => prev + 1);
  const goToPrevHadith = () => setCurrentHadithNo((prev) => prev - 1);

  return { hadiths, goToNextHadith, goToPrevHadith,reload };
};
