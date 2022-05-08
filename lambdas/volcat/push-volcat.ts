import { DynamoDB } from 'aws-sdk';

const handler = async(volcat: any) => {
    const docClient = new DynamoDB.DocumentClient();

    const params = {
        TableName:  process.env.VOLCAT_TABLE as string,
        Item: { ...volcat.arguments },
    };
    await docClient.put(params).promise()
    return {...volcat.arguments}
};

export { handler };
