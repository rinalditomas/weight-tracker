import { ReactNode, useEffect, useState } from "react";
import Navbar from "./navbar";
import { WeightData } from "./generalInterfaces";
import RequestName from "./requestName";
import RequestGoalWeight from "./requestGoalWeight";
import RequestInitialWeight from "./requestInitialWeight";
import { useGeneralContext } from "../../context/generalContext";

export type GeneralLayoutProps = {
  children: ReactNode;
};

export default function GeneralLayout({ children }: GeneralLayoutProps) {
  const { userData } = useGeneralContext();

  if (!userData.name) {
    return <RequestName />;
  }
  if (!userData.goalWeight) {
    return <RequestGoalWeight />;
  }
  if (!userData.initialWeight) {
    return <RequestInitialWeight />;
  } else {
    return (
      <div className="flex flex-col  h-screen">
        {children}
        <Navbar />
      </div>
    );
  }
}
