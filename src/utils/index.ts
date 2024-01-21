import { IDataSet, IRecords } from "../interfaces";
import { Property } from "../enums";
export const calculateGammaProperty = (
  ash: number,
  hue: number,
  magnesium: number
): number => {
  try {
    let gamma = (ash * hue) / magnesium;

    gamma = Math.round(gamma * 1000) / 1000;

    return gamma;
  } catch (ex) {
    console.log("devision error", ex);
  }
  return 0;
};

export const getAirthmeticMeanfromDataSet = (
  classDataSet: IDataSet[],
  property: string
) => {
  try {
    if (classDataSet) {
      let totalSum = 0;

      classDataSet?.forEach((item) => {
        totalSum += item[property];
      });

      if (classDataSet?.length) {
        const mean = totalSum / classDataSet?.length;

        return mean.toFixed(3);
      }
    }
  } catch (ex) {
    console.log("error in getAirthmeticMean", ex);
  }
  return 0;
};

export const getMedianFromDataSet = (
  classDataSet: IDataSet[],
  property: string
): number | string => {
  try {
    if (!classDataSet || classDataSet?.length <= 0) return 0;

    const sortedRecords = classDataSet.sort((firstRecord, secondRecords) => {
      return firstRecord[property] - secondRecords[property];
    });

    const recordCounts = sortedRecords.length;

    if (recordCounts % 2 === 0) {
      const nBy2thTerm = (recordCounts - 2) / 2;

      return (
        (sortedRecords[nBy2thTerm][property] +
          sortedRecords[nBy2thTerm + 1][property]) /
        2
      );
    } else {
      return sortedRecords[(recordCounts - 1) / 2][property];
    }
  } catch (ex) {
    console.log("Error in getClassWiseMedianFromDataSet", ex);
  }
  return 0;
};

//Assuming multiple modes will be present
export const getModeFromData = (classDataSet: IDataSet[], property: string) => {
  try {
    const freqMap: Record<number, number> = {};

    classDataSet.forEach((item) => {
      if (freqMap[item[property]]) {
        freqMap[item[property]] += 1;
      } else {
        freqMap[item[property]] = 1;
      }
    });

    let maxFreq = 0;

    for (let key in freqMap) {
      maxFreq = Math.max(maxFreq, freqMap[key]);
    }

    let mode: number[] = [];
    for (let key in freqMap) {
      if (freqMap[key] === maxFreq) {
        mode.push(Number(key));
      }
    }

    return mode.join(",");
  } catch (ex) {
    console.log("error in getModeData", ex);
  }
  return "";
};

export const getMeanDataSorce = (groupedData, property: Property) => {
  const meanColumnsValues: IRecords[] = [
    {
      schema: "Measure",
      value: `${property} Mean`,
    },
  ];
  Object.keys(groupedData).map((column) => {
    meanColumnsValues.push({
      schema: `Class ${column}`,
      value: getAirthmeticMeanfromDataSet(groupedData[column], property),
    });
  });

  return meanColumnsValues;
};

export const getMedianDataSource = (groupedData, property: Property) => {
  const median: IRecords[] = [
    {
      schema: "Measure",
      value: `${property} Median`,
    },
  ];
  Object.keys(groupedData).map((column) => {
    median.push({
      schema: `Class ${column}`,
      value: getMedianFromDataSet(groupedData[column], property),
    });
  });
  return median;
};

export const getModeDataSource = (groupedData, property: Property) => {
  const mode: IRecords[] = [
    {
      schema: "Measure",
      value: `${property}  Mode`,
    },
  ];
  Object.keys(groupedData).map((column) => {
    mode.push({
      schema: `Class ${column}`,
      value: getModeFromData(groupedData[column], property),
    });
  });
  return mode;
};
