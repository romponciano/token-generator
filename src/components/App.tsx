import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import CreateForm from './create-form'
import Login from './login'
import useSession from '../hooks/useSession'

const App = () => {

    const { session, setSession } = useSession()

    if(!session) {
        return <Login setSession={setSession} />
    }

    return (
        <BaseLayout>
            <BrowserRouter>
                <Switch>
                    <Route path='/forms/'>
                        <CreateForm />
                    </Route>
                </Switch>
            </BrowserRouter>
        </BaseLayout>
    )
}

export default App

const BaseLayout = styled.div`
    margin: 25px;
`
