import { GraphqlApi, Schema, AuthorizationType, MappingTemplate, PrimaryKey, Values } from "@aws-cdk/aws-appsync";
import { Construct, Stack } from '@aws-cdk/core';
import { Table, ITable } from '@aws-cdk/aws-dynamodb';

import LambdaConstruct from './lambda-construct';

interface StackProps {
    lambdaConstruct: LambdaConstruct;
    dbTable:  Table | ITable;
    volcatTable: Table | ITable;
}

class AppSyncStack extends Construct{
    public api?: GraphqlApi;
    constructor(scope: Stack, id: string, props: StackProps){
        super(scope, id);
        const { lambdaConstruct, dbTable, volcatTable } = props;

        const fetchVolcanoes = lambdaConstruct.define('FetchVolcanoes', '/volcano/fetch-volcanoes');
        const fetchLightning = lambdaConstruct.define('FetchLightning', '/lightning/fetch-lightning');
        const fetchEmissions = lambdaConstruct.define('FetchEmissions', '/emissions/fetch-emissions');
        const addVolcat = lambdaConstruct.define('AddVolcat', '/volcat/push-volcat');
        const onNewVolcat = lambdaConstruct.define('OnNewVolcat', '/volcat/volcat-subscribe');
        const fetchVolcats = lambdaConstruct.define('FetchVolcats', '/volcat/fetch-volcats');

        dbTable.grantReadWriteData(fetchVolcanoes);
        dbTable.grantReadWriteData(fetchLightning);
        volcatTable.grantReadWriteData(addVolcat);
        volcatTable.grantReadData(fetchVolcats);
        const api = new GraphqlApi(scope, 'Aviation-Platform-GraphQLAPI', {
            name: 'Aviation Platform GraphQL API',
            schema: Schema.fromAsset('graphql/schema.graphql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.API_KEY,
                },
                // additionalAuthorizationModes: [
                //     { authorizationType: AuthorizationType.LAMBDA },
                //     { authorizationType: AuthorizationType.API_KEY },
                // ]
            },
            xrayEnabled: true,
        });

        const lambdaVolcanoes = api.addLambdaDataSource('volcanoDataSource', fetchVolcanoes);
        const lambdaLightning = api.addLambdaDataSource('lightningDataSource', fetchLightning);
        const lambdaEmissions = api.addLambdaDataSource('emissionsDataSource', fetchEmissions);
        const volcatLambda = api.addLambdaDataSource('volcatDataSource', addVolcat);
        const volcatSubscribe = api.addLambdaDataSource("onNewVolcat", onNewVolcat);
        const volcatFetch = api.addLambdaDataSource("fetchVolcats", fetchVolcats);

        lambdaVolcanoes.createResolver({
            typeName: "Query",
            fieldName: "fetchVolcanoes"
        });
        lambdaLightning.createResolver({
            typeName: "Query",
            fieldName: "fetchLightning"
        });
        lambdaEmissions.createResolver({
            typeName: "Query",
            fieldName: "fetchEmissions"
        });
        volcatFetch.createResolver({
            typeName: "Query",
            fieldName: "fetchVolcats"
        })
        volcatLambda.createResolver({
            typeName: "Mutation",
            fieldName: "addVolcat",
        });
        volcatSubscribe.createResolver({
            typeName: "Subscription",
            fieldName: "onNewVolcat",
        });
        this.api = api;
    };
};

export default AppSyncStack;
