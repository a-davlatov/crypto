import { store } from "./store"

export const useHeaderModalClose = () => {
  store.headerModal.isModalVisible = false
}