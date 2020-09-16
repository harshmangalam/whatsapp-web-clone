import React, { useEffect, lazy, Suspense } from 'react'

import { Switch, BrowserRouter, Route, useHistory } from 'react-router-dom'
import './main.css'
import { UIProvider } from './context/UI'
import { UserProvider } from './context/User'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))

function App() {
  return (
    <UserProvider>
      <UIProvider>
        <BrowserRouter>
          <div
            style={{
              maxWidth: '100vw',
              maxHeight: '100vh',
              overflow: 'hidden',
            }}
          >
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/chat" component={Chat} />
              </Switch>
            </Suspense>
          </div>
        </BrowserRouter>
      </UIProvider>
    </UserProvider>
  )
}

export default App

//https://web.whatsapp.com//img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg
