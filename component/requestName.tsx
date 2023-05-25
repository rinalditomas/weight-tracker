import { useState } from "react";

export interface IAppProps {
  setUserData: (e: any) => void;
  setError: (e: any) => void;
  userData: any;
  error: string | null;
}

export default function RequestName({ setUserData, userData, error, setError }: IAppProps) {
  const [userInput, setUserInput] = useState<any>(null);

  const submitName = (e: any) => {
    if (!userInput || !userInput.name) {
      setError("Please enter your name to continue.");
      return;
    }
    const userEnteredData = { ...userData, name: userInput.name };

    setUserData(userEnteredData);
    localStorage.setItem("userData", JSON.stringify(userEnteredData));
    setError(null);
  };

  return (
    <div className="flex flex-col  h-screen">
      <div className="bg-white flex items-center justify-between py-12 px-6   flex-col h-full overflow-y-auto">
        <div className="flex flex-col items-center justify-center  space-y-4 pt-20">
          <h1 className=" text-4xl text-gray-700  text-center ">What is your name?</h1>
          <p className=" text-gray-500 text-left">Enter the name you would like to go by</p>
        </div>
        <div className="flex items-center justify-center ">
          <input
            type="text"
            className=" bg-transparent mx-auto text-center text-orange-600 text-opacity-70  rounded-none text-3xl w-full  focus:outline-none"
            placeholder="Your name"
            onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
          />
        </div>
        {error && <p className="py-5 text-red-500">{error}</p>}
        <button
          type="button"
          className="rounded-xl bg-orange-400 opacity-90   py-6 w-full text-sm font-semibold text-white shadow-sm"
          onClick={(e: any) => {
            submitName(e);
          }}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
