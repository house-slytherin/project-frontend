/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import TasksShow from './components/Tasks/TasksShow'
import TaskCreate from './components/Tasks/TaskCreate'
import TaskUpdate from './components/Tasks/TaskUpdate'
import TaskHome from './components/Tasks/TaskHome'
import TaskDelete from './components/Tasks/TaskDelete'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <div className="grid-container">
          <Header user={user} />
	      {msgAlerts.map((msgAlert) => (
            <AutoDismissAlert
              key={msgAlert.id}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
              id={msgAlert.id}
              deleteAlert={this.deleteAlert}
            />
          ))}
	      <main className='container'>

	        <Route
              exact path='/'
              render={() => (
                <TaskHome user={user}/>
              )}
            />
	        <Route
              path='/sign-up'
              render={() => (
                <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
              )}
            />
            <Route
              path='/sign-in'
              render={() => (
                <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
              )}
            />
            <AuthenticatedRoute
              user={user}
              path='/sign-out'
              render={() => (
                <SignOut
                  msgAlert={this.msgAlert}
                  clearUser={this.clearUser}
                  user={user}
                />
              )}
            />
            <AuthenticatedRoute
              user={user}
              path='/change-password'
              render={() => (
                <ChangePassword msgAlert={this.msgAlert} user={user} />
              )}
            />
            <Switch>
              <AuthenticatedRoute
                user={user}
                path='/tasks/create'
                render={() => (
                  <TaskCreate msgAlert={this.msgAlert} user={user} />
                )}
              />
              <AuthenticatedRoute
                user={user}
                path='/tasks/:id'
                render={() => (
                  <TaskDelete msgAlert={this.msgAlert} user={user} />
                )}
              />

              <AuthenticatedRoute
                user={user}
                path='/tasks'
                render={() => (
                  <TasksShow msgAlert={this.msgAlert} user={user} />
                )}
              />

            </Switch>
            <AuthenticatedRoute
              user={user}
              path='/tasks/:id/edit'
              render={() => (
                <TaskUpdate msgAlert={this.msgAlert} user={user} />
              )}
            />
          </main>

        </div>
      </Fragment>
    )
  }
}

export default App
