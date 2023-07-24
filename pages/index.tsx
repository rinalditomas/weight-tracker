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
  const [selectedTab, setSelectedTab] = useState("home");
  const [weightInput, setWeightInput] = useState<string | null>(null);
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
    event.preventDefault();

    if (!weightInput) {
      setError("Please enter your weight.");
      return;
    }

    const setDate = dateInput ? new Date(dateInput) : new Date();
    const dateString = setDate.toLocaleDateString();

    const existingWeightData = weightData.find((data: any) => data.date === dateString);

    const transformedWeightInput = weightInput && weightInput.replace(",", ".");

    if (existingWeightData) {
      const confirmed = window.confirm(`You already have a weight record for ${dateString}. Do you want to update it?`);

      if (confirmed) {
        const updatedWeightData = weightData.map((data: any) => {
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
      const newWeightData: any = [{ date: dateString, weight: transformedWeightInput }, ...weightData];
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
  function calculateWeeklyAverages(data: any) {
    // Convert date strings to Date objects
    const formattedData = data.map((entry: any) => ({
      ...entry,
      date: new Date(entry.date.split("/").reverse().join("-")),
    }));

    // Sort the data array by dates in ascending order
    formattedData.sort((a: any, b: any) => a.date - b.date);

    let weeklyAverages = [];

    // Group weight entries by week
    let currentWeek = [];
    for (let i = 0; i < formattedData.length; i++) {
      const entry = formattedData[i];
      currentWeek.push(entry);

      // Check if the next entry is in a different week or if it's the last entry
      if (i === formattedData.length - 1 || getWeekNumber(entry.date) !== getWeekNumber(formattedData[i + 1].date)) {
        // Calculate the average weight for the current week
        const average = calculateAverageWeight(currentWeek);

        weeklyAverages.push(average);

        // Reset the current week array
        currentWeek = [];
      }
    }

    return weeklyAverages;
  }

  function getWeekNumber(date: any) {
    const oneJan: any = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
  }

  function calculateAverageWeight(weekData: any) {
    const weights = weekData.map((entry: any) => parseFloat(entry.weight));
    const existingWeights = weights.filter((weight: any) => !isNaN(weight));

    if (existingWeights.length === 0) {
      return null;
    }

    const sum = existingWeights.reduce((acc: any, weight: any) => acc + weight, 0);
    const average = sum / existingWeights.length;

    return average.toFixed(2); // Adjust the decimal places as desired
  }

  const weeklyAverages = calculateWeeklyAverages(weightData);

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
