import { Observation } from '@metservice/aviationtypes';
import convertToJson from "../convertToJson";
import extractFITSData from './extractFITSData';

/**
 * Fetches an array of observations from the FITS geonet API
 * @param {String} siteID Site identifier e.g., WI000.
 * @param {String} typeID A type identifier for observations e.g., e.
 * @param {Number} days The number of days of data to select before now e.g., 250. Maximum value is 365000.
 * @param {Boolean} customOutput If true, object keys for the each observation will be custom to the observation type.
 */

const fetchObservation = async <T = Observation>(siteID: string, typeID: string, days: number, customOutput?: boolean): Promise<T[]> => {
    const rawData = await extractFITSData(`observation?typeID=${typeID}&days=${days}&siteID=${siteID}`);
    const jsonOutput = convertToJson<T>(rawData, customOutput);
    return jsonOutput;
};

export default fetchObservation;
