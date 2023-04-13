import React, { createContext, useState } from 'react';

export const FileContext = createContext();

export function FileProvider({ children }) {
  const [fileData, setFileData] = useState(null);

  return (
    <FileContext.Provider value={{ fileData, setFileData }}>
      {children}
    </FileContext.Provider>
  );
}
