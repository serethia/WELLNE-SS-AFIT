import requests
from bs4 import BeautifulSoup


r = requests.get("https://health.chosun.com/list.html")
r.encoding="EUC-KR"

html_source = r.text

soup = BeautifulSoup(html_source, "html.parser")
# print(soup.title)

li_selector = "#section-bottom-article-list > li"

list_items = soup.select(li_selector)
# print(len(list_items))

# title = list_items[0].find('h4').a.text
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
BASE_URL = 'https://health.chosun.com'

for list_item in list_items:
    print(list_item)
    title = list_item.find('h4').a.text.replace('"', '')
    content = list_item.find('div', class_='text').a.text.replace('"', '')
    writer = list_item.find('span', class_="name").text
    category = list_item.find('span', class_="cate").text
    createdAt = list_item.find('span', class_="date").text
    mediaName = '헬스조선'
    link = list_item.find('h4').a['href']
    print(BASE_URL+link)
    break
    # r2 = requests.get('https://health.chosun.com/site/data/html_dir/2023/11/09/2023110901536.html')


    # SQL_QUERIES.append(f'("{title}", "{content}", "{writer}", "{category}", "{mediaName}")')

# values = ",\n".join(SQL_QUERIES)


# SQL = f'INSERT INTO articles (title, content, writer, category, media_name) VALUES \n{values}'

# import codecs

# with codecs.open("articles.sql", "w", "utf-8") as f:
#     f.write(SQL)

