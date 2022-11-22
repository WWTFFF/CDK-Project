# 작성자: 정회민
# 모든 상품 리스트를 반환할 때 사용하는 함수
# input: 없음
# output: 상품 목록을 리스트로 반환
import json
from modules.WWTFFFDB import DB
from modules.util import make_response


def handler(event, context):
    try:
        # DB에서 검색
        db = DB()
        response = db.selectAll('Product')

        # 결과 반환
        result = {"result": response}
        return make_response(200, json.dumps(result, ensure_ascii=False))

    except Exception as err:
        return make_response(500, json.dumps({'result': str(err)}))


if __name__ == "__main__":
    print(handler(0, 0))
