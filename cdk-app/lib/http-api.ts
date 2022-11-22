// API 추가를 좀 더 간단히 하기 위한 클래스

import {Construct} from 'constructs';

import {HttpLambdaIntegration} from '@aws-cdk/aws-apigatewayv2-integrations-alpha';

import * as lambda from 'aws-cdk-lib/aws-lambda';

import {HttpApi, HttpMethod} from '@aws-cdk/aws-apigatewayv2-alpha';

export class CDKHttpApi {
  api: HttpApi;

  constructor(scope: Construct, apiName_: string) {
    this.api = new HttpApi(scope, apiName_, {apiName: apiName_});
  }

  addLambdaRoute(
    path_: string,
    methods_: [HttpMethod],
    lambdaFunc: lambda.Function,
  ) {
    this.api.addRoutes({
      path: path_,
      methods: methods_,
      integration: new HttpLambdaIntegration(
        lambdaFunc.toString() + 'Integration',
        lambdaFunc,
      ),
    });
  }
}
