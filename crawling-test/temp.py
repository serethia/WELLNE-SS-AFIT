import requests
from bs4 import BeautifulSoup

url = "http://www.hnews.kr/news/index.php?code=20110207145252_4197&d_code=20110207145507_8229"
r = requests.get(url)
r.encoding = "EUC-KR"
html_source = r.text

soup = BeautifulSoup(html_source, "html.parser")

# Assuming the HTML structure you provided is correct, select the desired elements
li_selector = "#main > div > div > div > div > div > section:nth-child(7) > ul > li"
list_items = soup.select(li_selector)

# Iterate through the list items and extract information
for item in list_items:
    # Extracting image URL and title from the div element
    image_url = item.select_one(".news_photo__ img_box")["style"].split("(")[1].split(")")[0]
    title = item.select_one(".news_photo__ img_box")["title"]

    # Print or process the extracted information
    print("Image URL:", image_url)
    print("Title:", title)
    print("---")