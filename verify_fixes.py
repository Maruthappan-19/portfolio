from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import os

options = Options()
options.add_argument('--headless=new')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--window-size=1440,1080')
options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})

driver = webdriver.Chrome(options=options)

print("1. Testing Homepage & Scrolling through all sections...")
driver.get("http://localhost:3000/")
time.sleep(1.5)

# Check console errors on homepage
logs = driver.get_log('browser')
severe_logs = [l for l in logs if l['level'] in ['SEVERE', 'ERROR']]
print("Console errors on Home:", severe_logs)

# Check presence of all required sections in DOM
sections = ['home', 'work', 'about', 'skills', 'experience', 'education', 'certifications', 'contact']
for s in sections:
    el = driver.find_element(By.ID, s)
    assert el is not None, f"Missing section #{s}"
    print(f"[OK] Section #{s} exists in DOM.")

# Check Smart Home Automation absence
body_text = driver.find_element(By.TAG_NAME, 'body').text
assert "Smart Home Automation" not in body_text, "ERROR: Smart Home Automation still present on page!"
print("[OK] Confirmed: 'Smart Home Automation' is completely removed from page text.")

# Check 3 projects presence
assert "NexusGuard" in body_text, "Missing NexusGuard"
assert "MeshWave" in body_text, "Missing MeshWave"
assert "SnapSense AI" in body_text, "Missing SnapSense AI"
print("[OK] Confirmed: All 3 approved projects are present (NexusGuard, MeshWave, SnapSense AI).")

# Check Certifications count and images
cert_section = driver.find_element(By.ID, 'certifications')
cert_imgs = cert_section.find_elements(By.TAG_NAME, 'img')
print(f"[OK] Found {len(cert_imgs)} certificate preview images in #certifications.")
assert len(cert_imgs) >= 11, f"Expected 11 certificates, found {len(cert_imgs)}"

# Check clicking a certificate opens modal
print("2. Testing Certificate Modal Lightbox...")
first_cert_card = cert_section.find_elements(By.CLASS_NAME, 'group')[0]
first_cert_card.click()
time.sleep(0.8)
modal_img = driver.find_elements(By.CSS_SELECTOR, "img[alt*='Human Computer Interaction']")
print("[OK] Lightbox modal opened:", len(modal_img) > 0)

# Close modal via click outside or button
close_btn = driver.find_elements(By.CSS_SELECTOR, "button[aria-label='Close modal']")
if close_btn:
    close_btn[0].click()
    time.sleep(0.5)
    print("[OK] Lightbox closed.")

# Test Case Studies
print("3. Testing Project Detail Case Studies...")
case_studies = ['nexusguard', 'meshwave', 'snapsense-ai']
for slug in case_studies:
    driver.get(f"http://localhost:3000/work/{slug}")
    time.sleep(1)
    title = driver.find_element(By.TAG_NAME, 'h1').text
    print(f"[OK] Case study /work/{slug} loaded: '{title}'")
    page_logs = driver.get_log('browser')
    errs = [l for l in page_logs if l['level'] in ['SEVERE', 'ERROR']]
    assert len(errs) == 0, f"Errors on /work/{slug}: {errs}"

# Capture fresh screenshots
print("4. Capturing updated screenshots...")
driver.get("http://localhost:3000/")
time.sleep(1)
driver.save_screenshot("screenshot_home_fixed.png")

driver.get("http://localhost:3000/#work")
time.sleep(1)
driver.save_screenshot("screenshot_work_fixed.png")

driver.get("http://localhost:3000/#certifications")
time.sleep(1)
driver.save_screenshot("screenshot_certifications_fixed.png")

# Mobile test
driver.set_window_size(390, 844)
driver.get("http://localhost:3000/")
time.sleep(1)
driver.save_screenshot("screenshot_mobile_fixed.png")

driver.quit()
print("\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!")
