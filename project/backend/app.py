from flask import Flask, request, jsonify, send_from_directory
from PIL import Image, ImageDraw, ImageFont
import os

app = Flask(__name__)

# Directory to store generated images
if not os.path.exists('generated_signatures'):
    os.makedirs('generated_signatures')

@app.route('/generate_signature', methods=['POST'])
def generate_signature():
    data = request.get_json()
    name = data.get('name')
    sector = data.get('sector')
    extension = data.get('extension')

    if not name or not sector or not extension:
        return jsonify({'error': 'Missing data'}), 400

    # Create an image
    width, height = 400, 100
    image = Image.new('RGB', (width, height), color = (255, 255, 255))
    draw = ImageDraw.Draw(image)

    # Choose a font
    try:
        font = ImageFont.truetype("arial.ttf", 15)
    except IOError:
        font = ImageFont.load_default()

    # Add text to image
    text = f"{name}\n{sector}\nRamal: {extension}"
    draw.text((10, 10), text, font=font, fill=(0, 0, 0))

    # Save the image
    image_name = f"{name.replace(' ', '_').lower()}_signature.jpg"
    image_path = os.path.join('generated_signatures', image_name)
    image.save(image_path)

    return jsonify({'image_path': f'/generated_signatures/{image_name}'})

@app.route('/generated_signatures/<path:filename>')
def get_image(filename):
    return send_from_directory('generated_signatures', filename)

if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)
    print("Flask app started.")
