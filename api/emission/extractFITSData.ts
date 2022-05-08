import axios from 'axios';

const extractFITSData = async (path: string): Promise<string[]> => {
    const fitsAPI = 'https://fits.geonet.org.nz';
    const call = await axios.get(`${fitsAPI}/${path}`);
    const rawData: string[] = call.data.split('\n');
    return rawData;
};

export default extractFITSData;
