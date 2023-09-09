import { useState } from "react";
import { useGeneralContext } from "../../context/generalContext";

export default function RequestInitialWeight() {
  const { setError, userData, setUserData, error, setWeightData } = useGeneralContext();

  const [userInput, setUserInput] = useState<any>(null);

  const submitWeight = (e: any) => {
    if (!userInput || !userInput.initialWeight) {
      setError("Please enter your current weight to continue.");
      return;
    }
    const today = new Date().toLocaleDateString();

    const transformedWeightInput = userInput.initialWeight && userInput.initialWeight.replace(",", ".");

    const userEnteredData = { ...userData, initialWeight: transformedWeightInput };
    const newWeightData: any = [{ date: today, weight: transformedWeightInput }];
    setWeightData(newWeightData);
    localStorage.setItem("weightData", JSON.stringify(newWeightData));

    setUserData(userEnteredData);
    localStorage.setItem("userData", JSON.stringify(userEnteredData));
    setError(null);
  };

  return (
    <div className="flex flex-col  h-screen">
      <div className="flex flex-col  h-screen">
        <div className="bg-white flex items-center justify-between py-12 px-6   flex-col h-full overflow-y-auto">
          <div className="flex flex-col items-center justify-center  space-y-4 pt-20">
            <h1 className=" text-4xl text-gray-700  text-center ">What is your current weight?</h1>
          </div>
          <div className="flex items-center justify-center ">
            <input
              type="tel"
              inputMode="decimal"
              className=" bg-transparent mx-auto text-center text-orange-600 text-opacity-70  rounded-none text-5xl w-full  focus:outline-none"
              onChange={(e) => setUserInput({ ...userInput, initialWeight: e.target.value })}
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
