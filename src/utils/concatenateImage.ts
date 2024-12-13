export const trimImagePath = (imagePath: string | File ) => {
    let splittedPath: string[];

    if (imagePath instanceof File) {
        splittedPath = imagePath.name.split('/');
    } else if (typeof imagePath === 'string') {
        splittedPath = imagePath.split('/');
    } else {
        return '';
    }

    return splittedPath[splittedPath.length - 1];
};

export const concatenateImage = (imagePath: string | null): string | undefined =>
    imagePath !== null ? `http://0.0.0.0:8000${imagePath}` : undefined;
