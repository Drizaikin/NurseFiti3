import fitz  # PyMuPDF
import os
import sys

def extract_high_res_images(pdf_path, output_dir, min_width=800, min_height=800):
    """
    Extracts high-resolution images from a PDF file.
    Only images with width and height greater than the specified minimums are saved.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Opening {pdf_path}...")
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Failed to open PDF: {e}")
        return

    extracted_count = 0
    total_images = 0

    for page_index in range(len(doc)):
        page = doc[page_index]
        image_list = page.get_images(full=True)
        
        if image_list:
            print(f"Found {len(image_list)} images on page {page_index + 1}")
        
        for img_index, img in enumerate(image_list, start=1):
            total_images += 1
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            width = base_image.get("width", 0)
            height = base_image.get("height", 0)

            # Check if the image meets the resolution criteria
            if width >= min_width and height >= min_height:
                image_name = f"page{page_index + 1}_img{img_index}.{image_ext}"
                image_path = os.path.join(output_dir, image_name)
                
                with open(image_path, "wb") as f:
                    f.write(image_bytes)
                
                print(f"  Saved: {image_name} ({width}x{height})")
                extracted_count += 1
            else:
                pass # skip small images (icons, background patterns, etc.)

    print(f"\nExtraction complete!")
    print(f"Total images found: {total_images}")
    print(f"High-res images extracted: {extracted_count}")
    print(f"Saved to: {output_dir}")
    print("\nYou can now browse the output folder, select the best diagrams, upload them to Supabase Storage, and update the flashcards' image_url with the links!")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python extract_pdf_images.py <path_to_pdf> <output_directory>")
        print("Example: python extract_pdf_images.py \"../docs/anatomy and physiology/Guyton.pdf\" \"./extracted_images\"")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    output_dir = sys.argv[2]
    
    # You can tweak min_width and min_height to filter for larger 2k+ images
    extract_high_res_images(pdf_path, output_dir, min_width=1000, min_height=1000)
