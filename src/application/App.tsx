import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import CreateModel from './model/create-model'
import Login from './login/login'
import useSession from '../hooks/useSession'
import ModelList from './model/model-list'
import Navbar from './navbar/navbar'
import ProfileSettings from '../application/navbar/profile-settings'

const App = () => {

    const { session, setSession } = useSession()

    if(!session) {
        return <Login setSession={setSession} />
    }

    return (
        <>
        <BaseLayout>
            <BrowserRouter>
                    <Switch>
                        <Route 
                            path="/" 
                            render={({ match: { url} }) => {
                                return (
                                    <>
                                        <Navbar session={session} setSession={setSession} />

                                        <Route exact path={`/`}>
                                            <ModelList session={session} />
                                        </Route>

                                        <Route exact path={`/create-model`}>
                                            <CreateModel session={session} />
                                        </Route>
                                        
                                        <Route exact path={`/profile`}>
                                            <ProfileSettings session={session} setSession={setSession} />
                                        </Route>
                                    </>
                                )
                            }} />
                    </Switch>
            </BrowserRouter>
        </BaseLayout>
        </>
    )
}

export default App

const BaseLayout = styled.div`
    margin: 65px 25px 25px 25px;
`
