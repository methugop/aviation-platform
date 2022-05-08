import { DynamoDB } from 'aws-sdk';
import { DBItem } from '@metservice/aviationtypes';

const getDBItem = async <T>(attribute: string) => {
	const params = {
        TableName: process.env.DB_TABLE as string,
        Key: { 'attribute': attribute }
    };
    const docClient = new DynamoDB.DocumentClient();
    const { content } = (await docClient.get(params).promise()).Item as DBItem<T>;
	return content;
};

export default getDBItem;
