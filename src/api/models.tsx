import  { BASE_URL, DEFAULT_HEADER } from '../utils'

const MODELS_URL = `${BASE_URL}/model`

const getAllModelsByUser = (userId: string) => {
    return fetch(`${MODELS_URL}/user/${userId}`)
        .then(data => data.json())
}

const saveModel = (username: string, model: IModel) => {
    return fetch(`${BASE_URL}/${username}/${MODELS_URL}/${model.name}`, {
        method: 'POST',
        headers: DEFAULT_HEADER,
        body: JSON.stringify(model)
    })
        .then(data => data.status)
}

const MODEL_API = {
    models: getAllModelsByUser,
    save: saveModel
}

export default MODEL_API
