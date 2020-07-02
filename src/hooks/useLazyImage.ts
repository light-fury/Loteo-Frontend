import {useRef, useEffect} from "react";

export default (imagePath: string) => {
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const image = imageRef.current;
        if (image) {
            image.src = imagePath;
        }
    }, [imagePath]);

    return imageRef;
};
