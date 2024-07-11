from pathlib import Path
from flask import current_app
from uuid import uuid4

class ImageHandler:

    # Suffixes that correspond to an image file:
    image_suffixes = [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp", ".svg", ".heic", ".heif", ".psd", ".ico", ".raw", ".eps", ".ai", ".pdf"]

    # Save the image to disk with a unique name and return that name:
    @staticmethod
    def save_image(image):
        if not image.filename: return None
        suffix = Path(image.filename).suffix # Extract suffix
        image_name = str(uuid4()) + suffix # Create a unique name
        image_path = Path(current_app.root_path) / "static/images/vacations" / image_name # Get the image path
        image.save(image_path) # Saving the image to disk
        return image_name
    
    # Delete existing image:
    @staticmethod
    def delete_image(image_name):
        if not image_name: return # Do nothing if there's no image
        image_path = Path(current_app.root_path) / "static/images/vacations" / image_name # Get the image path
        image_path.unlink(missing_ok=True) # Delete the image from the disk, don't crash if file doesn't exist

    # Update existing image:
    @staticmethod
    def update_image(old_image_name, image):
        if not image.filename: return old_image_name # Return the old image name if there's no image
        image_name = ImageHandler.save_image(image) # Save new image with a new name
        ImageHandler.delete_image(old_image_name) # Delete the old image
        return image_name # Return the new name
    
    # Return image absolute path from image name:
    @staticmethod
    def get_image_path(image_name):
        image_path = Path(current_app.root_path) / "static/images/vacations" / image_name
        if not image_path.exists():
            image_path = Path(current_app.root_path) / "static/images/no-image.jpg"
        return image_path