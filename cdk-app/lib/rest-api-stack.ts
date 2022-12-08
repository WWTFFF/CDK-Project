import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";
import * as path from "path";

import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import { newBasicLambdaDDBRole, newLambda } from "./util";
import { CDKHttpApi } from "./http-api";

interface ExNestedStackProps extends NestedStackProps {
  readonly baselambdaLayer: LayerVersion;
}

export class WWTFFFRestApiStack extends NestedStack {
  constructor(scope: Construct, id: string, props: ExNestedStackProps) {
    super(scope, id, props);

    // Role 생성
    const lambdaDDBRole = newBasicLambdaDDBRole(
      this,
      "WHIFFSBasicLambdaDDBRole"
    );

    // 제품 추천 API
    const getRecommendedProductsFunc = newLambda({
      scope: this,
      funcName: "getRecommendedProductFunc",
      path: path.join(__dirname, "../src/python"),
      handler: "get_recommend_products.handler",
      role: lambdaDDBRole,
      layers: [props.baselambdaLayer],
    });

    // 제품 목록 API
    const getAllProductsFunc = newLambda({
      scope: this,
      funcName: "getAllProductsFunc",
      path: path.join(__dirname, "../src/python"),
      handler: "get_all_products.handler",
      role: lambdaDDBRole,
      layers: [props.baselambdaLayer],
    });

    // 카테고리 제품 목록 API
    const getCategoryProductsFunc = newLambda({
      scope: this,
      funcName: "getCategoryProductsFunc",
      path: path.join(__dirname, "../src/python"),
      handler: "get_category_products.handler",
      role: lambdaDDBRole,
      layers: [props.baselambdaLayer],
    });

    // 제품 검색 API
    const getSearchProductsFunc = newLambda({
      scope: this,
      funcName: "getSearchProductsFunc",
      path: path.join(__dirname, "../src/python"),
      handler: "get_search_products.handler",
      role: lambdaDDBRole,
      layers: [props.baselambdaLayer],
    });

    const getTestFunc = newLambda({
      scope: this,
      funcName: "getTestFunc",
      path: path.join(__dirname, "../src/python"),
      handler: "get_test.handler",
      role: lambdaDDBRole,
      layers: [props.baselambdaLayer],
    });

    // API Gateway 생성
    const api = new CDKHttpApi(this, "WWTFFF_HTTP_API");

    // 제품 추천 API 연결
    api.addLambdaRoute(
      "/product/recommend",
      [HttpMethod.GET],
      getRecommendedProductsFunc
    );
    // 제품 목록 API 연결
    api.addLambdaRoute("/product/list", [HttpMethod.GET], getAllProductsFunc);
    // 카테고리 제품 목록 API 연결
    api.addLambdaRoute(
      "/product/list/category/{category}",
      [HttpMethod.GET],
      getCategoryProductsFunc
    );
    // 제품 검색 API 연결
    api.addLambdaRoute(
      "/product/list/search/{keyword}",
      [HttpMethod.GET],
      getSearchProductsFunc
    );

    api.addLambdaRoute("/test", [HttpMethod.GET], getTestFunc);
  }
}
