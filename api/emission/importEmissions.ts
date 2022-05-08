import { EmissionElements, Observation } from '@metservice/aviationtypes';
import fetchObservation from '../../api/emission/fetchObservation';
const fetchEmission = async (element: EmissionElements, siteId: string): Promise<{ element: EmissionElements, data: Observation[] }> => {
    const data = await fetchObservation(`${siteId}000`, `${element}-flux-a`, 365);
    return { element, data };
};

const fetchAllEmissions = async (siteId: string): Promise<Record<EmissionElements, Observation[]>> => {
    const emissionData = await Promise.all(Object.values(EmissionElements).map(async(value) => {
        const data = await fetchEmission(value, siteId);
        return data;
    }));
    let observation: Record<string, Observation[]> = {};
    emissionData.forEach((emission) => {
        observation[emission.element] = emission.data;
    });
    return observation;
};


export { fetchEmission, fetchAllEmissions };
