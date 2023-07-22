import { useState } from "react";

export interface IAppProps {
  handleSubmit: (e: any) => void;
  setDateInput: (e: any) => void;
  setWeightInput: (e: string) => void;
  error: string | null;
  changeTab: (e: string) => void;
  setError: (e: string | null) => void;
}

export default function NewRecord({
  handleSubmit,
  setWeightInput,
  error,
  changeTab,
  setDateInput,
  setError,
}: IAppProps) {
  function DateInput() {
    const today = new Date().toISOString().substr(0, 10); // get today's date in YYYY-MM-DD format

    return (
      <input
        onChange={(e) => {
          let selectedDate = e.target.value;
          if (selectedDate > today) {
            // If it's a future date, set the input value to today's date
            setError("Please select a valid date to continue.");
            e.target.value = today;
          } else {
            setError(null);
            setDateInput(e.target.value);
          }
        }}
        type="date"
        className=" bg-transparent text-gray-400  focus:outline-none"
        defaultValue={today}
        max={today} // Set the maximum value to today's date
      />
    );
  }

  return (
    <div className="bg-white flex items-center justify-between py-12 px-6   flex-col h-[91%] overflow-y-auto">
      <div className="flex items-center justify-between w-full">
        <h1 className=" text-4xl text-gray-700   ">Add weight</h1>
        <button
          onClick={() => {
            changeTab("home");
          }}
          className=" text-gray-400 text-sm font-semibold"
        >
          CANCEL
        </button>
      </div>
      <div className="flex items-center justify-center h-64 w-64 rounded-full border border-orange-500 border-opacity-50 ">
        <input
          type="tel"
          inputMode="decimal"
          className=" bg-transparent mx-auto text-center text-orange-600 text-opacity-70  rounded-none text-5xl w-full  focus:outline-none"
          onChange={(e: any) => {
            setWeightInput(e.target.value);
          }}
          onFocus={(e: any) => (e.target.value = "")}
          defaultValue={0}
        />
      </div>
      {DateInput()}
      {error && <p className="py-5 text-red-500">{error}</p>}
      <button
        type="button"
        className="rounded-xl bg-orange-400 opacity-90   py-6 w-full text-sm font-semibold text-white shadow-sm"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        DONE
      </button>
    </div>
  );
}
