import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'

function App() {

  useEffect(() => {
    fetchApi()
  }, [])

  const fetchApi = async () => {
    console.log(process.env)
    console.log("process.env.REACT_APP_API_KEY", process.env.REACT_APP_API_URL)
    const res = await axios.get(`http://localhost:3001/api/product/list-product`)
    console.log("res", res)
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
