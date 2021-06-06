import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import CreateModel from './model/create-model'
import Login from './login/login'
import useSession from '../hooks/useSession'
import ModelList from './model/model-list'
import Navbar from './navbar'

const App = () => {

    const { session, setSession } = useSession()

    if(!session) {
        return <Login setSession={setSession} />
    }

    return (
        <>
        <Navbar session={session} setSession={setSession} />
        <BaseLayout>
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path='/'>
                        <ModelList session={session} />
                    </Route>
                    <Route path='/create-model'>
                        <CreateModel session={session} />
                    </Route>
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
