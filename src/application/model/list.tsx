import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MODEL_API from "../../api/models"
import { useHistory } from 'react-router-dom'
import { NotificationMessage, NOTIFICATION_TYPE } from "../../components/notification"
import IconButton from "../../components/icon-button"
import { NOT_FOUND_HTTP, NO_IMAGE } from "../../utils"
import Modal from "../../components/modal"
import LoadingButton from "../../components/loading-button"

const ModelList: React.FC<{session: ISession}> = ({session}): JSX.Element => {

    const [models, setModels] = useState<Map<string, IModel>>()
    const [notification, setNotification] = useState<{msg: string, type: string}>({ msg: undefined, type: NOTIFICATION_TYPE.DANGER })
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const [selectedModel, setSelectedModel] = useState<string>()

    const history = useHistory()

    useEffect(() => {
        loadModelsFromLoggedUser()
    }, [])

    const loadModelsFromLoggedUser = () => {
        MODEL_API
            .models(session.id)
            .then(response => {
                if(response == NOT_FOUND_HTTP) setModels(undefined)
                else setModels(response)
            })
            .catch(e => setNotification({msg: `Can't retrieve your models`, type: NOTIFICATION_TYPE.DANGER}))
    }

    const removeModel = () => {
        MODEL_API
            .delete(selectedModel)
            .then(() => {
                console.log('Models antigo: ', models)
                const newMap = new Map(models)
                newMap.delete(selectedModel)
                console.log('Models novo: ', newMap)
                setModels(newMap)
                setNotification({msg: "Model deleted successfully o/", type: NOTIFICATION_TYPE.SUCCESS})
            })
            .catch(() => {
                setNotification({msg: "I'm sorry. Can't delete your model now :'(", type: NOTIFICATION_TYPE.DANGER})
            })
    }

    if(!models) {
        return (
            <div style={{ "textAlign": "center" }}>
                <i className="fas fa-dice-d20 fa-10x" />
                <h3>You don't have any model yet</h3>

                <br/>
                <br/>

                <IconButton onClick={() => history.push("/create-model")} label={"Create new model"} iconClass={"fas fa-plus-circle"} />
            </div>
        )
    }

    return (
        <>
            <NotificationMessage message={notification.msg} setMessage={(value) => setNotification({msg: value, type: notification.type})} type={notification.type} />

            <Modal 
                show={confirmDelete}
                setShow={setConfirmDelete}
                title={<p>Delete Confirmation</p>}
                body={<p>Do you really want to delete this model and all the tokens associate with it? This action can't be undone.</p>}
                footer={
                    <>
                        <LoadingButton
                            className="btn btn-danger" 
                            onClick={() => {
                                return new Promise<void>((resolve, reject) => {
                                    try {
                                        removeModel()
                                        setConfirmDelete(false)
                                        setSelectedModel(undefined)
                                        resolve()
                                    } catch(e) {
                                        reject()
                                    }
                                })
                            }}
                            label="Confirm"
                        />
                        <button type="button" 
                            className="btn btn-secondary" 
                            onClick={() => {
                                setConfirmDelete(false)
                                setSelectedModel(undefined)
                            }}>Cancel</button>
                    </>
                }
            />
            
            <ActionList>
                <IconButton onClick={() => history.push("/create-model")} label={"Create new model"} iconClass={"fas fa-plus-circle"} />
            </ActionList>

            <div className="card-group">
                {models && Object.entries(models).map(model => {
                    const m: IModel = model[1]
                    const modelName = m.name
                    const modelImage = m.image
                    return (
                        <Card className="card" key={modelName}>
                            <img 
                                className="card-img-top" 
                                src={modelImage ? modelImage : NO_IMAGE} 
                                alt={modelName} 
                                width="250px" 
                                height="250px"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{modelName}</h5>
                                <CardText className="card-text">
                                    <IconButton 
                                        label={"Tokens"} 
                                        iconClass={"fas fa-book-open"} 
                                        onClick={undefined}
                                    />
                                    <div className="model-actions">
                                        <IconButton 
                                            label={"Model"} 
                                            iconClass={"far fa-edit"} 
                                            buttonClass={"btn btn-secondary"}
                                            onClick={() => history.push(`/model/${m.id}`)}
                                        />
                                        <IconButton 
                                            iconClass={"fas fa-trash"} 
                                            buttonClass={"btn btn-danger"}
                                            onClick={() => {
                                                setSelectedModel(m.id)
                                                setConfirmDelete(true)
                                            }}
                                        />
                                    </div>
                                </CardText>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default ModelList

const ActionList = styled.div`
    margin-bottom: 15px;
`

const Card = styled.div`
    max-width: 300px;
    min-width: 300px;
`

const CardText = styled.div`
    .model-actions {
        float: right;
    }
`
