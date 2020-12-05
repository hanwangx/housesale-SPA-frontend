import React from 'react'
import { Layout } from 'antd'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/nav'
import Home from './components/home'
import Account from './components/account'
import Item from './components/item'
import Register from './components/register'
import Login from './components/login'

import UserContext from './contexts/user'

const { Header, Content, Footer } = Layout

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (error) {
    return {}
  }
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getUser()
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login(user) {
    console.log('User is now being set on the context')
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('token', user.toen)
    user.loggedIn = true
    this.setState({ user: user })
  }

  logout() {
    window.localStorage.setItem('user', '')
    window.localStorage.setItem('token', '')
    console.log('Removing user from the app context')
    this.setState({ user: {} })
    window.location.href = '/login'
  }

  render() {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    }

    return (
      <UserContext.Provider value={context}>
        <Router>
          <Header>
            <Nav />
          </Header>

          <Content>
            <Switch>
              <Route path="/account" children={<Account />} />
              <Route path="/register" children={<Register />} />
              <Route path="/login" children={<Login />} />
              <Route path="/items/:id" children={<Item />} />
              <Route path="/" children={<Home />} exact />
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Created By Han Wang 9987188
          </Footer>
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App
