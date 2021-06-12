import React from 'react'
import styled from 'styled-components'

const FinishButtons: React.FC<{
    confirm: { label: string, disabled: boolean, onClick: () => unknown, class?: string},
    cancel: { label: string, disabled: boolean, onClick: () => unknown, class?: string},
    groupStyle?: string
}> = ({confirm, cancel, groupStyle}) => {

    return (
        <GroupStyle className={groupStyle ? groupStyle : ""}>
            <button type="button" 
                disabled={confirm.disabled} 
                className={confirm.class ? confirm.class : "btn btn-primary"}
                onClick={confirm.onClick}
            >
                {confirm.label}
            </button>
            <button type="button" 
                disabled={cancel.disabled}
                className={cancel.class ? cancel.class : "btn btn-secondary space"}
                onClick={cancel.onClick}
            >
                {cancel.label}
            </button>
        </GroupStyle>
    )
}

export default FinishButtons

const GroupStyle = styled.div`
    margin-top: 10px;
    float: right;

    .space {
        margin-left: 8px;
    }
`
