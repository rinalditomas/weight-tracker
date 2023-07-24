import { useState } from "react";

export interface IAppProps {
  setUserData: (e: any) => void;
  setError: (e: string | null) => void;
  userData: any;
  error: string | null;
}

export default function RequestGoalWeight({ setUserData, userData, error, setError }: IAppProps) {
  const [userInput, setUserInput] = useState<any>(null);

  const submitWeight = (e: any) => {
    if (!userInput || !userInput.goalWeight) {
      setError("Please enter your goal weight to continue.");
      return;
    }

    const transformedWeightInput = userInput.goalWeight && userInput.goalWeight.replace(",", ".");

    const userEnteredData = { ...userData, goalWeight: transformedWeightInput };

    setUserData(userEnteredData);
    localStorage.setItem("userData", JSON.stringify(userEnteredData));
    setError(null);
  };

  return (
    <div className="flex flex-col  h-screen">
      <div className="flex flex-col  h-screen">
        <div className="bg-white flex items-center justify-between py-12 px-6   flex-col h-full overflow-y-auto">
          <div className="flex flex-col items-center justify-center  space-y-4 pt-20">
            <h1 className=" text-4xl text-gray-700  text-center ">What is your goal weight?</h1>
          </div>
          <div className="flex items-center justify-center ">
            <input
              type="tel"
              inputMode="decimal"
              className=" bg-transparent mx-auto text-center text-orange-600 text-opacity-70  rounded-none text-5xl w-full  focus:outline-none"
              onChange={(e) => setUserInput({ ...userInput, goalWeight: e.target.value })}
              onFocus={(e: any) => (e.target.value = "")}
              defaultValue={0}
            />
          </div>
          <div className=" w-full flex items-center flex-col">
            {error && <p className="py-5 text-red-500">{error}</p>}
            <button
              type="button"
              className="rounded-xl bg-orange-400 opacity-90 py-6   w-full text-sm font-semibold text-white shadow-sm"
              onClick={(e: any) => {
                submitWeight(e);
              }}
            >
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
