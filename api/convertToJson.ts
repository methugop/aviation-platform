import moment from 'moment';
import { Observation } from '@metservice/aviationtypes';

const convertToJson = <T = Observation>(rawData: string[], customOutput?: boolean): T[] => {
    const headers = rawData.shift()?.split(',').map(header => header.trim());
    const output: T[] = rawData.map((eachEntry) => {
        const entryData = eachEntry.split(',');
        let obj: any = {}
        if (!customOutput) {
            const dateTime = moment(entryData[0]);
            obj = {
                time: dateTime,
                measurement: Number(entryData[1]),
                error: Number(entryData[2])
            }
            return obj;
        }
        if (headers) {
            for(var i = 0; i < headers?.length; i++) {
                obj[headers[i]] = isNaN(Number(entryData[i])) ? entryData[i] : Number(entryData[i]);
            }
        }
        return obj as T;
    })
    output.pop();
    return output;
};

export default convertToJson;
