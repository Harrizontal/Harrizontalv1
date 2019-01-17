---
title: Screenscrapping JavaScript Websites using Python
date: "2018-12-14T23:46:37.121Z"
posttype: "blog"
cover_image: "./datascrapper.jpeg"
description: Screenscrapers open your website in a real browser (e.g FireFox, Chrome, etc), getting the HTML, and then use a HTML parse to extract the desired data.
---

In this short and easy tutorial, we going to learn how to use Selenium-wire (with selenium) to extract information from a JavaScript heavy website.

In order to run the codes, you need to have some prior knowledge on Selenium 
```python
from seleniumwire import webdriver  # Import from seleniumwire
import json
import datetime
# Create a new instance of the Chrome driver
chrome_options = webdriver.ChromeOptions()
chrome_options.accept_untrusted_certs = True
chrome_options.assume_untrusted_cert_issuer = True
chrome_options.add_argument("--allow-running-insecure-content")
chrome_options.add_argument("--ignore-certificate-errors")
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("test-type")
chrome_options.add_argument("--disable-web-security")
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(
        chrome_options=chrome_options
)

```

```python
def retrieveMovieList():
        print("Executing retrieveMovieList function...")
        driver = webdriver.Chrome(chrome_options=chrome_options)
        # # Go to the Google home page
        driver.get("https://www.gv.com.sg/#/")

        # Access requests via the `requests` attribute
        for request in driver.requests:
                if request.response:
                        if "homenowshowing" in request.path: # We are taking those api that contains homenowshowing
                                f = open('movielist.json',"w")
                                movieResults = json.dumps(request.response.body,indent=4)
                                f.write(movieResults)
                                f.close()
        driver.close()
        print("retrieveMovieList function completed")
```

```python
movieTitleArray = []
movieIdArray = []
linkArray = []

def generateMovieListLinks():
        print("Generating links for movie list")
        f = open('movielist.json')
        data = json.load(f)
        for item in data['data']:
                movieTitleArray.append(item['filmTitle'])
                movieIdArray.append(item['filmCd'])
                linkArray.append("https://www.gv.com.sg/GVMovieDetails#/movie/"+str(item['filmCd']))
                print(str(item['filmTitle']))
        f.close()
        print("Generating links for movie list completed")

def retrieveMovieTiming(movieTitleArray, movieIdArray, linkArray):
        print("Executing retrieveMovieTiming function...")
        driver = webdriver.Chrome(chrome_options=chrome_options)
        for i in range(len(movieIdArray)):
                print(movieTitleArray[i]+ "Accessing link: " + linkArray[i]) 
                driver.get(linkArray[i])
                for request in driver.requests:
                        if request.response:
                                if "sessionforfilm" in request.path:
                                        string = movieTitleArray[i]
                                        filename = 'MovieTimings/movietiming'+string+'.json'
                                        f = open(filename,"w")
                                        movieResults = json.dumps(request.response.body, indent=4)
                                        f.write(movieResults)
                                        f.close()
                driver.back()
        driver.quit()
        print("retrieveMovieTiming function completed")

```
```python
    retrieveMovieList()
    generateMovieListLinks()
    retrieveMovieTiming(movieTitleArray, movieIdArray,linkArray)
```