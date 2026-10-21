import os
from PIL import Image
import pytesseract

cert_dir = 'certification'
for f in sorted(os.listdir(cert_dir)):
    p = os.path.join(cert_dir, f)
    try:
        im = Image.open(p)
        txt = pytesseract.image_to_string(im)
        print(f"==================== {f} ====================")
        lines = [line.strip() for line in txt.split('\n') if line.strip()]
        print('\n'.join(lines))
    except Exception as e:
        print(f"Error on {f}: {e}")
