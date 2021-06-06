import React from 'react'

const AddButton: React.FC<{ 
    onClick: () => unknown,
    text?: string
}> = ({onClick, text = ""}): JSX.Element => {
    return (
        <button type="button" className="btn btn-primary" onClick={onClick}>
            <i className="fas fa-plus-circle" />{text}
        </button>
    )
}

export default AddButton
