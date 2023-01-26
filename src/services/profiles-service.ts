import axios from 'axios';
import { IProfile } from '../models';

export const getAllProfiles = async () => {
	try {
		const result = await axios.get(
			'https://jbvioda3vf.execute-api.us-east-1.amazonaws.com/default'
		);

		return result.data as IProfile[];
	} catch (error: any) {
		console.error(`Unable to retrieve data from api error: ${error}`);
		return [];
	}
};

