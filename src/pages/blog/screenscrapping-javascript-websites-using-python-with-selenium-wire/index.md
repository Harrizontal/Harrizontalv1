---
title: Screenscrapping JavaScript Websites using Python with Selenium-wire
date: "2019-01-23T21:30:00.121Z"
posttype: "blog"
cover_image: "./datascrapper.jpeg"
description: Screenscrapers open your website in a real browser (e.g FireFox, Chrome, etc), getting the HTML, and then use a HTML parse to extract the desired data.
---

In this short and easy tutorial, we going to learn how to use Selenium-wire (with selenium) to extract information from a JavaScript heavy website.

[![Image from Gyazo](https://i.gyazo.com/2d1500c9011cf3d8d607480c4025c6a1.gif)](https://gyazo.com/2d1500c9011cf3d8d607480c4025c6a1)

Before diving to the source code, you need to have some prior knowledge on Selenium 
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

[![Image from Gyazo](https://i.gyazo.com/4f3875a1f80dfbe898f7843ad0785c3a.gif)](https://gyazo.com/4f3875a1f80dfbe898f7843ad0785c3a)

[![Image from Gyazo](https://i.gyazo.com/164aa57efd21a23ec604df3768187381.gif)](https://gyazo.com/164aa57efd21a23ec604df3768187381)