from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import os

options = Options()
options.add_argument('--headless=new')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--window-size=390,844')

try:
    driver = webdriver.Chrome(options=options)
    pages = [
        ('http://localhost:3000/', 'screenshot_mobile_home.png'),
        ('http://localhost:3000/work', 'screenshot_mobile_work.png'),
        ('http://localhost:3000/about', 'screenshot_mobile_about.png'),
        ('http://localhost:3000/contact', 'screenshot_mobile_contact.png'),
    ]

    for url, filename in pages:
        driver.get(url)
        time.sleep(1)
        out_path = os.path.join(os.getcwd(), filename)
        driver.save_screenshot(out_path)
        print(f"Captured {filename} (size: {os.path.getsize(out_path)} bytes)")

    driver.quit()
    print("Mobile screenshots captured successfully!")
except Exception as e:
    print("Error:", e)
