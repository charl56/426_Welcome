import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [positionData, setPositionData] = useState({});

  const value = {
    videoUrl,
    setVideoUrl,
    positionData,
    setPositionData,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => useContext(PlayerContext);