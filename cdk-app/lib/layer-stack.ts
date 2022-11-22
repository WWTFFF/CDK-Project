import {NestedStack, NestedStackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {LayerVersion} from 'aws-cdk-lib/aws-lambda';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import * as path from 'path';

export class WWTFFFLayerStack extends NestedStack {
  baseLambdaLayer: LayerVersion;
  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    this.baseLambdaLayer = newLayer(
      this,
      'WWTFFFBaseLambdaLayer',
      path.join(__dirname, '../src/'),
      // ['requirements.md'],
    );
  }
}

function newLayer(
  scope: Construct,
  layerName: string,
  layerPath: string,
  exclude?: [string],
): lambda.LayerVersion {
  const layer = new lambda.LayerVersion(scope, layerName, {
    layerVersionName: layerName,
    code: lambda.Code.fromAsset(layerPath, {
      exclude: exclude || undefined,
    }),
    compatibleRuntimes: [lambda.Runtime.PYTHON_3_8],
  });
  return layer;
}
