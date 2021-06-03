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
}