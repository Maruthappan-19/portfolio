import os
import shutil
from PIL import Image, ImageEnhance

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENT_PUBLIC = os.path.join(BASE_DIR, 'client', 'public', 'assets')

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def process_and_copy():
    # 1. Resume
    resume_dest = os.path.join(CLIENT_PUBLIC, 'resume')
    ensure_dir(resume_dest)
    resume_src = os.path.join(BASE_DIR, 'MaruthappanM_Resume.pdf')
    if os.path.exists(resume_src):
        shutil.copy2(resume_src, os.path.join(resume_dest, 'MaruthappanM_Resume.pdf'))
        print("Copied resume PDF.")

    # 2. Profile Photo
    profile_dest = os.path.join(CLIENT_PUBLIC, 'profile')
    ensure_dir(profile_dest)
    prof_src = os.path.join(BASE_DIR, 'profile pic.jpeg')
    if os.path.exists(prof_src):
        with Image.open(prof_src) as img:
            # Slight color and contrast preservation
            img_rgb = img.convert('RGB')
            # Save high-res
            img_rgb.save(os.path.join(profile_dest, 'maruthappan.jpg'), quality=95, optimize=True)
            # Create a thumbnail / web version
            img_thumb = img_rgb.copy()
            img_thumb.thumbnail((800, 1000), Image.Resampling.LANCZOS)
            img_thumb.save(os.path.join(profile_dest, 'maruthappan_web.jpg'), quality=92, optimize=True)
            print("Processed profile picture.")

    # 3. Certificates
    cert_src_dir = os.path.join(BASE_DIR, 'certification')
    cert_dest_dir = os.path.join(CLIENT_PUBLIC, 'certificates')
    ensure_dir(cert_dest_dir)
    if os.path.exists(cert_src_dir):
        for f in os.listdir(cert_src_dir):
            if f.lower().endswith(('.jpeg', '.jpg', '.png')):
                src_path = os.path.join(cert_src_dir, f)
                with Image.open(src_path) as img:
                    img_rgb = img.convert('RGB')
                    # Save optimized preview
                    clean_name = f.replace(' ', '_').lower()
                    img_rgb.save(os.path.join(cert_dest_dir, clean_name), quality=92, optimize=True)
                    print(f"Processed certificate: {clean_name}")

    # 4. Project Screenshots
    ss_src_dir = os.path.join(BASE_DIR, 'screen shots')
    proj_base = os.path.join(CLIENT_PUBLIC, 'projects')
    ensure_dir(proj_base)
    
    ng_dest = os.path.join(proj_base, 'nexusguard')
    ss_dest = os.path.join(proj_base, 'snapsense')
    mw_dest = os.path.join(proj_base, 'meshwave')
    sh_dest = os.path.join(proj_base, 'smarthome')
    for d in [ng_dest, ss_dest, mw_dest, sh_dest]:
        ensure_dir(d)

    if os.path.exists(ss_src_dir):
        for f in os.listdir(ss_src_dir):
            src_path = os.path.join(ss_src_dir, f)
            fl = f.lower()
            if fl.startswith('ng'):
                target_folder = ng_dest
            elif fl.startswith('ss'):
                target_folder = ss_dest
            elif fl.startswith('mw') or fl.startswith('m23'):
                target_folder = mw_dest
            else:
                target_folder = sh_dest

            with Image.open(src_path) as img:
                # If image is very huge (like mw1, mw2 > 2000px and 9MB PNG), downscale max dimension to 2000px while retaining crisp text
                w, h = img.size
                img_to_save = img.copy()
                if max(w, h) > 2000:
                    scale = 2000 / max(w, h)
                    img_to_save = img_to_save.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
                
                # Check format
                target_file = os.path.join(target_folder, fl)
                if fl.endswith('.png'):
                    img_to_save.save(target_file, optimize=True)
                else:
                    img_to_save.convert('RGB').save(target_file, quality=94, optimize=True)
                print(f"Processed screenshot {f} -> {target_folder}")

if __name__ == '__main__':
    process_and_copy()
