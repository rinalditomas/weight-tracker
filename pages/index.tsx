import { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import styles from "../styles/Home.module.css";
import Home from "../component/home";
import Graph from "../component/graph";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { classNames } from "../utils";
import NewRecord from "../component/newRecord";
import RequestName from "../component/requestName";
import RequestInitialWeight from "../component/requestInitialWeight";
import RequestGoalWeight from "../component/requestGoalWeight";

export interface WeightData {
  date: string;
  weight: string;
}
export default function Main() {
  const [selectedTab, setSelectedTab] = useState<string>("home");
  const [weightInput, setWeightInput] = useState<string | null>(null);
  const [dateInput, setDateInput] = useState<string | null>(null);
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


 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();

   if (!weightInput) {
     setError("Please enter your weight.");
     return;
   }

   const setDate = dateInput ? new Date(dateInput) : new Date();
   const dateString = setDate.toLocaleDateString();

   const existingWeightData = weightData.find((data: WeightData) => data.date === dateString);

   const transformedWeightInput = weightInput && weightInput.replace(",", ".");

   if (existingWeightData) {
     const confirmed = window.confirm(`You already have a weight record for ${dateString}. Do you want to update it?`);

     if (confirmed) {
       const updatedWeightData = weightData.map((data: WeightData) => {
         if (data.date === dateString) {
           return { ...data, weight: transformedWeightInput };
         }
         return data;
       });

       setWeightData(updatedWeightData);
       localStorage.setItem("weightData", JSON.stringify(updatedWeightData));
       setSelectedTab("graph");
       setWeightInput(null);
       setDateInput(null);
       setError(null);
     }
   } else {
     const newWeightData: WeightData[] = [{ date: dateString, weight: transformedWeightInput }, ...weightData];
     setWeightData(newWeightData);
     localStorage.setItem("weightData", JSON.stringify(newWeightData));
     setSelectedTab("graph");
     setWeightInput(null);
     setDateInput(null);
     setError(null);
   }
 };


  const changeTab = (tab: string) => {
    setSelectedTab(tab);
    setError(null);
  };

  function deleteWeightRecord(records: WeightData[], selectedRecord: WeightData) {
    let newArrayOfWeights = records.filter((record: WeightData) => record !== selectedRecord);
    setWeightData(newArrayOfWeights);
    localStorage.setItem("weightData", JSON.stringify(newArrayOfWeights));
  }






  if (!userData.name) {
    return <RequestName error={error} setError={setError} setUserData={setUserData} userData={userData} />;
  }
  if (!userData.goalWeight) {
    return <RequestGoalWeight error={error} setError={setError} setUserData={setUserData} userData={userData} />;
  }

  if (!userData.initialWeight) {
    return (
      <RequestInitialWeight
        error={error}
        setError={setError}
        setUserData={setUserData}
        userData={userData}
        setWeightData={setWeightData}
      />
    );
  } else {
    return (
      <div className="flex flex-col  h-screen">
        {selectedTab === "home" ? (
          <Home weightData={weightData} userData={userData} />
        ) : selectedTab === "new" ? (
          <NewRecord
            changeTab={changeTab}
            error={error}
            handleSubmit={handleSubmit}
            setWeightInput={setWeightInput}
            setDateInput={setDateInput}
            setError={setError}
          />
        ) : (
          <Graph weightData={weightData} deleteWeightRecord={deleteWeightRecord} />
        )}
        <Navbar changeTab={changeTab} selectedTab={selectedTab} />
      </div>
    );
  }
}
