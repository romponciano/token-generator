import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MODEL_API from "../../api/models"
import AddButton from "../../components/add-buton"
import { useHistory } from 'react-router-dom'
import { NotificationMessage, NOTIFICATION_TYPE } from "../../components/notification"

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
                <AddButton onClick={() => history.push("/create-model")} text={"Create new model"} />
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
                                    <button type="button" className="btn btn-primary">
                                        <i className="fas fa-book-open" />Tokens
                                    </button>
                                    <button type="button" className="btn btn-secondary">
                                        <i className="far fa-edit" />Model
                                    </button>
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

    i {
        margin-right: 10px;
    }
`

const CardText = styled.div`
    text-align: center;
    display: ruby;

    .btn-primary {
        margin-right: 15px;
    }
`
