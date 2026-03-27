import requests

URL = 'https://news.ycombinator.com/'
response = requests.get(URL)
html_content = response.text
print(html_content)

