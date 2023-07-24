import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { classNames } from "../utils";
import { RefObject, useEffect, useRef, useState } from "react";
import { WeightData } from "../pages";

export interface IAppProps {
  weightData: WeightData[];
  deleteWeightRecord: (records: WeightData[], weight: WeightData) => void;
}

export default function Graph({ weightData, deleteWeightRecord }: IAppProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("7days");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  let [showButtons, setShowButtons] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<WeightData | null>(null);
  const buttonRef: RefObject<HTMLButtonElement> = useRef(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (weight: WeightData) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setShowButtons(true);
      setSelectedRecord(weight);
    }
  };

  let rangeFunction = () => {
    switch (selectedFilter) {
      case "7days": {
        return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      }
      case "30days": {
        return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      }

      case "6months": {
        return new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
      }

      case "1year": {
        return new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      }
      default:
        // If an invalid range is specified, return the original data
        return weightData;
    }
  };

  const filteredDates = () => {
    const startDate = rangeFunction();
    const endDate = new Date();

    const resultProductData = weightData.filter((a: WeightData) => {
      const dateParts = a.date.split("/");
      const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      return date >= startDate && date <= endDate;
    });

    const sortedWeightData = resultProductData.sort((a: WeightData, b: WeightData) => {
      const datePartsA = a.date.split("/");
      const dateA: any = new Date(`${datePartsA[2]}-${datePartsA[1]}-${datePartsA[0]}`);

      const datePartsB = b.date.split("/");
      const dateB: any = new Date(`${datePartsB[2]}-${datePartsB[1]}-${datePartsB[0]}`);

      return dateA - dateB;
    });

    return sortedWeightData;
  };
  const filteredAndSortedData = filteredDates().sort((a: WeightData, b: WeightData) => {
    const datePartsA = a.date.split("/");
    const dateA: any = new Date(`${datePartsA[2]}-${datePartsA[1]}-${datePartsA[0]}`);

    const datePartsB = b.date.split("/");
    const dateB: any = new Date(`${datePartsB[2]}-${datePartsB[1]}-${datePartsB[0]}`);
    return dateB - dateA;
  });
  const handleClickOutsideButton = (e: any) => {
    if (buttonRef.current && buttonRef.current !== e.target && !buttonRef.current.contains(e.target)) {
      setShowButtons(false);
      setSelectedRecord(null);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("click", handleClickOutsideButton);
    }
  }, []);

  return (
    <div className="bg-gray-50  h-[91%] overflow-y-auto px-2 pt-2">
      <div className="w-full h-[45%] py-6 flex mx-auto bg-indigo-400 rounded-xl flex-col">
        <div className="w-full h-[92%]">
          <ResponsiveContainer>
            <LineChart
              data={filteredDates()}
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
            <div
              className="flex  justify-between items-center py-4 relative "
              onTouchStart={(e) => onTouchStart(e)}
              onTouchMove={onTouchMove}
              onTouchEnd={() => onTouchEnd(weight)}
            >
              <h1 className="text-gray-500">{weight.date}</h1>
              <div className="flex items-end">
                <h1 className="text-gray-600  font-medium">{weight.weight}</h1>
                <h1 className="text-gray-500 text-sm ">kg</h1>
              </div>
              {showButtons && selectedRecord === weight && (
                <button
                  onClick={() => deleteWeightRecord(weightData, weight)}
                  ref={buttonRef}
                  className="absolute right-0 z-50 bg-red-500 p-2 rounded-lg text-white "
                >
                  delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
