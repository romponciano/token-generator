import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import EditModel from './model/edit'
import Login from './login'
import useSession from '../hooks/useSession'
import ModelList from './model/list'
import Navbar from './navbar/navbar'
import useModel from '../hooks/useModel'
import MODEL_API from '../api/models'

const App = () => {

    const { session, setSession } = useSession()
    const { models, setModels } = useModel()

    if(!session) {
        return <Login setSession={setSession} />
    } else {
        MODEL_API.models(session.id)
        .then(resp => {
            if(resp) setModels(resp)
        })
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
                                            <EditModel session={session} />
                                        </Route>

                                        {models.map(m => {
                                            return (
                                                <Route exact path={`/model/${m.id}`}>
                                                    <EditModel session={session} model={m} />
                                                </Route>
                                            )
                                        })}
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
