import React, { createContext, useContext, useState } from "react";

interface DataContextType {
  gavetaData: any;
  setGavetaData: (data: any) => void;
}

const defaultGavetaData = {
  labels: ["Posição Atual"],
  datasets: [
    {
      data: [0, 100], // Valores padrão
      backgroundColor: ["#00C49F", "#EAEAEA"],
    },
  ],
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gavetaData, setGavetaData] = useState(defaultGavetaData);

  return (
    <DataContext.Provider value={{ gavetaData, setGavetaData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
