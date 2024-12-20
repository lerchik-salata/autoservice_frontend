export interface AddApplicationPayload {
    client_name: string,
    phone_number: string,
    email: string,
    message: string
}

export interface Application {
    id: string,
    client_name: string,
    phone_number: string,
    email: string,
    message: string,
    processed: boolean
}

export interface GetApplicationsResponse {
    items: Application[];
}