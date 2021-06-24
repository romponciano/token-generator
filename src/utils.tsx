const TEXT_TYPE = {
    SMALL_TEXT: "small-text",
    TEXT_BOX: "text-box",
    NUMBER: "number",
    SELECT: "select",
    CALC: "calc"
}

const BASE_URL = 'https://token-generator-api.herokuapp.com/tg'
const DEFAULT_HEADER = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }

export {
    TEXT_TYPE,
    BASE_URL,
    DEFAULT_HEADER
}
