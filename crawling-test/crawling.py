import requests
from bs4 import BeautifulSoup


r = requests.get("http://www.hnews.kr/news/index.php?code=20110207145252_4197&d_code=20110207145507_8229")
r.encoding="UTF-8"

html_source = r.text

soup = BeautifulSoup(html_source, "html.parser")
# print(soup.title)
# print(html_source)

li_selector = "#main > div > div > div > div > div > section:nth-child(7) > ul > li"

list_items = soup.select(li_selector)
print(len(list_items))

# title = list_items[0].find('strong', class_='headline nsk-7').a.text
# content = list_items[0].find('div', class_='text').a.text
# writer = list_items[0].find('span', class_="name").text
# category = list_items[0].find('span', class_="cate").text
# createdAt = list_items[0].find('span', class_="date").text

# print(title)
# print(content)
# print(writer)
# print(category)
# print(createdAt)




SQL_QUERIES = []
# SQL_QUERIES.append('')
BASE_URL = 'http://www.hnews.kr'

cnt = 0

for list_item in list_items:

    cnt += 1

    title = list_item.find('dl').dt.a.text.replace('“', '').replace('”', '')
    print(title)
    content = list_item.find('dd', class_='text').text.replace('“', '').replace('”', '')
    print(content)

    userId = ""

    if cnt <= 3:
        userId = "iron1234"
    elif cnt <= 6:
        userId = "yeah3333"
    else:
        userId = "um1234"


    category = "다이어트"


    createdAt = list_item.find('span', class_="date").text
    print(createdAt)
    mediaName = '현대건강신문'
    link = list_item.find('dl').a['href']
    print(BASE_URL+link)
    # break
    # r2 = requests.get('https://health.chosun.com/site/data/html_dir/2023/11/09/2023110901536.html')


    SQL_QUERIES.append(f'("{title}", "{content}", "{userId}", "{createdAt}", "{mediaName}", "{category}")')

values = ",\n".join(SQL_QUERIES)


SQL = f'INSERT INTO article (article_title, article_content, user_id, created_at, media_name, category) VALUES \n{values}'

import codecs

with codecs.open("mytest.sql", "w", "utf-8") as f:
    f.write(SQL)

