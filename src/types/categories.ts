export interface GetCategoriesResponse {
    items: Category[];
}

export interface Category {
    id: string;
    name: string;
}

export interface AddCategoryPayload {
    name: string;
}
