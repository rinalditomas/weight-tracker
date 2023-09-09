import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WeightData } from "../layouts/general/generalInterfaces";

type GeneralContextProps = {
  children: ReactNode;
};

export const GeneralContext = createContext<any | null>(null);

export function GeneralContextProvider({ children }: GeneralContextProps) {
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let localData = localStorage.getItem("weightData");
    let userLocalData = localStorage.getItem("userData");

    if (localData !== null) {
      let parsedWeightData = JSON.parse(localData) as WeightData[];
      let sortedWeightData = parsedWeightData.sort((a: WeightData, b: WeightData) => {
        const dateA = new Date(a.date.split("/").reverse().join("/"));
        const dateB = new Date(b.date.split("/").reverse().join("/"));
        return dateB.getTime() - dateA.getTime();
      });
      setWeightData(sortedWeightData);
    }
    if (userLocalData !== null) {
      let parsedUserData = JSON.parse(userLocalData);
      setUserData(parsedUserData);
    }
  }, []);

  let contextValues = {
    weightData,
    userData,
    error,
    setError,
    setUserData,
    setWeightData,
  };

  return <GeneralContext.Provider value={contextValues}>{children}</GeneralContext.Provider>;
}

export function useGeneralContext() {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useLanguageContext must be added within a LanguageContextProvider");
  }
  return context;
}
