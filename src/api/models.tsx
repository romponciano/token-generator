import  { BASE_URL, DEFAULT_HEADER } from '../utils'
import handleAPIResponse from './utils'

const MODELS_URL = `${BASE_URL}/model`

const getAllModelsByUser = (userId: string) => {
    return handleAPIResponse(fetch(`${MODELS_URL}/user/${userId}`))
}

const saveModel = (model: IModel) => {
    return handleAPIResponse(
        fetch(`${MODELS_URL}/`, {
            method: 'POST',
            headers: DEFAULT_HEADER,
            body: JSON.stringify(model)
        })
    )
}

const deleteModel = (modelId: string) => {
    return handleAPIResponse(
        fetch(`${MODELS_URL}/${modelId}`, {
            method: 'DELETE',
            headers: DEFAULT_HEADER
        })
    )
}

const MODEL_API = {
    models: getAllModelsByUser,
    save: saveModel,
    delete: deleteModel
}

export default MODEL_API
