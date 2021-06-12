import React from 'react'
import styled from 'styled-components'

const ActionIcon: React.FC<{
    className: string,
    onClick: () => unknown
}> = ({className, onClick}) => {
    return (
        <StyledIcon onClick={onClick}>
            <i className={className} />
        </StyledIcon>
    )
}

export default ActionIcon

const StyledIcon = styled.span`
    i {
        cursor: pointer;
    }
`
