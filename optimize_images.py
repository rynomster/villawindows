import os
from PIL import Image

def optimize_images(directory, max_width=1920):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            filepath = os.path.join(directory, filename)
            try:
                with Image.open(filepath) as img:
                    # Original dimensions
                    width, height = img.size

                    # Resize if necessary
                    if width > max_width:
                        new_height = int(height * (max_width / width))
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        print(f"Resized {filename} to {max_width}px width.")

                    # Determine format and optimization settings
                    if filename.lower().endswith(('.jpg', '.jpeg')):
                        img.save(filepath, "JPEG", quality=85, optimize=True)
                        print(f"Optimized JPEG: {filename}")
                    elif filename.lower().endswith('.png'):
                        img.save(filepath, "PNG", optimize=True)
                        print(f"Optimized PNG: {filename}")
                    else:
                        img.save(filepath, optimize=True)
                        print(f"Optimized: {filename}")

            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images("assets/images")
