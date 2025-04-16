import sys
import json
from ultralytics import YOLO
import cv2
import numpy as np

def calculate_angle(points):
    if len(points) < 3:
        return 0, 0
    
    # Convert points to numpy array
    points = np.array(points)
    
    # Calculate vectors
    v1 = points[1] - points[0]
    v2 = points[2] - points[1]
    
    # Calculate angle
    cos_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
    angle = np.arccos(np.clip(cos_angle, -1.0, 1.0))
    angle_degrees = np.degrees(angle)
    
    return angle_degrees, 1.0  # Return angle and confidence

def main():
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Please provide an image path"}))
        sys.exit(1)

    image_path = sys.argv[1]
    
    try:
        # Load YOLOv8 model
        model = YOLO('yolov8n.pt')
        
        # Run inference
        results = model(image_path)
        
        # Process results
        result = results[0]
        boxes = result.boxes
        
        if len(boxes) == 0:
            print(json.dumps({
                "error": "No objects detected",
                "angle": 0,
                "confidence": 0,
                "keypoints": []
            }))
            sys.exit(0)
        
        # Get keypoints for the first detected object
        keypoints = boxes[0].keypoints.data[0].cpu().numpy().tolist()
        
        # Calculate angle
        angle, confidence = calculate_angle(keypoints)
        
        # Prepare output
        output = {
            "angle": float(angle),
            "confidence": float(confidence),
            "keypoints": keypoints
        }
        
        print(json.dumps(output))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main() 