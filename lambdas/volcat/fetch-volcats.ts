import { DynamoDB } from 'aws-sdk';

const handler = async () => {
	const params = {
        TableName: process.env.VOLCAT_TABLE as string,
    };
    const docClient = new DynamoDB.DocumentClient();
    return (await docClient.scan(params).promise()).Items;
};

export { handler };
