import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MODEL_API from '../../api/models'
import IconButton from '../../components/icon-button'
import { NotificationMessage } from '../../components/notification'
import { TEXT_TYPE } from '../../utils'

const EditModel: React.FC<{ session: ISession, model?: IModel }> = ({session, model}) => {

    console.log('models: ', model)

    const createNewField = (): IField => {
        return {name: undefined, type: TEXT_TYPE.SMALL_TEXT, value: undefined}
    }

    useEffect(() => {
        console.log('models: ', model)
        console.log('fields: ', fields)
    }, [])
    
    const [fields, setFields] = useState<IField[]>(model?.fields)
    const [modelName, setModelName] = useState<string>(model?.name)

    const createSelectOptions = () => {
        return (
            Object.values(TEXT_TYPE).map(val => {
                return <option value={val}>{val}</option>
            })
        )
    }

    const appendNewField = () => {
        const newFields = [...fields]
        newFields.push(createNewField())
        setFields([...newFields])
    }

    const [notification, setNotification] = useState<{type: string, msg: string}>(undefined)

    const updateModel = () => {
        const validFields = fields.filter(f => f.name && f.name != "")
        const newModel: IModel = { id: model?.id, userId: session.id, name: modelName, fields: validFields }
        MODEL_API.save(newModel)
            .then(res => {
                console.log(res)
            })
    }

    return (
        <>
            <NotificationMessage 
                message={notification?.msg} 
                setMessage={(value: string) => setNotification({type: notification?.type, msg: value})}
                type={notification?.type}
            />

            <ActionButtons>
                <button 
                    disabled={modelName == undefined || modelName == ''} 
                    type="button" 
                    className="btn btn-success" 
                    onClick={() => updateModel()}
                >
                    Save
                </button>
                <IconButton iconClass={"fas fa-plus-circle"} label={"Add Field"} onClick={() => appendNewField()} />
            </ActionButtons>
            <br/>
            
            <div className="form-row">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Model Name</div>
                    </div>
                    <input type="text" className="form-control" placeholder="Model name" onChange={e => setModelName(e.target.value)} />
                </div>
            </div>

            <div className="card-group">
                {fields.map(field => {
                    return (
                        <Card className="card">
                            <div className="card-body">
                                <input type="text" className="form-control" placeholder="Field name" value={field.name} onChange={e => field.name = e.target.value} />
                            
                                <select className="form-select" defaultValue={field.type} onChange={e => field.type = e.target.value}>
                                    {createSelectOptions()}
                                </select>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default EditModel

const ActionButtons = styled.div`
    button {
        margin-right: 10px; 
    }
`

const Card = styled.div`
    min-width: 210px;
`
