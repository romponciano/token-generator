import React, { useEffect, useState } from 'react'
import TEXT_TYPE from './utils'

const CreateForm = () => {

    const createNewField = () => {
        return {name: undefined, type: TEXT_TYPE.SMALL_TEXT}
    }

    const createSelectOptions = () => {
        return (
            Object.values(TEXT_TYPE).map(val => {
                return <option value={val}>{val}</option>
            })
        )
    }

    const appendNewField = () => {
        var newFields = fields
        newFields.push(createNewField())
        setFields([...newFields])
    }

    const [idCount, setIdCount] = useState(0)
    const [fields, setFields] = useState([createNewField()])

    return (
        <>
            <div className="container-fluid" id="container-field">
                {fields.map(field => {
                    return (
                        <div className="row">
                            <div className="col-10">
                                <input type="text" className="form-control" placeholder="Field name" value={field.name} />
                            </div>
                            <div className="col-2">
                                <select className="form-select" defaultValue={field.type}>
                                    {createSelectOptions()}
                                </select>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button type="button" className="btn btn-primary" onClick={() => appendNewField()}>
                <i className="fas fa-plus-circle" />
            </button>
        </>
    )
}

export default CreateForm
