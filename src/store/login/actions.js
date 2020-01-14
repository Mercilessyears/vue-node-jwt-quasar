import { getUsers } from '../../requests/api'
// import { Notify } from 'quasar'

// eslint-disable-next-line camelcase
export function set_user ({ commit }) {
  return new Promise((resolve, reject) => {
    getUsers().then((res) => {
      if (res.data.code === 200) {
        commit('SET_USER', res.data.data)
        resolve(true)
      } else {
        reject(false)
      }
    }).catch((err) => {
      reject(err)
    })
  })
//   const res = await getUsers().catch()
//   if (res.data.code === 200) {
//     commit('SET_USER', res.data.data)
//   }
}
