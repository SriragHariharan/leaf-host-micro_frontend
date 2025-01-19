import { create } from 'zustand';

const useGlobalStore = create((set) => {
  // Helper function to get initial state from localStorage
  const getInitialState = () => {
    return {
      username: localStorage.getItem('username') || null,
      profilePic: localStorage.getItem('profilePic') || null,
      accessToken: localStorage.getItem('accessToken') || null,
      refreshToken: localStorage.getItem('refreshToken') || null,
    };
  };

  const initialState = getInitialState();

  return {
    ...initialState,
    setAccessToken: (axt) => {
      localStorage.setItem('accessToken', axt);
      set({ accessToken: axt });
    },
    setRefreshToken: (rft) => {
      localStorage.setItem('refreshToken', rft);
      set({ refreshToken: rft });
    },
    setUsername: (username) => {
      localStorage.setItem('username', username);
      set({ username });
    },
    setProfilePic: (dp) => {
      localStorage.setItem('profilePic', dp);
      set({ profilePic: dp });
    },
    logout: () => {
      localStorage.clear();
      set({
        username: null,
        profilePic: null,
        accessToken: null,
        refreshToken: null,
      });
    },
  };
});

export default useGlobalStore;
