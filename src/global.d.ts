export {}

declare global {
    interface ISession {
        id: string,
        username: string, 
        password: string
    }

    interface IField {
        name: string,
        type: string,
        value: unknown
    }

    interface IModel {
        id: string,
        image: string,
        name: string,
        userId: string,
        fields: List<IField>
    }

    interface IToken {
        id: string,
        userId: string,
        modelId: string,
        fields: List<IField>
    }
}