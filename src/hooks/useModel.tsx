import { useState } from 'react'

export default function useModel() {
    const [models, setModels] = useState<IModel[]>([])

    return {
        models: models,
        setModels: setModels
    }
}