import { store } from "./store"

export const useHeaderModalOpen = (key: string) => {
  store.headerModal.isModalVisible = true
  store.headerModal.activeTabKey = key
}