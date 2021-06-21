import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MODEL_API from "../../api/models"
import { useHistory } from 'react-router-dom'
import { NotificationMessage, NOTIFICATION_TYPE } from "../../components/notification"
import IconButton from "../../components/icon-button"

const ModelList: React.FC<{session: ISession}> = ({session}): JSX.Element => {

    const [models, setModels] = useState<Map<string, IModel>>()
    const [error, setError] = useState<string>(undefined)

    const history = useHistory()

    useEffect(() => {
        loadModelsFromLoggedUser()
    }, [session])

    const loadModelsFromLoggedUser = async () => {
        const m = await MODEL_API
            .models(session.username)
            .then(v => v)
            .catch(e => setError(`Can't retrieve your models`))
        setModels(m)
    }

    return (
        <>
            <NotificationMessage message={error} setMessage={setError} type={NOTIFICATION_TYPE.DANGER} />
            
            <ActionList>
                <IconButton onClick={() => history.push("/create-model")} label={"Create new model"} iconClass={"fas fa-plus-circle"} />
            </ActionList>

            <div className="card-group">
                {models && Object.entries(models).map(model => {
                    const modelName = model[0]
                    return (
                        <Card className="card" key={modelName}>
                            <img className="card-img-top" src="https://e1.pngegg.com/pngimages/671/678/png-clipart-one-piece-jolly-roger-dock-and-folder-icons-by-luffy-jolly-roger-straw-hat-pirates-logo-thumbnail.png" alt={modelName} />
                            <div className="card-body">
                                <h5 className="card-title">{modelName}</h5>
                                <CardText className="card-text">
                                    <IconButton 
                                        label={"Tokens"} 
                                        iconClass={"fas fa-book-open"} 
                                        onClick={undefined}
                                    />
                                    <IconButton 
                                        label={"Model"} 
                                        iconClass={"far fa-edit"} 
                                        buttonClass={"btn btn-secondary"}
                                        onClick={undefined}
                                    />
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
    max-width: 250px;
    min-width: 250px;
`

const CardText = styled.div`
    text-align: center;
    display: ruby;

    .btn-primary {
        margin-right: 15px;
    }
`
