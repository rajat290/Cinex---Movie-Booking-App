import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocationState {
  location: string | null
  detectedLocationName: string | null
  setLocation: (location: string) => void
  setDetectedLocationName: (name: string) => void
  clearLocation: () => void
  clearDetectedLocationName: () => void
}

export const useLocationStore = create(
  persist<LocationState>(
    (set) => ({
      location: null,
      detectedLocationName: null,
      setLocation: (location) => set({ location }),
      setDetectedLocationName: (name) => set({ detectedLocationName: name }),
      clearLocation: () => set({ location: null }),
      clearDetectedLocationName: () => set({ detectedLocationName: null }),
    }),
    {
      name: 'location-storage',
    }
  )
)
