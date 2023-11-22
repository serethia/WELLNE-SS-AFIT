styleStr = "width:171px;height:96px;background:url(http://www.hnews.kr/data/news/2311/200x154/2fc578a59bfcf2b89fd241067798e51a_YzKlHwwFgUmcEWK.jpg) center 30% no-repeat; background-size:cover;"

data = styleStr.split("(")[1]
print(data)

imgUrl = data.split(")")[0]
print(imgUrl)