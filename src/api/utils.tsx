import { NOT_FOUND_HTTP } from "../utils"

const handleAPIResponse = (response: Promise<Response>) => {
    return response.then(data => {
        const status = data.status
        if(status == 200) return data.json()
        if(status >= 500) return Error("Internal Server Error")
        return NOT_FOUND_HTTP
    })
        .catch(e => {
            if(e?.status < 500) return NOT_FOUND_HTTP
            Error("Internal Server Error")
        })
    
}

export default handleAPIResponse
