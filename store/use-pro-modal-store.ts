import { create } from 'zustand'

interface useProModalState {
  isOpen: boolean
}

interface useProModalStoreActions {
  onOpen: () => void
  onClose: () => void
}

const useProModalStoreInitialState: useProModalState = {
  isOpen: false
}

export const useProModalStore = create<useProModalState & useProModalStoreActions>((set) => ({
  ...useProModalStoreInitialState,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
