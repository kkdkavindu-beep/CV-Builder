import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  activeTab: string
  isDarkMode: boolean
  showSaved: boolean
  setActiveTab: (tab: string) => void
  toggleDarkMode: () => void
  triggerSaved: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      activeTab: 'personal',
      isDarkMode: false,
      showSaved: false,
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleDarkMode: () => set((state) => {
        const newMode = !state.isDarkMode
        if (newMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { isDarkMode: newMode }
      }),
      triggerSaved: () => {
        set({ showSaved: true })
        setTimeout(() => set({ showSaved: false }), 2000)
      },
    }),
    {
      name: 'cv-ui-storage',
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
      onRehydrateStorage: () => (state) => {
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark')
        }
      },
    }
  )
)
