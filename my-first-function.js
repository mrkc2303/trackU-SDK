export const main = (params) => {
    const { method, path, abcd } = params;
    return `${method} request to ${path}`;
};