import { classNames } from "../utils";
export interface IAppProps {
  changeTab: (e: string) => void;
  selectedTab: string;
}

export default function Navbar({ changeTab, selectedTab }: IAppProps) {
  return (
    <footer className=" fixed inset-x-0 bottom-0 z-10 bg-white shadow h-[9%]  grid grid-flow-col justify-items-center content-start pt-4">
      <button
        onClick={() => {
          changeTab("home");
        }}
        className={classNames(
          selectedTab === "home" ? "text-orange-500 flex-col justify-center items-center space-y-1" : "",
          "flex-col flex justify-center items-center"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        {selectedTab === "home" && <div className=" rounded-full bg-orange-500 h-1 w-1"></div>}{" "}
      </button>

      <button
        onClick={() => {
          changeTab("new");
        }}
        className={classNames(
          selectedTab === "new" ? "text-orange-500 flex-col justify-center items-center space-y-1" : "",
          "flex-col flex justify-center items-center"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {selectedTab === "new" && <div className=" rounded-full bg-orange-500 h-1 w-1"></div>}{" "}
      </button>
      <button
        onClick={() => {
          changeTab("graph");
        }}
        className={classNames(
          selectedTab === "graph" ? "text-orange-500 flex-col justify-center items-center space-y-1" : "",
          "flex-col flex justify-center items-center"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
        {selectedTab === "graph" && <div className=" rounded-full bg-orange-500 h-1 w-1"></div>}{" "}
      </button>
    </footer>
  );
}
