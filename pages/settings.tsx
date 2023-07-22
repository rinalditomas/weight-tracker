import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../component/modal";

export interface IAppProps {}

const ModalContent = ({ type, userData, submitEditedData, setInputData }: any) => {
  switch (type) {
    case "name": {
      return (
        <div className="bg-gray-50 rounded-lg w-11/12 p-6 shadow  space-y-6 drop-shadow">
          <h2 className="text-gray-600 font-semibold">Change Name</h2>
          <div className="flex w-full justify-between items-center">
            <input
              type="text"
              className=" bg-transparent mx-auto text-start text-orange-600 text-opacity-70  rounded-none text-3xl w-full  focus:outline-none"
              defaultValue={userData.name}
              onChange={(e) => setInputData({ name: e.target.value })}
            />
            <button
              className=" rounded-xl p-2 bg-orange-400 opacity-90  text-white shadow-sm"
              onClick={() => submitEditedData()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 font-bold"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      );
    }
    case "initialWeight": {
      return (
        <div className="bg-white rounded-lg w-11/12 p-6 shadow  space-y-6 drop-shadow">
          <h2 className="text-gray-600 font-semibold">Change Initial Weight</h2>
          <div className="flex w-full justify-between items-center">
            <input
              type="tel"
              inputMode="decimal"
              className=" bg-transparent mx-auto text-start text-orange-600 text-opacity-70  rounded-none text-3xl w-full  focus:outline-none"
              onChange={(e) => setInputData({ initialWeight: e.target.value })}
              defaultValue={userData.initialWeight}
            />
            <button
              className=" rounded-xl p-2 bg-orange-400 opacity-90  text-white shadow-sm"
              onClick={() => submitEditedData()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 font-bold"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      );
    }
    case "goalWeight": {
      return (
        <div className="bg-white rounded-lg w-11/12 p-6 shadow  space-y-6 drop-shadow">
          <h2 className="text-gray-600 font-semibold">Change Goal Weight</h2>
          <div className="flex w-full justify-between items-center">
            <input
              type="tel"
              inputMode="decimal"
              className=" bg-transparent mx-auto text-start text-orange-600 text-opacity-70  rounded-none text-3xl w-full  focus:outline-none"
              onChange={(e) => setInputData({ goalWeight: e.target.value })}
              defaultValue={userData.goalWeight}
            />
            <button
              className=" rounded-xl p-2 bg-orange-400 opacity-90  text-white shadow-sm"
              onClick={() => submitEditedData()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 font-bold"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    default:
      return <div>errro</div>;
  }
};

export default function Settings(props: IAppProps) {
  const [userData, setUserData] = useState<any>({});
  const [inputData, setInputData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");

  useEffect(() => {
    let userLocalData = localStorage.getItem("userData");

    if (userLocalData !== null) {
      let parsedUserData = JSON.parse(userLocalData);
      setUserData(parsedUserData);
    }
  }, []);

  const handleModalClose = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const submitEditedData = () => {
    switch (modalType) {
      case "name": {
        const newUserData: any = { ...userData, name: inputData.name };

        setUserData(newUserData);
        localStorage.setItem("userData", JSON.stringify(newUserData));
        setInputData({});
        setIsModalOpen(false);
        break;
      }
      case "initialWeight": {
        const transformedWeightInput = inputData.initialWeight.replace(",", ".");

        const newUserData: any = { ...userData, initialWeight: transformedWeightInput };
        setUserData(newUserData);
        localStorage.setItem("userData", JSON.stringify(newUserData));
        setInputData({});
        setIsModalOpen(false);
        break;
      }
      case "goalWeight": {
        const transformedWeightInput = inputData.goalWeight.replace(",", ".");

        const newUserData: any = { ...userData, goalWeight: transformedWeightInput };
        setUserData(newUserData);
        localStorage.setItem("userData", JSON.stringify(newUserData));
        setInputData({});
        setIsModalOpen(false);
        break;
      }

      default:
        return;
    }
  };

  return (
    <div className="relative bg-gray-50 flex flex-col h-screen py-4 px-6">
      <Link href="/" className="self-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mb-20 mt-6 text-gray-500 "
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
      </Link>
      <div className=" h-[70%] flex flex-col justify-between">
        <div className="w-full ">
          <h1 className="pb-12 text-3xl text-gray-500">Settings</h1>

          <div className="w-full space-y-4 divide-y divide-gray-200">
            <button
              onClick={() => {
                setModalType("name");
                setIsModalOpen(true);
              }}
              className="w-full flex justify-between items-center"
            >
              <span className="text-gray-600">Name</span>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">{userData.name}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
            <button
              onClick={() => {
                setModalType("initialWeight");
                setIsModalOpen(true);
              }}
              className="w-full flex justify-between items-center"
            >
              <span className="text-gray-600">Initial Weight</span>
              <div className="flex items-center space-x-4 pt-4">
                <span className="text-gray-400">{userData.initialWeight}kg</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
            <button
              onClick={() => {
                setModalType("goalWeight");
                setIsModalOpen(true);
              }}
              className="w-full flex justify-between items-center"
            >
              <span className="text-gray-600">Goal Weight</span>
              <div className="flex items-center space-x-4 pt-4 ">
                <span className="text-gray-400">{userData.goalWeight}kg</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("weightData");
            localStorage.removeItem("userData");
          }}
          className="rounded-xl bg-red-400 opacity-90   py-6 w-full text-sm font-semibold text-white shadow-sm"
        >
          Delete local data
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0" onClick={handleModalClose}></div>
          <ModalContent
            type={modalType}
            userData={userData}
            setInputData={setInputData}
            submitEditedData={submitEditedData}
          />
        </div>
      )}
    </div>
  );
}
