import requests
from bs4 import BeautifulSoup
from newspaper import Article
from flask import Flask, request, render_template, jsonify

# Get web scraped information
def scrape_data(ticker):
    url_scraper = f"https://finance.yahoo.com/rss/headline?s={ticker}"

    header_scraper = {
        "User-Agent": "Mozilla/5.0"
    }

    page = requests.get(url_scraper, headers=header_scraper)
    soup = BeautifulSoup(page.content, "xml")

    #extract news articles 


    results = soup.find_all('item')

    for result in results:
        link = result.link.text

        url_news = link

        article = Article(url_news)
        article.download()
        article.parse()

        webscraped_data += "\n \n" + article.text

        
    return webscraped_data

#data_url = "http://localhost:3001/analyze"
post_url = "http://localhost:3001/scraper"
header_data = {'Content-Type': 'application/json'}

app = Flask(__name__)

@app.route('/analyze', methods=['GET'])
def receive_data():
    try:
        data = request.get_json(silent=True)
    
        ticker = data.get("data", "unkown")
        
        print(ticker)
        data_body = scrape_data(ticker)

        post_data = {
            "data": f"{data_body}"
        }

        if data:
            jsonify(post_data)

            #response = requests.post(post_url, json=post_data, headers=header_data, timeout=5)
            #response.raise_for_status()

    except requests.exceptions.RequestException as e:
            print(f"Network error: {e}")
    except ValueError as e:
            print(f"JSON parsing error: {e}")




if __name__ == '__main__':
     app.run(debug=True)



