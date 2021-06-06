import  { BASE_URL } from '../utils'

const MODELS_URL = 'model'

const getAllModelsFromUser = (username: String) => {
    return fetch(`${BASE_URL}/${username}/${MODELS_URL}/`)
        .then(data => data.json())
}

const MODEL_API = {
    models: getAllModelsFromUser
}

export default MODEL_API
