import React, { useState } from 'react'
import styled from 'styled-components'
import MODEL_API from '../../api/models'
import IconButton from '../../components/icon-button'
import ImageUploader from '../../components/image-uploader'
import LoadingButton from '../../components/loading-button'
import { NO_IMAGE, TEXT_TYPE, toBase64 } from '../../utils'

const EditModel: React.FC<{ session: ISession, model?: IModel }> = ({session, model}) => {

    const createNewField = (): IField => {
        return {name: undefined, type: TEXT_TYPE.SMALL_TEXT, value: undefined}
    }
   
    const [fields, setFields] = useState<IField[]>(model?.fields)
    const [modelName, setModelName] = useState<string>(model?.name)
    const [modelImage, setModelImage] = useState<string>(model?.image)

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
        const newModel: IModel = { 
            id: model?.id, 
            image: modelImage,
            userId: session.id, 
            name: modelName, 
            fields: validFields 
        }
        MODEL_API
            .save(newModel)
            .then(res => { if(res != 200) throw Error("Can't update :(") })
    }

    const updateField = (name: string, newName: string) => {
        fields.forEach(f => { if(f.name == name) f.name = newName })
        setFields([...fields])
    }

    const updateModelImage = () => {
        const file = (document.getElementById("modelImage") as HTMLInputElement).files[0]
        toBase64(file).then(res => setModelImage(res))
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
                    label="Save Model"
                    success="Model saved successfully \o/"
                    fail="Can't save your model :("
                />
                <div className="observation">*All fields without a name will be ignored and not saved.</div>
            </ActionButtons>

            <br/>
            
            <div className="form-row">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Model Name</div>
                    </div>
                    <input type="text" className="form-control" placeholder="Model name" 
                        value={modelName} 
                        onChange={e => setModelName(e.target.value)}
                    />
                </div>
            </div>

            <div className="d-flex">
                <div>
                    <ImageUploader 
                        id="modelImage" 
                        image={modelImage}
                        defaultImage={NO_IMAGE} 
                        alt={modelName}
                        onUpload={() => updateModelImage()} 
                        onDelete={setModelImage}
                        imgHeight="250px" 
                        imgWidth="250px"
                    />
                    <FieldsAction className="card">
                        <IconButton iconClass={"fas fa-plus-circle"} label={"Add Field"} onClick={() => appendNewField()} />
                    </FieldsAction>
                </div>

                <Fields className="card-columns">
                    {fields?.map(field => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <input type="text" className="form-control" placeholder="Field name" value={field.name} onChange={e => updateField(field.name, e.target.value)} />
                                
                                    <select className="form-select" defaultValue={field.type} onChange={e => field.type = e.target.value}>
                                        {createSelectOptions()}
                                    </select>
                                </div>
                            </div>
                        )
                    })}
                </Fields>
            </div>
        </>
    )
}

export default EditModel

const Fields = styled.div`
    @media (min-width: 576px) { .card-columns { column-count: 2; } }
    @media (min-width: 768px) { .card-columns { column-count: 3; } }
    @media (min-width: 992px) { .card-columns { column-count: 4; } }
    @media (min-width: 1200px) { .card-columns { column-count: 5; } }
    @media (min-width: 1800px) { .card-columns { column-count: 9; } }

    column-break-inside: avoid;

    .card { 
        display: inline-block; 
    }

    input { 
        font-weight: bold; 
        width: 205px;
    }
`

const FieldsAction = styled.div`
    text-align: center;
    margin-top: 15px;
`

const ActionButtons = styled.div`
    display: flex;

    button { 
        margin-right: 10px;  
    }

    .observation {
        margin-block: auto;
    }
`
