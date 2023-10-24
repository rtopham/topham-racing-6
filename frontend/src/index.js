import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
//Use following for default Bootstrap styles
//import 'bootstrap/dist/css/bootstrap.min.css'
//Use following for custom Bootstrap styles
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import App from './App'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/admin/UserListScreen'
import UserEditScreen from './screens/admin/UserEditScreen'
import reportWebVitals from './reportWebVitals'
import FormTestScreen from './screens/admin/FormTestScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/formtest' element={<FormTestScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
