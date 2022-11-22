import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {WWTFFFLayerStack} from './layer-stack';
import {WWTFFFRestApiStack} from './rest-api-stack';

export class CdkStarterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 레이어 스택
    const layerStack = new WWTFFFLayerStack(this, 'WWTFFFLayerStack');

    new WWTFFFRestApiStack(this, 'WWTFFFRestApiStack', {
      baselambdaLayer: layerStack.baseLambdaLayer,
    });
  }
}
