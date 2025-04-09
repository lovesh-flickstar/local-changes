
export const getFetcher = (url: string ) => fetch(url , {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    },
}).then(res => res.json());


export const getFetcherWithLogged = (url: string) => fetch(url
    , {
    method : "GET",
    headers: {
        'Content-Type': 'application/json',
    },
}).then(res => res.json());

export const postFetcher = (url: string ) => fetch(url , {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
}).then(res => res.json());