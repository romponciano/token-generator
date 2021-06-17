import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MODEL_API from '../../api/models'
import IconButton from '../../components/icon-button'
import { TEXT_TYPE } from '../../utils'

const CreateModel: React.FC<{ session: ISession }> = ({session}) => {

    const createNewField = (): IField => {
        return {name: undefined, type: TEXT_TYPE.SMALL_TEXT, value: undefined}
    }
    
    const [fields, setFields] = useState<IField[]>([createNewField()])

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

    const updateModel = () => {
        const validFields = fields.filter(f => f.name && f.name != "")
        // MODEL_API.save()
    }

    return (
        <>
            <ActionButtons>
                <button type="button" className="btn btn-success" onClick={() => updateModel()}>Save</button>
                <IconButton iconClass={"fas fa-plus-circle"} label={"Add Field"} onClick={() => appendNewField()} />
            </ActionButtons>
            <br/>

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

export default CreateModel

const ActionButtons = styled.div`
    button {
        margin-right: 10px; 
    }
`

const Card = styled.div`
    min-width: 210px;
`
