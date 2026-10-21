from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument('--headless=new')
options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})

driver = webdriver.Chrome(options=options)
pages = [
    'http://localhost:3000/',
    'http://localhost:3000/work',
    'http://localhost:3000/work/nexusguard',
    'http://localhost:3000/work/snapsense-ai',
    'http://localhost:3000/work/meshwave',
    'http://localhost:3000/work/smart-home-automation',
    'http://localhost:3000/about',
    'http://localhost:3000/contact',
]

has_errors = False
for url in pages:
    driver.get(url)
    time.sleep(0.5)
    logs = driver.get_log('browser')
    errors = [l for l in logs if l['level'] in ['SEVERE', 'ERROR']]
    if errors:
        has_errors = True
        print(f"Errors on {url}:", errors)
    else:
        print(f"[OK] {url} - 0 errors")

driver.quit()
if not has_errors:
    print("PERFECT: 0 browser console errors across all pages and routes!")
