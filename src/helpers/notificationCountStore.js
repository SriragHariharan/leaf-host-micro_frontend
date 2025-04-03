import { create } from 'zustand';

const useNotificationStore = create((set, get) => {
  // Helper function to get initial state from localStorage
  const getInitialState = () => {
    return {
      notificationsCount: localStorage.getItem('Leaf:notificationsCount') || 0,
      friendRequestsCount: localStorage.getItem('Leaf:friendRequestCount') || 0,
    };
  };

  const initialState = getInitialState();

  return {
    ...initialState,
    increaseNotificationsCount: () => {
      set((state) => ({ notificationsCount: parseInt(state.notificationsCount) + 1 }));
      const newState = get();
      localStorage.setItem('Leaf:notificationsCount', newState.notificationsCount);
    },
    resetNotificationsCount: () => {
      set({ notificationsCount: 0 });
      localStorage.setItem('Leaf:notificationsCount', 0);
    },
    setNotificationsCount: (count) => {
      set({ notificationsCount: Number(count) });
      localStorage.setItem('Leaf:notificationsCount', count);
    },
    increaseFriendRequestsCount: () => {
      set((state) => ({ friendRequestsCount: parseInt(state.friendRequestsCount) + 1 }));
      const newState = get();
      localStorage.setItem('Leaf:friendRequestCount', newState.friendRequestsCount);
    },
    resetFriendRequestsCount: () => {
      set({ friendRequestsCount: 0 });
      localStorage.setItem('Leaf:friendRequestCount', 0);
    },
  };
});

export default useNotificationStore;