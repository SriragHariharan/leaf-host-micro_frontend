import { create } from 'zustand';

const useGlobalStore = create((set) => {
  // Helper function to get initial state from localStorage
  const getInitialState = () => {
    return {
      username: localStorage.getItem('Leaf:username') || null,
      profilePic: localStorage.getItem('Leaf:profilePic') || null,
      accessToken: localStorage.getItem('Leaf:accessToken') || null,
      refreshToken: localStorage.getItem('Leaf:refreshToken') || null,
    };
  };

  const initialState = getInitialState();

  return {
    ...initialState,
    setAccessToken: (axt) => {
      localStorage.setItem('Leaf:accessToken', axt);
      set({ accessToken: axt });
    },
    setRefreshToken: (rft) => {
      localStorage.setItem('Leaf:refreshToken', rft);
      set({ refreshToken: rft });
    },
    setUsername: (username) => {
      localStorage.setItem('Leaf:username', username);
      set({ username });
    },
    setProfilePic: (dp) => {
      localStorage.setItem('Leaf:profilePic', dp);
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
