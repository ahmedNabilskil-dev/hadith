import React, { createContext, useContext, useEffect, useState } from "react";
import { MaqsadI } from "../interfaces/Maqsad";
import { basePath } from "../common/env";
import axios from "axios";

// Define context types
interface MaqsadContextType {
  maqsads: MaqsadI[];
  fetchMaqsads: () => void;
  loading: boolean;
}

// Create context
const MaqsadContext = createContext<MaqsadContextType | undefined>(undefined);

// Create provider component
export const MaqsadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [maqsads, setMaqsads] = useState<MaqsadI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMaqsads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${basePath}/hadiths/maqsads`); // Replace with actual endpoint
      setMaqsads(response.data.maqsads);
    } catch (error) {
      console.error("Failed to fetch maqsads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaqsads();
  }, []);

  return (
    <MaqsadContext.Provider value={{ maqsads, fetchMaqsads, loading }}>
      {children}
    </MaqsadContext.Provider>
  );
};

// Custom hook for using Maqsad context
export const useMaqsad = () => {
  const context = useContext(MaqsadContext);
  if (context === undefined) {
    throw new Error("useMaqsad must be used within a MaqsadProvider");
  }
  return context;
};
