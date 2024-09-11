import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from './services/UserService'
import * as ProductService from './services/ProductService'
import * as CategoryProductService from './services/CategoryProductService'
import { jwtDecode } from 'jwt-decode'
import { resetUser, updateUser } from './redux/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  /*eslint-disable*/
  useEffect(() => {
    const {decoded, storageData} = handleDecode()
    if(decoded?.id){
      handleGetDetailUser(decoded?.id, storageData)
    }
  }, [])
  /*eslint-enable*/

  const handleDecode = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = '';
    if (storageData) {
      try {
        decoded = jwtDecode(storageData);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('access_token');
      }
    }
    return { decoded, storageData };
  };

  const registerInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use(async (config) => {
      let currentTime = new Date().getTime() / 1000; // Đổi sang giây
      const { decoded, storageData } = handleDecode();
  
      if (decoded && decoded.exp < currentTime) {
        try {
          const res = await UserService.refreshToken();
          if (res.status === 'ERROR') {
            dispatch(resetUser());
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token'); // Nếu có lưu refresh token
            window.location.href = '/';
            return Promise.reject('Session expired, please log in again.');
          }
  
          const newToken = res.token;
          localStorage.setItem('access_token', newToken); // Cập nhật access token mới
          config.headers['access_token'] = `Bearer ${newToken}`;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          dispatch(resetUser());
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/'; 
          return Promise.reject(error);
        }
      } else {
        config.headers['access_token'] = `Bearer ${storageData}`; // Sử dụng access token hiện tại nếu chưa hết hạn
      }
  
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  };

  
  // Đăng ký interceptor cho tất cả các instance của Axios
  registerInterceptors(UserService.axiosJWT);
  registerInterceptors(ProductService.axiosJWT);
  registerInterceptors(CategoryProductService.axiosJWT);


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
            const isCheckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              isCheckAuth ? (
                <Route key = {route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                }></Route>
              ) : null
            )
          }))}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
