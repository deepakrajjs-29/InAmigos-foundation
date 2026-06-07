import os
from PIL import Image, ImageDraw, ImageFont

# Path definitions
SCREENSHOT_DIR = '/home/deepakraj29/Desktop/intern/Task 2/screenshots'
ANNOTATED_DIR = '/home/deepakraj29/Desktop/intern/Task 2/screenshots_annotated'

if not os.path.exists(ANNOTATED_DIR):
    os.makedirs(ANNOTATED_DIR)

def draw_annotation(image_name, boxes, output_name=None):
    img_path = os.path.join(SCREENSHOT_DIR, image_name)
    if not os.path.exists(img_path):
        print(f"Error: {img_path} does not exist.")
        return
        
    img = Image.open(img_path)
    draw = ImageDraw.Draw(img)
    
    # Try to load a font, fall back to default
    try:
        # Load a standard font if available
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 20)
    except IOError:
        font = ImageFont.load_default()
        
    print(f"Annotating {image_name} (Size: {img.width}x{img.height})")
    
    for box in boxes:
        x1, y1, x2, y2, label = box
        
        # Adjust coordinates if they are out of bounds
        x1 = max(0, min(x1, img.width - 1))
        y1 = max(0, min(y1, img.height - 1))
        x2 = max(0, min(x2, img.width - 1))
        y2 = max(0, min(y2, img.height - 1))
        
        # Draw bounding box
        # We draw multiple times for thicker border
        for offset in range(3):
            draw.rectangle([x1-offset, y1-offset, x2+offset, y2+offset], outline="red")
            
        # Draw circular numbered badge
        badge_radius = 20
        badge_center_x = x1
        badge_center_y = y1
        draw.ellipse([badge_center_x - badge_radius, badge_center_y - badge_radius, 
                      badge_center_x + badge_radius, badge_center_y + badge_radius], fill="red")
        
        # Draw badge label text (number)
        text = str(label)
        # Simple center alignment check
        draw.text((badge_center_x - 6, badge_center_y - 12), text, fill="white", font=font)
        
    out_name = output_name if output_name else image_name
    out_path = os.path.join(ANNOTATED_DIR, out_name)
    img.save(out_path)
    print(f"Saved annotated image to {out_path}")

# Coordinate definitions based on actual visual elements from the web analysis
# Format: (x1, y1, x2, y2, number_label)

# 1. Desktop Home Hero annotations
home_hero_boxes = [
    # Blurry logo in top-left
    (20, 15, 120, 65, 1),
    # Header social bar in top-right
    (930, 20, 1100, 60, 2),
    # Uninspiring Hero image/slider content
    (50, 150, 1230, 750, 3)
]

# 2. Desktop Home About Us annotations (scroll-down screenshot)
home_about_boxes = [
    # Massive wall of text
    (200, 120, 1080, 500, 4)
]

# 3. Desktop Home Causes/Stats annotations
home_causes_boxes = [
    # Redundant/typo stats counters
    (50, 100, 1230, 700, 5)
]

# 4. Desktop Volunteers page annotations
volunteers_boxes = [
    # Inconsistent names & dummy emails in volunteers list
    (100, 350, 1180, 780, 6)
]

# 5. Desktop Blog page annotations
blog_boxes = [
    # Aggressive title truncation & static dates
    (100, 300, 1180, 950, 7)
]

# 6. Mobile contact card annotations
mobile_contact_boxes = [
    # Non-stacked side-by-side elements breaking page layout on mobile
    (10, 10, 365, 300, 8)
]

# Run annotations
draw_annotation('desktop_home_hero.png', home_hero_boxes, 'home_hero_annotated.png')
draw_annotation('desktop_home_about.png', home_about_boxes, 'home_about_annotated.png')
draw_annotation('desktop_home_causes.png', home_causes_boxes, 'home_causes_annotated.png')
draw_annotation('desktop_volunteers_full.png', volunteers_boxes, 'volunteers_annotated.png')
draw_annotation('desktop_blog_full.png', blog_boxes, 'blog_annotated.png')
draw_annotation('mobile_contact_cramped.png', mobile_contact_boxes, 'mobile_contact_annotated.png')
