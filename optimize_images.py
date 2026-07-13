import os
import sys
from PIL import Image
import pillow_avif

def optimize_and_resize(img_path, output_dir, base_name, widths, formats=['webp', 'avif']):
    if not os.path.exists(img_path):
        print(f"File not found: {img_path}")
        return

    with Image.open(img_path) as img:
        orig_width, orig_height = img.size
        aspect_ratio = orig_height / orig_width

        # Save original formats first if requested (not resizing, just optimized)
        for fmt in formats:
            out_name = f"{base_name}.{fmt}"
            out_path = os.path.join(output_dir, out_name)
            img.save(out_path, format=fmt, quality=80)
            print(f"Saved base optimized {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

        # Save resized versions
        for width in widths:
            if width > orig_width:
                continue
            height = int(width * aspect_ratio)
            resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
            for fmt in formats:
                out_name = f"{base_name}-{width}.{fmt}"
                out_path = os.path.join(output_dir, out_name)
                resized_img.save(out_path, format=fmt, quality=80)
                print(f"Saved {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

if __name__ == "__main__":
    os.makedirs("assets/images", exist_ok=True)

    # 1. Optimize Hero Image (adobe-stock-sash-repair.jpg)
    optimize_and_resize(
        img_path="assets/images/adobe-stock-sash-repair.jpg",
        output_dir="assets/images",
        base_name="adobe-stock-sash-repair",
        widths=[480, 768, 1280, 1920]
    )

    # 2. Optimize Logo (villa-windows-logo.png)
    optimize_and_resize(
        img_path="assets/images/villa-windows-logo.png",
        output_dir="assets/images",
        base_name="villa-windows-logo",
        widths=[121, 242]
    )

    # 3. Optimize Project Detail 3 (project-detail-3.png)
    optimize_and_resize(
        img_path="assets/images/project-detail-3.png",
        output_dir="assets/images",
        base_name="project-detail-3",
        widths=[325, 650]
    )
