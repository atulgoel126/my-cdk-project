import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from "path";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class MyCdkProjectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const helloWorldLambda = this.createLambda();
    const api = this.createRestApi();
    this.linkAPIGatewayToLambda(helloWorldLambda, api);
    new CfnOutput(this, 'API Endpoint', {
      value: `${api.url}/hello`,
    });
  }

  /**
   * Creates a lambda function with id 'HelloWorldLambda' and returns it.
   * The runtime is NodeJS 14.x
   * The handler points to the JS function that should be invoked first. index.handler means index.js file and handler function.
   * The code is the path to the folder that contains the JS file.
   */
  createLambda() {
    // Create the Lambda function
    const helloWorldLambda = new lambda.Function(this, 'HelloWorldLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    });
    return helloWorldLambda;
  }

  /**
   * Creates an API Gateway with id 'HelloWorldApi' and returns it.
   */
  createRestApi() {
    // Create the API Gateway
    const api = new apigateway.RestApi(this, 'HelloWorldApi', {
      restApiName: 'Hello World Service',
      description: 'A sample API Gateway connected to a Lambda function that returns Hello World.',
    });
    return api;
  }

  /**
   * Links the API Gateway to the Lambda function such that the API Gateway can invoke the Lambda function.
   * @param helloWorldLambda lambda function to be invoked by the API Gateway
   * @param api API Gateway that invokes the lambda function
   */
  linkAPIGatewayToLambda(helloWorldLambda: lambda.Function, api: apigateway.RestApi) {
    // Create the API Gateway Lambda integration
    const helloWorldIntegration = new apigateway.LambdaIntegration(helloWorldLambda);

    // Add a resource and method to the API Gateway
    // e.g. GET /hello
    const helloWorldResource = api.root.addResource('hello');
    helloWorldResource.addMethod('GET', helloWorldIntegration);
  }
}