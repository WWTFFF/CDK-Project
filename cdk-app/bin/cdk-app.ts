#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {CdkStarterStack} from '../lib/cdk-total-stack';

const app = new cdk.App();
new CdkStarterStack(app, 'WWTFFFStack', {
  stackName: 'WWTFFFStack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
