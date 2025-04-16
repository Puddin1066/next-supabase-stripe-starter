import { spawn } from 'child_process';
import path from 'path';

export interface InferenceResult {
  angle: number;
  confidence: number;
  keypoints: Array<[number, number]>;
}

export const runInference = async (imagePath: string): Promise<InferenceResult> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), 'infer.py');
    const py = spawn('python3', [scriptPath, imagePath]);
    
    let result = '';
    let error = '';

    py.stdout.on('data', (data) => {
      result += data.toString();
    });

    py.stderr.on('data', (data) => {
      error += data.toString();
      console.error('Python stderr:', data.toString());
    });

    py.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${error}`));
        return;
      }

      try {
        const parsedResult = JSON.parse(result.trim());
        resolve(parsedResult);
      } catch (e) {
        reject(new Error(`Failed to parse inference result: ${e}`));
      }
    });
  });
}; 