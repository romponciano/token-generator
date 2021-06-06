import React from 'react'
import styled from 'styled-components'

const ErrorMessage: React.FC<{errorMessage: String}> = ({errorMessage}): JSX.Element => {
    return (
        <>
            {errorMessage ? <Message>{errorMessage}</Message> : null}
        </>
    )
}

export default ErrorMessage

const Message = styled.p`
    color: red;
`
