import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import AppSyncStack from './app-sync-stack';
import LambdaConstruct from './lambda-construct';

export class AviationPlatformStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const aviationDBTable = new Table(this, 'Aviation-Platform-DB-Table', {
      partitionKey: { name: 'attribute', type: AttributeType.STRING }
    });

    const volcatTable = new Table(this, 'Volcat-Table', {
      partitionKey: { name: 'id', type: AttributeType.STRING }
    });

    const lambdaConstruct = new LambdaConstruct(this, 'Aviation-Platform-Lambda-Construct', {
      dbTable: aviationDBTable.tableName,
      volcatTable: volcatTable.tableName
    });

    new AppSyncStack(this, 'Aviation-Platform-AppSync', { lambdaConstruct, dbTable:aviationDBTable, volcatTable });
  }
}
