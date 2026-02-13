// src/context/SceneObjectContext.jsx
import React, { createContext, useContext, useState } from "react";

const SceneObjectContext = createContext(null);

export const SceneObjectProvider = ({ children }) => {
  const [activeObjectKey, setActiveObjectKey] = useState("PETROL_PUMP");

  const showPetrolPump = () => setActiveObjectKey("PETROL_PUMP");
  const showCoffee = () => setActiveObjectKey("COFFEE");
  const showOnNext = () => setActiveObjectKey("ON_NEXT");

  return (
    <SceneObjectContext.Provider
      value={{
        activeObjectKey,
        showPetrolPump,
        showCoffee,
        showOnNext,
      }}
    >
      {children}
    </SceneObjectContext.Provider>
  );
};

export const useSceneObject = () => {
  const context = useContext(SceneObjectContext);
  if (!context) {
    throw new Error(
      "useSceneObject must be used within SceneObjectProvider"
    );
  }
  return context;
};
