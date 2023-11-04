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
import PrivateRoute from './components/routing/PrivateRoute'
import AdminRoute from './components/routing/AdminRoute'
import App from './App'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/admin/UserListScreen'
import UserEditScreen from './screens/admin/UserEditScreen'
import reportWebVitals from './reportWebVitals'
import FormTestScreen from './screens/admin/FormTestScreen'
import RaceListScreen from './screens/RaceListScreen'
import TitleListScreen from './screens/TitleListScreen'
import StatsScreen from './screens/StatsScreen'
import StravaScreen from './screens/StravaScreen'
import ErrorScreen from './screens/ErrorScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorScreen />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/races' element={<RaceListScreen />} />
      <Route path='/titles' element={<TitleListScreen />} />
      <Route path='/stats' element={<StatsScreen />} />
      <Route path='/strava' element={<StravaScreen />} />

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
