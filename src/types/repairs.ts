export enum RepairStage {
    RECEIVED = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export enum ServiceType {
    MECHANICAL_REPAIR = 'mechanical',
    ELECTRICAL_REPAIR = 'electrical',
    BODYWORK_REPAIR = 'bodywork',
}

export interface Repair {
    id: string,
    brand: string,
    model: string,
    year: number,
    repair_stage: RepairStage,
    service_type: ServiceType
}

export interface GetRepairsResponse {
    repairs: Repair[];
}

export interface AddRepairPayload {
    application_id: string,
    customer_id: string,
    brand: string,
    model: string,
    year: number,
    repair_stage: RepairStage,
    service_type: ServiceType
}

export interface GetMyRepairsResponse {
    items: Repair[];
}