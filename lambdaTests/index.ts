import { STS, config } from "aws-sdk";
import { handler } from '../lambdas/volcat/push-volcat';

config.update({ region: "ap-southeast-2" });
const sts = new STS();

const runLocal = async() => {
    const role = await sts.assumeRole({
        RoleArn: process.env.ROLE as string,
        RoleSessionName: 'awssdk'
    }).promise();
    config.update({
        accessKeyId: role.Credentials?.AccessKeyId,
        secretAccessKey: role.Credentials?.SecretAccessKey,
        sessionToken: role.Credentials?.SessionToken
    });
    await handler({
        id: 'test_one',
        country: 'Tonga',
        volcano: 'Metis Shoal'
    });
}

runLocal();
