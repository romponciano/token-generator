import React from 'react'
import ActionIcon from '../../components/action-icon'
import FinishButtons from '../../components/finish-buttons'
import Modal from '../../components/modal'

const ConfirmationModal: React.FC<{
    showConfirmation: boolean,
    setShowConfirmation: (value: boolean) => void,
    password: string,
    showPassword: boolean,
    setPassword: Function,
    setShowPassword: Function,
    confirmAction: Function
}> = ({
    showConfirmation,
    setShowConfirmation,
    password,
    showPassword,
    setPassword,
    setShowPassword,
    confirmAction
}) => {

    return (
        <Modal 
            show={showConfirmation}
            setShow={setShowConfirmation}
            title={<h5>Type your password to confirm the update</h5>}
            body={
                <div className="input-group">
                    <input 
                        type={showPassword ? "text" : "password"}
                        className="form-control" 
                        placeholder="Password" 
                        onChange={e => setPassword(e.target.value)} 
                    />

                    <span className="input-group-text">
                        <ActionIcon 
                            className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} 
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </span>
                </div>
            }
            footer={
                <FinishButtons 
                    confirm={{
                        label: 'Save',
                        disabled: (password == undefined),
                        onClick: () => confirmAction()
                    }}
                    cancel={{
                        label: 'Cancel',
                        disabled: false,
                        onClick: () => setShowConfirmation(false)
                    }}
                />
            }
        />
    )

}

export default ConfirmationModal
