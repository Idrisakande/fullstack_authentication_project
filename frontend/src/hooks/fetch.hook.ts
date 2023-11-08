import axios from "axios";
import { useEffect, useState } from "react";
import { FetchState } from "../constants/types";
import { getUsername } from "../constants/helper";

// server domain
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */
export const useFetch = (query?: string) => {
    const [state, setState] = useState<FetchState>({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                setState((prev: any) => ({ ...prev, isLoading: true }));

                const { username } = !query ? (await getUsername()) as { username: string } : { username: '' };

                // const username = decode.username as string;

                const { data, status } = !query
                    ? await axios.get<Response>(`/api/user/${username}`)
                    : await axios.get<Response>(`/api/${query}`);


                if (status === 201) {
                    setState((prev: any) => ({
                        ...prev,
                        isLoading: false,
                        apiData: data,
                        status: status
                    }));
                }
                setState((prev: any) => ({ ...prev, isLooading: false }))
            } catch (error) {
                setState((prev: any) => ({
                    ...prev,
                    isLoading: false,
                    serverError: error
                }));
            }
        };

        fetchData();
    }, [query]);

    return state;
}