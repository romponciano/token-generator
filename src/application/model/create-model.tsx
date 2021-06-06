import React, { useEffect, useState } from 'react'
import AddButton from '../../components/add-buton'
import { TEXT_TYPE } from '../../utils'

const CreateModel: React.FC<{ session: ISession }> = ({session}) => {

    const createNewField = (): IField => {
        return {name: undefined, type: TEXT_TYPE.SMALL_TEXT, value: undefined}
    }

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
            <AddButton onClick={() => appendNewField()} />
        </>
    )
}

export default CreateModel
