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

const data = [
  { name: "Page A", uv: 81, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 81.5, pv: 1200, amt: 1200 },
  { name: "Page C", uv: 82, pv: 2000, amt: 2000 },
  { name: "Page D", uv: 83, pv: 1000, amt: 1000 },
  { name: "Page D", uv: 85, pv: 1000, amt: 1000 },
];
export interface WeightData {
  date: string;
  weight: string;
}
export default function Main() {
  const [selectedTab, setSelectedTab] = useState("home");
  const [weightInput, setWeightInput] = useState<number | null>(null);
  const [dateInput, setDateInput] = useState<string | null>(null);
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let localData = localStorage.getItem("weightData");
    let userLocalData = localStorage.getItem("userData");
    if (localData !== null) {
      let parsedWeightData = JSON.parse(localData);
      let sortedWeightData = parsedWeightData.sort((a: any, b: any) => {
        const dateA: any = new Date(a.date.split("/").reverse().join("/"));
        const dateB: any = new Date(b.date.split("/").reverse().join("/"));
        return dateB - dateA;
      });
      setWeightData(sortedWeightData);
    }
    if (userLocalData !== null) {
      let parsedUserData = JSON.parse(userLocalData);
      setUserData(parsedUserData);
    }
  }, []);

  const handleSubmit = (event: any) => {
    if (!weightInput) {
      setError("Please enter your weight.");
      return;
    }

    event.preventDefault();
    const setDate = dateInput ? new Date(dateInput) : new Date();
    const dateString = setDate.toLocaleDateString();

    const existingWeightData = weightData.find((data: any) => data.date === dateString);

    if (existingWeightData) {
      const confirmed = window.confirm(`You already have a weight record for ${dateString}. Do you want to update it?`);

      if (confirmed) {
        const updatedWeightData = weightData.map((data: any) => {
          if (data.date === dateString) {
            return { ...data, weight: weightInput };
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
      const newWeightData: any = [...weightData, { date: dateString, weight: weightInput }];
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

  function deleteWeightRecord(records: any, selectedRecord: any) {
    let newArrayOfWeights = records.filter((record: any) => record !== selectedRecord);
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
