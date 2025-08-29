import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocationState {
  location: string | null
  setLocation: (location: string) => void
  clearLocation: () => void
}

export const useLocationStore = create(
  persist<LocationState>(
    (set) => ({
      location: null,
      setLocation: (location) => set({ location }),
      clearLocation: () => set({ location: null }),
    }),
    {
      name: 'location-storage',
    }
  )
)