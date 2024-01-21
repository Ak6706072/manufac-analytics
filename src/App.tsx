import React, { useState } from "react";
import { TestData } from "./constants";
import { Grid } from "./components";
import { IColumn, IRecords, IDataSet } from "./interfaces";
import { useEffect } from "react";
import { Property } from "./enums";
import {
  calculateGammaProperty,
  getModeDataSource,
  getMedianDataSource,
  getMeanDataSorce,
} from "./utils";

function App() {
  const [flavanoidsDataSource, setFlevanoidsDataSource] = useState<any>([]);
  const [gammaDataSource, setGammaDataSource] = useState<any>([]);
  const [columnConfig, setColumnConfig] = useState<IColumn<IRecords>[]>([]);
  // const [isLoadingData, setIsLoading] = useState(false);

  const augmentAndSetColumnConfig = (
    groupedData: Record<string, IDataSet[]>
  ) => {
    const columnConfig: IColumn<IRecords>[] = [
      {
        name: "Measure",
        render: (data) => {
          return <div>{data?.value || ""}</div>;
        },
        width: 110,
      },
    ];

    Object.keys(groupedData).map((column) => {
      columnConfig.push({
        name: `Class ${column}`,
        render: (data) => {
          return <div>{data?.value || ""}</div>;
        },
        width: 150,
      });
    });

    setColumnConfig(columnConfig);
  };

  const getGroupedDataBasedonTheClass = (TestData) => {
    //Based on Class in data set method will group things and return the dictionary
    return TestData.reduce((accumulator: any, currentValue) => {
      //calculating the gamma property while grouping things so one more time don't have to loop throw the entire data set
      currentValue.Gamma = calculateGammaProperty(
        Number(currentValue.Ash), // some of the record are in string format that is why converting it to number
        currentValue.Hue,
        currentValue.Magnesium
      );

      if (accumulator[currentValue.Alcohol]) {
        accumulator[currentValue.Alcohol].push(currentValue);
      } else {
        accumulator[currentValue.Alcohol] = [currentValue];
      }
      return accumulator;
    }, {});
  };

  const getDataSourceForFalavnoids = (groupedData, property) => {
    if (property === Property.Flavanoids) {
      return [
        {
          columnRecords: getMeanDataSorce(groupedData, Property.Flavanoids),
        },
        {
          columnRecords: getMedianDataSource(groupedData, Property.Flavanoids),
        },
        {
          columnRecords: getModeDataSource(groupedData, Property.Flavanoids),
        },
      ];
    }
    return [
      {
        columnRecords: getMeanDataSorce(groupedData, Property.Gamma),
      },
      {
        columnRecords: getMedianDataSource(groupedData, Property.Gamma),
      },
      {
        columnRecords: getModeDataSource(groupedData, Property.Gamma),
      },
    ];
  };

  useEffect(() => {
    // take the data set from api
    (async () => {
      try {
        // setIsLoading(true)
        // const TestData = await fetch("/WineURlDataSet/Get", {});
        // setIsLoading(false)
        // Till the dataSet is coming from API will show Shimmer Component
        // instated of showing blank in place of grid.

        const groupedData = getGroupedDataBasedonTheClass(TestData);
        console.log("groupData", groupedData);
        augmentAndSetColumnConfig(groupedData);
        setFlevanoidsDataSource(
          getDataSourceForFalavnoids(groupedData, Property.Flavanoids)
        );
        setGammaDataSource(
          getDataSourceForFalavnoids(groupedData, Property.Gamma)
        );
      } catch (exception) {
        // logger.error({messgae:"error"},exception);
        // alert("Something went wrong");
        console.log("exception in useEffect:App.tsx", exception);
      } finally {
        // setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="App">
      <h2>ManuFac Assignment:</h2>
      {/* {
        isLoadingData ? <GridShimmer rows={5} columns={4}> : <Grid<IRecords> columnConfig={columnConfig} dataSource={dataSource}>
      } */}
      <h3>Flevanoid useCase:</h3>
      <Grid<IRecords>
        columnConfig={columnConfig}
        dataSource={flavanoidsDataSource}
      />
      <h3>Gamma useCase:</h3>
      <Grid<IRecords>
        columnConfig={columnConfig}
        dataSource={gammaDataSource}
      />
    </div>
  );
}

export default App;
