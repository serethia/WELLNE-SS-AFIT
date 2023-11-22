import requests
from bs4 import BeautifulSoup


'''
import requests

with open('file.png', 'wb') as f:
    f.write(requests.get(url).content)
# if you change png to jpg, there will be no error
'''

r = requests.get("https://www.medicaltimes.com/Main/News/List_Opinion.html?MainCate=7&SubCate=70")
r.encoding="UTF-8"

html_source = r.text

soup = BeautifulSoup(html_source, "html.parser")
# print(soup.title)
# print(html_source)


articles = soup.find_all("article", class_="newsList_cont")



SQL_QUERIES = []
# SQL_QUERIES.append('')
BASE_URL = 'https://www.medicaltimes.com'

cnt = 0

for article in articles:

    cnt += 1

    title = article.find('h4').text
    print(title)

    link = article.a['href']

    data = article.find("div", class_="list_txt").text.replace('"', '').replace('. ', '.\n')
    newdata = data.split("]")[1]
    content = newdata+"\n\n"+BASE_URL+link

    print(content)

    userId = ""

    userId = "doctor"+str(cnt%6+1)

    imgDiv = article.find('div', class_='newsList_cont_img').img

    print(imgDiv)

    videoUrl = imgDiv.get('src')

    print(videoUrl)

    category = "전문가조언"


    createdAt = article.find('span', class_="newsList_cont_date").text[0:-4]
    print(createdAt)

    mediaName = 'MedicalTimes'
    
    print(BASE_URL+link)
    

    SQL_QUERIES.append(f'("{title}", "{content}", "{userId}", "{videoUrl}", "{createdAt}", "{mediaName}", "{category}")')

values = ",\n".join(SQL_QUERIES)


SQL = f'INSERT INTO article (article_title, article_content, user_id, video_url, created_at, media_name, category) VALUES \n{values}'+";"

import codecs

with codecs.open("column.sql", "w", "utf-8") as f:
    f.write(SQL)

