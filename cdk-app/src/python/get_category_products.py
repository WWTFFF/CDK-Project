# 작성자: 정회민
# url로 받은 카테고리에 해당하는 제품들을 반환
# input: 없음
# output: 상품 목록을 리스트로 반환
import json
from modules.WWTFFFDB import DB
from modules.util import make_response


def handler(event, context):
    try:
        # http://url/product/list/category/{category}
        # url으로 카테고리를 입력받아 사용
        param = event['pathParameters']
        category = param['category']

        # DB에서 검색
        db = DB()
        response = db.selectByCategory(t_name='Product', category=category)

        # 결과 반환
        result = {"result": response}
        return make_response(200, json.dumps(result, ensure_ascii=False))

    except Exception as err:
        return make_response(500, json.dumps({'result': str(err)}))


if __name__ == "__main__":
    print(handler(0, 0))
