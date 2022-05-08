import { Construct, Stack, Duration } from '@aws-cdk/core';
import { Runtime } from "@aws-cdk/aws-lambda";
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as path from 'path';

interface LambdaProps {
	dbTable: string;
    volcatTable: string;
};

class LambdaConstruct extends Construct{
    env: LambdaProps

    constructor(scope: Stack, id: string, props: LambdaProps){
        super(scope, id);
        this.env = props;
    }

    define = (name: string, file:string): NodejsFunction => {
        return new NodejsFunction(this, name, {
            memorySize: 1024,
            timeout: Duration.seconds(12),
            entry: path.join(__dirname, `/../lambdas/${file}.ts`),
            runtime: Runtime.NODEJS_14_X,
            bundling: {
				minify: true,
                externalModules: ['aws-sdk'],
			},
            handler: 'handler',
            environment:{
                DB_TABLE:this.env.dbTable,
                VOLCAT_TABLE: this.env.volcatTable
            }
        });
    };

    public get authorizer() {
        return this.define('APIAuthorizer', 'authorizer');
    };
};


export default LambdaConstruct;
