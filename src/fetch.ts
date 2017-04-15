type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTION';

export default (baseURL: string) => (method: Method) => (url: string) => (data: {}) => fetch(baseURL + url, {
    method,
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
});