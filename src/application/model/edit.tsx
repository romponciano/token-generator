import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MODEL_API from '../../api/models'
import IconButton from '../../components/icon-button'
import LoadingButton from '../../components/loading-button'
import { TEXT_TYPE } from '../../utils'

const EditModel: React.FC<{ session: ISession, model?: IModel }> = ({session, model}) => {

    const createNewField = (): IField => {
        return {name: undefined, type: TEXT_TYPE.SMALL_TEXT, value: undefined}
    }
   
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
        const newFields = fields ? [...fields] : []
        newFields.push(createNewField())
        setFields([...newFields])
    }

    const updateModel = () => {
        const validFields = fields.filter(f => f.name && f.name != "")
        const newModel: IModel = { id: model?.id, userId: session.id, name: modelName, fields: validFields }
        MODEL_API
            .save(newModel)
            .then(res => { if(res != 200) throw Error("Can't update :(") })
    }

    const updateField = (name: string, newName: string) => {
        fields.forEach(f => { if(f.name == name) f.name = newName })
        setFields([...fields])
    }

    return (
        <>
            <ActionButtons>
                <IconButton iconClass={"fas fa-arrow-left"} onClick={() => history.back()} />
                <LoadingButton 
                    isDisabled={modelName == undefined || modelName == ''} 
                    className="btn btn-success" 
                    onClick={() => 
                        new Promise<void>((resolve) => {
                            updateModel()
                            resolve()
                        }
                    )}
                    label="Save"
                    success="Model saved successfully \o/"
                    fail="Can't save your model :("
                />
                <IconButton iconClass={"fas fa-plus-circle"} label={"Add Field"} onClick={() => appendNewField()} />
            </ActionButtons>
            <br/>
            
            <div className="form-row">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Model Name</div>
                    </div>
                    <input type="text" className="form-control" placeholder="Model name" value={modelName} onChange={e => setModelName(e.target.value)} />
                </div>
            </div>

            <div className="card-group">
                {fields?.map(field => {
                    return (
                        <Card className="card">
                            <div className="card-body">
                                <input type="text" className="form-control" placeholder="Field name" value={field.name} onChange={e => updateField(field.name, e.target.value)} />
                            
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
