import { VolcanoCodes } from '@metservice/aviationtypes';
import { fetchAllEmissions } from '../../api/emission/importEmissions';

const handler = async () => {
	const data = await Promise.all(Object.values(VolcanoCodes).map(async(value) => {
        const emissions = await fetchAllEmissions(value);
        return {
            emissions,
            volcano: value
        };
    }));
	return data.reduce((acc, curr) => {
        return { ...acc, [curr.volcano]: curr.emissions };
    }, {});
};

export { handler };
