import type {IFolder} from "~/types/types";

export const getSavedFolders = (): IFolder | null => {
    if(!process.client) return null;
    const jsonData = localStorage.getItem("folders-structure");
    if(!jsonData) return null;
    return JSON.parse(jsonData);
}