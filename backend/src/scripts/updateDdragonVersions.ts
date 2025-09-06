import { updateLatestVersion } from "../utils/championUtils";

export const updateDdragonVersions = async () => {
    console.log('Updating ddragon versions');
    try {
        await updateLatestVersion();
        console.log('Updated ddragon versions');
    } catch (error) {
        console.error('Error updating ddragon versions:', error);
    }
}



