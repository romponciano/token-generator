import React, { MouseEvent } from 'react'
import styled from 'styled-components'

const IconButton: React.FC<{
    label?: string,
    iconClass: string,
    onClick: (event: MouseEvent) => unknown
    buttonClass?: string
}> = ({ label, iconClass, onClick, buttonClass }): JSX.Element => {

    const labelMargin = label ? 'with-margin' : ''

    return (
        <StyledButton 
            type="button" 
            onClick={onClick}
            className={buttonClass ? buttonClass : "btn btn-primary"}
        >
            <i className={`${iconClass} ${labelMargin}`} />{label}
        </StyledButton>
    )
}

export default IconButton

const StyledButton = styled.button`
    .with-margin {
        margin-right: 10px;
    }
`
