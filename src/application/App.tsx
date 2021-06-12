import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import CreateModel from './model/create-model'
import Login from './login'
import useSession from '../hooks/useSession'
import ModelList from './model/model-list'
import Navbar from './navbar/navbar'
import ProfileSettings from './profile-settings/profile-settings'

const App = () => {

    const { session, setSession } = useSession()

    if(!session) {
        return <Login setSession={setSession} />
    }

    return (
        <>
        <BaseLayout>
            <HashRouter>
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
            </HashRouter>
        </BaseLayout>
        </>
    )
}

export default App

const BaseLayout = styled.div`
    margin: 65px 25px 25px 25px;
`
