import {useState, useEffect} from "react";

const useMediaQuery = (query: string) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const windowResized = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", windowResized);

        return () => window.removeEventListener("resize", windowResized);
    }, []);

    useEffect(() => {
        setMatches(window.matchMedia(query).matches);
    }, [query, windowWidth]);

    return matches;
};

export default useMediaQuery;
