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

print("1. Opening Homepage http://localhost:3000/ ...")
driver.get("http://localhost:3000/")
time.sleep(1.5)

# Verify console errors
logs = driver.get_log('browser')
severe_logs = [l for l in logs if l['level'] in ['SEVERE', 'ERROR']]
print("Console errors on Home:", severe_logs)
assert len(severe_logs) == 0, f"Errors found: {severe_logs}"

# Check presence of all specific category sections
sections = ['home', 'work', 'about', 'skills', 'experience', 'education', 'certifications', 'contact']
for s in sections:
    el = driver.find_element(By.ID, s)
    assert el is not None, f"Missing section #{s}"
    print(f"[OK] Section #{s} exists in DOM.")

# Check Navbar items
nav = driver.find_element(By.TAG_NAME, 'nav')
nav_text = nav.text
print("Navbar items present:", nav_text)
assert "Skills" in nav_text, "Missing Skills in nav"
assert "Experience" in nav_text, "Missing Experience in nav"
assert "Education" in nav_text, "Missing Education in nav"
assert "Certifications" in nav_text, "Missing Certifications in nav"
print("[OK] Confirmed: Navbar features specific navigation links for Skills, Experience, Education, Certifications!")

# Check profile picture has no overlay content covering it
profile_img = driver.find_element(By.CSS_SELECTOR, "#home img")
assert profile_img is not None, "Profile image missing"
# Check if old badge text exists inside the image container
parent_container = profile_img.find_element(By.XPATH, "..")
parent_text = parent_container.text.strip()
print("Text inside profile image card:", repr(parent_text))
assert parent_text == "", f"Expected clean profile image without overlay text, found: {parent_text}"
print("[OK] Confirmed: Profile photo is completely clean without any overlay text!")

# Check BigLearn Internship and Certificate
print("2. Checking BigLearn Internship & Certificate...")
experience_sec = driver.find_element(By.ID, 'experience')
assert "BigLearn" in experience_sec.text, "Missing BigLearn in experience section"
print("[OK] BigLearn internship present in #experience.")

# Check BigLearn "View Certificate" button
biglearn_cert_btn = experience_sec.find_element(By.XPATH, ".//h3[contains(text(), 'Generative AI Intern')]/..//button")
assert biglearn_cert_btn is not None, "BigLearn View Certificate button missing"
print("[OK] Found BigLearn View Certificate button. Clicking it...")
biglearn_cert_btn.click()
time.sleep(0.8)

# Check modal opened with BigLearn certificate
modal_img = driver.find_element(By.CSS_SELECTOR, "div.fixed img")
src = modal_img.get_attribute('src')
print(f"[OK] Modal opened displaying image: {src}")
assert "internship_biglearn.jpg" in src, f"Expected BigLearn certificate image, got {src}"

# Close modal
close_btn = driver.find_element(By.CSS_SELECTOR, "button[aria-label='Close modal']")
close_btn.click()
time.sleep(0.5)
print("[OK] Certificate modal closed.")

# Check total certificates in #certifications
cert_section = driver.find_element(By.ID, 'certifications')
cert_imgs = cert_section.find_elements(By.TAG_NAME, 'img')
print(f"[OK] Total certificates in #certifications: {len(cert_imgs)}")
assert len(cert_imgs) == 12, f"Expected 12 certificates (including BigLearn), found {len(cert_imgs)}"

# Check scrolling and content slowly appearing feature
print("3. Testing Scroll Reveal Animation...")
# Scroll down step by step and check is-visible class additions
scroll_positions = [600, 1200, 1800, 2400, 3200, 4000]
for pos in scroll_positions:
    driver.execute_script(f"window.scrollTo(0, {pos});")
    time.sleep(0.4)

revealed_count = len(driver.find_elements(By.CSS_SELECTOR, ".scroll-reveal.is-visible"))
print(f"[OK] Revealed elements count after scrolling: {revealed_count}")
assert revealed_count > 10, "Scroll reveal elements did not activate on scrolling"

# Capture screenshots
print("4. Capturing updated screenshots...")
driver.execute_script("window.scrollTo(0, 0);")
time.sleep(0.5)
driver.save_screenshot("screenshot_profile_clean.png")

driver.execute_script("document.getElementById('experience').scrollIntoView();")
time.sleep(0.5)
driver.save_screenshot("screenshot_experience_biglearn.png")

driver.execute_script("document.getElementById('certifications').scrollIntoView();")
time.sleep(0.5)
driver.save_screenshot("screenshot_certifications_12.png")

# Mobile test
driver.set_window_size(390, 844)
driver.get("http://localhost:3000/")
time.sleep(0.8)
driver.save_screenshot("screenshot_mobile_updated.png")

driver.quit()
print("\nALL BIGLEARN, PROFILE CLEANUP, SPECIFIC SECTIONS, AND SCROLL REVEAL TESTS PASSED!")
