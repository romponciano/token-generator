import React, { MouseEvent } from 'react'
import styled from 'styled-components'

const IconButton: React.FC<{
    label?: string,
    iconClass: string,
    onClick: (event: MouseEvent) => unknown
    buttonClass?: string
}> = ({ label, iconClass, onClick, buttonClass }): JSX.Element => {
    return (
        <StyledButton 
            type="button" 
            onClick={onClick}
            className={buttonClass ? buttonClass : "btn btn-primary"}
        >
            <i className={iconClass} />{label}
        </StyledButton>
    )
}

export default IconButton

const StyledButton = styled.button`
    i {
        margin-right: 10px;
    }
`
