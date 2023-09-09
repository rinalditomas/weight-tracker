import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { classNames } from "../../utils";
import { RefObject, useEffect, useRef, useState } from "react";
import { WeightData } from "../general/generalInterfaces";
import { useGeneralContext } from "../../context/generalContext";
import { deleteWeightRecord, filteredDates, handleClickOutsideButton } from "./graphUtils";
import RecordEntry from "./recordEntry";

export default function GraphLayout() {
  const { setError, error, weightData, setWeightData } = useGeneralContext();

  const [selectedFilter, setSelectedFilter] = useState<string>("7days");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  let [showButtons, setShowButtons] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<WeightData | null>(null);
  const buttonRef: RefObject<HTMLButtonElement> = useRef(null);

  const filteredAndSortedData = filteredDates(selectedFilter, weightData).sort((a: WeightData, b: WeightData) => {
    const datePartsA = a.date.split("/");
    const dateA: any = new Date(`${datePartsA[2]}-${datePartsA[1]}-${datePartsA[0]}`);

    const datePartsB = b.date.split("/");
    const dateB: any = new Date(`${datePartsB[2]}-${datePartsB[1]}-${datePartsB[0]}`);
    return dateB - dateA;
  });

  return (
    <div className="bg-gray-50  h-[91%] overflow-y-auto px-2 pt-2">
      <div className="w-full h-[45%] py-6 flex mx-auto bg-indigo-400 rounded-xl flex-col">
        <div className="w-full h-[92%]">
          <ResponsiveContainer>
            <LineChart
              data={filteredDates(selectedFilter, weightData)}
              margin={{
                right: 30,
                left: -10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                fontSize={10}
                orientation="top"
                axisLine={false}
                label={{ fontSize: 12, color: "#FFFFFF" }}
                stroke="#FFFFFF"
                type="category"
              />
              <YAxis
                fontSize={10}
                label={{ fontSize: 12, color: "#FFFFFF" }}
                stroke="#FFFFFF"
                domain={["dataMin", "dataMax"]}
              />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#FFFFFF" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-flow-col mt-4 h-[8%] text-white justify-items-center">
          <button
            onClick={() => {
              setSelectedFilter("7days");
            }}
            className={classNames(
              selectedFilter === "7days" ? "border rounded-lg border-orange-500 bg-orange-500 bg-opacity-50" : "",
              " w-fit px-2 py-1 "
            )}
          >
            7 days
          </button>
          <button
            onClick={() => {
              setSelectedFilter("30days");
            }}
            className={classNames(
              selectedFilter === "30days" ? "border rounded-lg border-orange-500 bg-orange-500 bg-opacity-50" : "",
              " w-fit px-2 py-1 "
            )}
          >
            30 days
          </button>
          <button
            onClick={() => {
              setSelectedFilter("6months");
            }}
            className={classNames(
              selectedFilter === "6months" ? "border rounded-lg border-orange-500 bg-orange-500 bg-opacity-50" : "",
              " w-fit px-2 py-1 "
            )}
          >
            6 months
          </button>
          <button
            onClick={() => {
              setSelectedFilter("1year");
            }}
            className={classNames(
              selectedFilter === "1year" ? "border rounded-lg border-orange-500 bg-orange-500 bg-opacity-50" : "",
              " w-fit px-2 py-1 "
            )}
          >
            1 year
          </button>
        </div>
      </div>
      <div
        className="py-4 px-2 overflow-y-auto h-[55%]"
        onScroll={() => {
          setSelectedRecord(null);
          setShowButtons(false);
        }}
      >
        <h1 className=" text-gray-500 font-semibold">History</h1>
        <div className=" divide-y divide-gray-200">
          {filteredAndSortedData.map((weight: any) => (
            <RecordEntry weight={weight} key={weight.date} />
          ))}
        </div>
      </div>
    </div>
  );
}
