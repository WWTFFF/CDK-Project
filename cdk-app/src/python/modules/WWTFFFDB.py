import boto3
from boto3.dynamodb.conditions import Key, Attr
from modules.config import region_name, table_name
from modules.util import resource_response_parse


# DB 매니저
class DB:
    def __init__(self):
        # 아마존 DynamoDB 연결
        self.dynamodb = boto3.resource('dynamodb', region_name=region_name)

        # 테이블을 딕셔너리 형식으로 저장
        self.tables = dict()
        for name in table_name:
            self.tables[name] = self.dynamodb.Table(name)

    # Select * from table_name;
    def selectAll(self, t_name: str):
        table = self.tables[t_name]
        all_data = table.scan()
        result = resource_response_parse(all_data['Items'])
        return result

    # Select * from table_name where category = 'category';
    def selectByCategory(self, t_name: str, category: str):
        table = self.tables[t_name]
        query = {'KeyConditionExpression': Key('Category').eq(category)}
        result = resource_response_parse(table.query(**query)['Items'])
        return result

    # Select * from table_name where Keyword = 'Keyword';
    def selectByKeyword(self, t_name: str, keyword: str):
        table = self.tables[t_name]
        query = {'FilterExpression': Attr('Category').ne('') & Attr('ProductName').contains(keyword)}
        result = resource_response_parse(table.scan(**query)['Items'])
        return result


if __name__ == "__main__":
    db = DB()
    print(db.tables)
    print(db.selectAll('Product'))
