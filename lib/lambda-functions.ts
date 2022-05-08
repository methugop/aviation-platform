import LambdaConstruct from "./lambda-construct";
import { LambdaIntegration } from "@aws-cdk/aws-apigateway";
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Table, ITable } from '@aws-cdk/aws-dynamodb';

type LambdaType = Record<string, () => LambdaIntegration>;

const intergration = (func:NodejsFunction, template: Record<string, unknown>) => new LambdaIntegration(func, template);

const lambdaFunctions = (lambdaConstruct: LambdaConstruct, table: Table | ITable):LambdaType => {
    const functions: LambdaType = {
       fetchVolcanoes: () => {
            const fetchVolcanoes = lambdaConstruct.define('FetchVolcanoes', 'fetch-volcanoes');
            table.grantReadWriteData(fetchVolcanoes);
            return intergration(fetchVolcanoes, {
                requestTemplates: { "application/json": '{ "statusCode": "200" }' }
            }); 
        },
    };
    return functions;
};

export default lambdaFunctions;