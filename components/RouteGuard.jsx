import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { readToken } from '@/lib/authenticate';
import {favouritesAtom, searchHistoryAtom} from "@/store";
import {getFavourites, getHistory} from "@/lib/userData";
import {useAtom} from "jotai";

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        authCheck(router.pathname);

        const updateAtoms = async () => {
            try {
                const favs = await getFavourites();
                const history = await getHistory();
                setFavourites(favs);
                setSearchHistory(history);
            } catch (error) {
                setError("Failed to load your data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        updateAtoms();
        const handleRouteChange = (url) => {
            authCheck(url);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    function authCheck(url) {
        const path = url.split('?')[0];

        if (PUBLIC_PATHS.includes(path)) {
            setAuthorized(true);
            return;
        }

        const token = readToken();
        if (token) {
            setAuthorized(true);
        } else {
            setAuthorized(false);
            router.push('/login');
        }
    }

    return (
        <>
            {authorized ? props.children : null}
        </>
    );
}