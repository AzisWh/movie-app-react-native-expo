import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: ()=> Promise <T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null)

            const result = await fetchFunction();

            setData(result);
        }catch (err) {
            const normalizedError =
            err instanceof Error ? err : new Error("An unexpected error occurred");
            console.error(
                "Fetch Error:",
                JSON.stringify(normalizedError, Object.getOwnPropertyNames(normalizedError))
            );
            setError(normalizedError);
        } finally{
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(()=>{
        if(autoFetch) {
            fetchData();
        }
    },[autoFetch]);

    return {data, loading, error, refetch: fetchData, reset };
}

export default useFetch;