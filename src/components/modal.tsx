import React, { useState } from 'react'
import styled from 'styled-components'
import ActionIcon from './action-icon'

const Modal: React.FC<{
    show: boolean,
    setShow: (value: boolean) => void,
    title: JSX.Element,
    body: JSX.Element,
    footer?: JSX.Element
}> = ({show, setShow, title, body, footer}) => {

    return (
        <>
            {show && 
                <StyledModal className="modal" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {title}
                                <ActionIcon
                                    className="close fas fa-times fa-lg" 
                                    onClick={() => setShow(false)}
                                 />
                            </div>

                            <div className="modal-body">{body}</div>

                            {footer && <div className="modal-footer">{footer}</div>}
                        </div>
                    </div>
                </StyledModal>
            }
        </>
    )
}

export default Modal

const StyledModal = styled.div`
    display: block;
`
