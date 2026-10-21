import os
from PIL import Image
import pytesseract

ss_dir = 'screen shots'
for f in sorted(os.listdir(ss_dir)):
    p = os.path.join(ss_dir, f)
    try:
        im = Image.open(p)
        print(f"\n==================== {f} (size={im.size}, mode={im.mode}) ====================")
        txt = pytesseract.image_to_string(im)
        lines = [line.strip() for line in txt.split('\n') if line.strip()]
        print('\n'.join(lines[:12]))
    except Exception as e:
        print(f"Error on {f}: {e}")
