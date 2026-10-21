from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time
import os

options = Options()
options.add_argument('--headless=new')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--window-size=1440,1080')

try:
    driver = webdriver.Chrome(options=options)
    pages = [
        ('http://localhost:3000/', 'screenshot_home.png'),
        ('http://localhost:3000/work', 'screenshot_work.png'),
        ('http://localhost:3000/work/nexusguard', 'screenshot_nexusguard.png'),
        ('http://localhost:3000/about', 'screenshot_about.png'),
        ('http://localhost:3000/contact', 'screenshot_contact.png'),
    ]

    for url, filename in pages:
        driver.get(url)
        time.sleep(1.5)
        out_path = os.path.join(os.getcwd(), filename)
        driver.save_screenshot(out_path)
        print(f"Captured {filename} (size: {os.path.getsize(out_path)} bytes)")

    driver.quit()
    print("All screenshots captured successfully!")
except Exception as e:
    print("Error:", e)
