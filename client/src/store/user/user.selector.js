export const selectCurrentUser = (state) => state.user.user
export const selectAccessToken = (state) => state.user.accessToken
export const selectUserLocation = (state) => state.user.location
export const selectIsLoading = (state) => state.user.isLoading
export const selectShowSidebar = (state) => state.user.showSidebar
export const selectError = (state) => state.user.error