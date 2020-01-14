export function SET_USER (state, user) {
  state.isLogin = true
  state.userInfo = user
  localStorage.setItem('userInfo', JSON.stringify(user))
}
