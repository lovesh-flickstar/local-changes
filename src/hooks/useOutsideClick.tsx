import { useEffect } from "react";

export const useOutsideClick = (
    ref: React.RefObject<HTMLElement | null>,
    onOutsideClick: () => void, 
    dependency: boolean
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref?.current && !ref.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        };

        if (dependency) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dependency, ref, onOutsideClick]);
};
