import { Volcano } from '@metservice/aviationtypes';
import getDBItem from '../../api/fetchFromDB';

const handler = async () => {
    const volcanoes = await getDBItem<Volcano[]>('volcanoes')
	return volcanoes;
};

export { handler };
