import { useEffect } from "react";

// Custom hook to create page titles:
export function useTitle(title: string): void {
    useEffect(() => {
        document.title = title;
    }, []);
}
