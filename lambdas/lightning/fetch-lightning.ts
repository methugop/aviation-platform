import { LightningGeoJSON, LightningState } from '@metservice/aviationtypes';
import getDBItem from '../../api/fetchFromDB';

const handler = async () => {
    const lightning = await getDBItem<{ strikes: LightningGeoJSON, formattedResponse: LightningState, timestamp: string }[]>('lightning')
	return lightning;
};

export { handler };
