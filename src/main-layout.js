import React from 'react'
import styled from 'styled-components'
import CreateForm from './create-form'

const MainLayout = () => {
    return (
        <BaseLayout>
            <CreateForm />
        </BaseLayout>
    )
}

export default MainLayout

const BaseLayout = styled.div`
    margin: 25px;
`
