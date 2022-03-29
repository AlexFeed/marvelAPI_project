import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestCallback = async (url, method = "GET", body = null,
                                   headers = {'Content-Type': 'application/json'}) => {

        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Couldn't get resource'${url}, status ${response.status}`);
            } else {
                setLoading(false)
                return response.json();
            }
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }

    const request = useCallback(async (url, method = "GET", body = null,
                                 headers = {'Content-Type': 'application/json'}) => {
        return await requestCallback(url, method, body, headers)
    }, [])

    const clearError = useCallback(
        () => {
            setError(null);
        },
        [],
    );

    return {loading, request, error, clearError}
}