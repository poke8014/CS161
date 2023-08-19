import React, { createContext, useState, useEffect } from 'react';

export const FileContext = createContext();

export function FileProvider({ children }) {
  const [fileData, setFileData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioID, setAudioID] = useState(null);

  useEffect(() => {
    return () => {
      localStorage.removeItem("audioID");
    };
  }, []);

  return (
    <FileContext.Provider value={{ fileData, setFileData, selectedFile, setSelectedFile, audioID, setAudioID }}>
      {children}
    </FileContext.Provider>
  );
}
