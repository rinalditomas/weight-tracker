import * as React from "react";
import { WeightData } from "../general/generalInterfaces";

export interface RecordEntryProps {
  weight: WeightData;
}

export default function RecordEntry({ weight }: RecordEntryProps) {
  return (
    <div className="flex  justify-between items-center py-4 relative ">
      <h1 className="text-gray-500">{weight.date}</h1>
      <div className="flex items-end">
        <h1 className="text-gray-600  font-medium">{weight.weight}</h1>
        <h1 className="text-gray-500 text-sm ">kg</h1>
      </div>
      {/* {showButtons && selectedRecord === weight && (
        <button
          onClick={() => deleteWeightRecord(weightData, weight, setWeightData)}
          ref={buttonRef}
          className="absolute right-0 z-50 bg-red-500 p-2 rounded-lg text-white "
        >
          delete
        </button>
      )} */}
    </div>
  );
}
