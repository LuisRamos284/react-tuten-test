import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { hist } from '../lib/utils/history'
import { LoginPage } from 'views/LoginPage'
import { theme } from 'theme'
import { useStore } from 'lib/State'
import { HomePage } from 'views/HomePage'

export const RootComponent: React.FC<any> = ({ children, props }) => {
  const Store = useStore()

  if (Store.user.email !== '') {
    return (
      <ThemeProvider theme={theme}>
        <Router history={hist}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Redirect from="*" to="/home" />
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Router history={hist}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
