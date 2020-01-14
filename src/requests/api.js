import fetch from './fetch'

/**
 * 用户登录
 * @param data
 * @returns {AxiosPromise}
 */
export const login = data => {
  return fetch({
    method: 'post',
    url: '/users/login',
    data
  })
}

/**
 * 获取用户基础信息
 */
export const getUsers = () => {
  return fetch({
    method: 'get',
    url: '/users/userInfo'
  })
}
