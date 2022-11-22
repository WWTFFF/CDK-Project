import json
from decimal import Decimal

def make_response(status, msg):
    return {
        'statusCode': status,
        'headers': {'Content-Type': 'application/json'},
        'body': msg
    }

# boto3 resource dynamodb response -> json


# Python의 Decimal 타입과 set 타입을 int/float, list로 변환한다.
class JsonSerializableEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, set):
            return list(o)
        if isinstance(o, Decimal):
            return int(o) if int(o) == float(o) else float(o)
        return super(JsonSerializableEncoder, self).default(o)

# json 형식과 호환되도록 unserializable 타입을 serializable 형식으로 변환한다.


def resource_response_parse(item: dict) -> dict:
    if(item == None):
        return None
    return json.loads(json.dumps(item, cls=JsonSerializableEncoder))
