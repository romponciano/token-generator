import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MODEL_API from "../../api/models"
import AddButton from "../../components/add-buton"
import { useHistory } from 'react-router-dom'

const ModelList: React.FC<{session: ISession}> = ({session}): JSX.Element => {

    const [models, setModels] = useState<Map<string, IModel>>()
    const [error, setError] = useState<string>()

    const history = useHistory()

    useEffect(() => {
        setModelsFromLoggedUser()
    }, [])

    const setModelsFromLoggedUser = async () => {
        const m = await MODEL_API
            .models(session.username)
            .then(v => v)
            .catch(e => setError(`Can't retrieve your models`))
        setModels(m)
    }

    return (
        <>
        <ActionList>
            <AddButton onClick={() => history.push("/create-model")} text={"Create new model"} />
        </ActionList>
        <div className="card-group">
            {models && Object.entries(models).map(model => {
                const modelName = model[0]
                return (
                    <Card className="card">
                        <img className="card-img-top" src="https://e1.pngegg.com/pngimages/671/678/png-clipart-one-piece-jolly-roger-dock-and-folder-icons-by-luffy-jolly-roger-straw-hat-pirates-logo-thumbnail.png" alt={modelName} />
                        <div className="card-body">
                            <h5 className="card-title">{modelName}</h5>
                            <CardText className="card-text">
                                <button type="button" className="btn btn-primary">
                                    Access tokens
                                </button>
                                <button type="button" className="btn btn-secondary">
                                    Edit model
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
    max-width: 300px;
    min-width: 300px;
`

const CardText = styled.div`
    text-align: center;

    button {
        margin-right: 15px;
    }
`
