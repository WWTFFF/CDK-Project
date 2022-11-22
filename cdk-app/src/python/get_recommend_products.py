# 작성자: 정회민
# 장고 프로젝트에서 추천 상품 목록을 받아 상품이름만 반환
# input: 없음
# output: 상품 목록을 리스트로 반환
import json
import requests
from modules.util import make_response
from modules.config import IPv4, PORT


def handler(event, context):
    try:
        # 경로 설정
        request_url = f"http://{IPv4}:{PORT}"   # 장고 프로젝트 실행 URL
        path = "product/recommend"              # 추천상품 요청 경로
        request_path = f"{request_url}/{path}"  # 요청 경로

        # 요청
        response = requests.get(request_path)

        # 결과 반환
        result = {"result": response.json()["products"]}
        return make_response(200, json.dumps(result, ensure_ascii=False))

    except Exception as err:
        return make_response(500, json.dumps({'result': str(err)}))


if __name__ == "__main__":
    print(handler(0, 0))
