import { WeightData } from "../general/generalInterfaces";

// the required distance between touchStart and touchEnd to be detected as a swipe
const minSwipeDistance = 50;

export const onTouchStart = (e: React.TouchEvent, setTouchEnd: any, setTouchStart: any) => {
  setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
  setTouchStart(e.targetTouches[0].clientX);
};

export const onTouchMove = (e: React.TouchEvent, setTouchEnd: any) => setTouchEnd(e.targetTouches[0].clientX);

export const onTouchEnd = (
  weight: WeightData,
  touchStart: any,
  touchEnd: any,
  setShowButtons: any,
  setSelectedRecord: any
) => {
  if (!touchStart || !touchEnd) return;
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;
  if (isLeftSwipe) {
    setShowButtons(true);
    setSelectedRecord(weight);
  }
};

export let rangeFunction = (selectedFilter: string, weightData: WeightData[]) => {
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

export const filteredDates = (selectedFilter: string, weightData: WeightData[]) => {
  const startDate = rangeFunction(selectedFilter, weightData);
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

export const handleClickOutsideButton = (e: any, buttonRef: any, setShowButtons: any, setSelectedRecord: any) => {
  if (buttonRef.current && buttonRef.current !== e.target && !buttonRef.current.contains(e.target)) {
    setShowButtons(false);
    setSelectedRecord(null);
  }
};

export function deleteWeightRecord(records: WeightData[], selectedRecord: WeightData, setWeightData: (e: any) => void) {
  let newArrayOfWeights = records.filter((record: WeightData) => record !== selectedRecord);
  setWeightData(newArrayOfWeights);
  localStorage.setItem("weightData", JSON.stringify(newArrayOfWeights));
}
