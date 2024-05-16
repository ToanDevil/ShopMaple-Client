import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { useDispatch } from 'react-redux'
import * as UserService from './services/UserService'
import { jwtDecode } from 'jwt-decode'
import { updateUser } from './redux/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  /*eslint-disable*/
  useEffect(() => {
    const {decoded, storageData} = handleDecode()
    if(decoded?.id){
        handleGetDetailUser(decoded?.id, storageData)
    }
  }, [])
  /*eslint-enable*/

  const handleDecode = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = ''
    if(storageData){
      decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => { // làm mới access-token khi hết hạn
    // Do something before request is sent
    const currentTime = new Date()
    const {decoded} = handleDecode()
    console.log(decoded)
    if(decoded?.exp < currentTime.getTime()/1000){
      const access_token = await UserService.refreshToken()
      console.log("access_token_new", access_token)
      config.headers['access_token'] = `Bearer ${access_token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
    console.log('res', res)
  }

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route =>{
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key = {route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              }></Route>
            )
          }))}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
