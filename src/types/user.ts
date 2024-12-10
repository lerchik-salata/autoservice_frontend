export interface User {
    id: string,
    email: string,
    created_at: string,
    name: string,
    surname: string,
    role: string
}

export interface GetUsersResponse {
    items: User[];
}

export interface UpdateUserPayload {
    name: string;
    surname: string;
}