import requests
from bs4 import BeautifulSoup
from newspaper import Article

ticker = "NVDA"
url = f"https://finance.yahoo.com/rss/headline?s={ticker}"

headers = {
    "User-Agent": "Mozilla/5.0"
}

page = requests.get(url, headers=headers)
soup = BeautifulSoup(page.content, "xml")

#extract news articles 


results = soup.find_all('item')

for result in results:
    link = result.link.text

    url_news = link

    article = Article(url_news)
    article.download()
    article.parse()

    article_body = article.text

    print(article_body)

