import {Construct} from 'constructs';

import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export function newBasicLambdaDDBRole(scope: Construct, roleName: string): iam.Role {
  const role = new iam.Role(scope, roleName, {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
  });

  role.addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName(
      'service-role/AWSLambdaBasicExecutionRole',
    ),
  );

  role.addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
  );

  return role;
}

export  interface CustomLambdaProps {
  scope: Construct;
  funcName: string;
  path: string;
  handler: string;
  role?: iam.Role;
  layers?: Array<lambda.LayerVersion>;
  env?: {string: string};
}

export  function newLambda(lambdaProps: CustomLambdaProps): lambda.Function {
  const func = new lambda.Function(lambdaProps.scope, lambdaProps.funcName, {
    functionName: lambdaProps.funcName,
    runtime: lambda.Runtime.PYTHON_3_8,
    code: lambda.Code.fromAsset(lambdaProps.path),
    handler: lambdaProps.handler,
    role: lambdaProps.role,
    layers: lambdaProps.layers,
    environment: lambdaProps.env,
  });
  return func;
}
