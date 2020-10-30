import React, {createContext, useState} from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [profile, setProfile] = useState(null);

  const userStore = {
    profile: profile,
    updateProfile: (profile) => {
      setProfile(profile);
    },
  };

  return (
    <StoreContext.Provider value={{profile, setProfile, userStore}}>
      {children}
    </StoreContext.Provider>
  );
};
