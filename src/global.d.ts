export {}

declare global {
    interface ISession {
        username: string, 
        password: string
    }

    interface IField {
        name: string,
        type: string,
        value: unknown
    }

    interface IModel {
        fields: List<IField>,
        tokens: List<IToken>?
    }

    interface IToken {
        token: List<IField>
    }
}