/* eslint-disable @typescript-eslint/no-unused-vars */
declare interface Credentials {
    email?: string | undefined
    password?: string | undefined
    provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined
}

declare interface UserStore {
    user: object | null,
    role: string | null
}