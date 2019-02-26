---
title: Screenscrapping JavaScript Websites using Python with Selenium-wire
date: "2019-01-23T21:30:00.121Z"
posttype: "blog"
cover_image: "./datascrapper.jpeg"
description: Screenscrapers open your website in a real browser (e.g FireFox, Chrome, etc), getting the HTML, and then use a HTML parse to extract the desired data.
---

In this short and easy tutorial, we going to learn how to use Selenium-wire (with selenium) to extract information from a JavaScript heavy website.

Let's do some analytic work on how Golden Village display the movie information (list of movies, timeslots, movie halls, etc) in their website. One example is through the Chrome DevTools where you can inspect the HTML(including DOM), CSS and JavaScript files. 

During the process, I realised when Golden Village website took quite some time (not so long) to render their website properly as they are made several HTTP request to retrieve the content such as images, json (through an API endpoint). Hence, I decided to took a look at the [Network Log](https://developers.google.com/web/tools/chrome-devtools/network/#load) of the website through the use of Chrome DevTools. This is what I found - an API endpoint to retrieve the movie information but with a twist, obfuscation with a query parameter, time in milliseconds.

To the best of my knowledge, I realised that there are two ways to retrieve the data. First, I can simply do a HTTP request with a query parameter of the current timestamp, but... I have do a mock up of User Agent header with the request. Subsequently, the query parameter in the API endpoint could be further obfuscrated (e.g current timestamp - 10sec, or +10sec, etc). The second way is to simulate a real user accessing the website through Selenium, and there is no need to mask a User Agent or decipher the API endpoint. However, the cons of using Selenium for screenscrapping is slow performance as compared to the traditional web scrapping methods (e.g beautiful soups, directly call API endpoint). By outweighting the pros and cons of thees two method, I decided to approach the Selenium method because it is the quickest way for me to get these movie information.

[![Image from Gyazo](https://i.gyazo.com/2d1500c9011cf3d8d607480c4025c6a1.gif)](https://gyazo.com/2d1500c9011cf3d8d607480c4025c6a1)



Before diving to the source code, you need to have some prior knowledge on Selenium. In addition, you have to [install SeleniumWire](https://pypi.org/project/selenium-wire/) to capture all HTTPS/HTTP requests.

```python
from seleniumwire import webdriver  # Import from seleniumwire
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
retrieveMovieList()
```

Execute the python code and wait for the screenscraper to scrap the data from the website.

[![Image from Gyazo](https://i.gyazo.com/4f3875a1f80dfbe898f7843ad0785c3a.gif)](https://gyazo.com/4f3875a1f80dfbe898f7843ad0785c3a)

You should get the result via a json file in the project file directory.

[![Image from Gyazo](https://i.gyazo.com/164aa57efd21a23ec604df3768187381.gif)](https://gyazo.com/164aa57efd21a23ec604df3768187381)