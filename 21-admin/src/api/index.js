import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

axios.interceptors.request.use(function (config) {
  console.log(config)
  let mytoken = localStorage.getItem('mytoken') || ''
  if (mytoken) {
    config.headers['Authorization'] = mytoken
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export const handleLogin = obj => axios.post('/login', obj).then(res => res.data)
export const getUserList = obj => axios.get('/users', {params: obj}).then(res => res.data)
export const deleteUser = id => axios.delete(`/users/${id}`).then(res => res.data)
export const addUser = obj => axios.post('/users', obj).then(res => res.data)
export const toggleState = obj => axios.put(`/users/${obj.uId}/state/${obj.type}`).then(res => res.data)
export const editUser = obj => axios.put(`/users/${obj.id}`, obj).then(res => res.data)
export const getRoleList = () => axios.get('/roles').then(res => res.data)
export const grant = obj => axios.put(`users/${obj.id}/role`, {rid: obj.rid}).then(res => res.data)
export const rightsList = type => axios.get(`/rights/${type}`).then(res => res.data)
export const getMenuList = () => axios.get('/menus').then(res => res.data)
export const getCategories = num => axios.get('/categories', {type: num}).then(res => res.data)
export const deleteRoleRight = (roleId, rightId) => axios.delete(`roles/${roleId}/rights/${rightId}`).then(res => res.data)
