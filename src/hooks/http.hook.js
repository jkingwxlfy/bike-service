export const useHttp = () => {

    const request = async (
        url,
        method = 'GET',
        body = null,
        ) => {

        const token = localStorage.getItem("token");
        const headers = {
            'Content-Type': 'application/json'
        }
        if (token) {headers.Authorization = 'Bearer ' + token}

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Ошибка запроса ${url} Код ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}