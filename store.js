import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userInfo) => set({ user: userInfo, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      destinations: [],

      addDestination: (destination) =>
        set((state) => ({
          destinations: [...state.destinations, destination],
        })),

      removeDestination: (destinationId) =>
        set((state) => ({
          destinations: state.destinations.filter(
            (destination) => destination.id !== destinationId
          ),
        })),

      // Add new function to clear all destinations
      clearDestinations: () => set({ destinations: [] }),
    }),
    {
      name: "travel-app-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        destinations: state.destinations,
      }),
    }
  )
);

export default useStore;
