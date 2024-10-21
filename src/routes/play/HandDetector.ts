import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';

const DETECTOR_CONFIG = {
  runtime: 'mediapipe',
  maxHands: 1,
  modelType: 'full',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
                // or 'base/node_modules/@mediapipe/hands' in npm.
} as handPoseDetection.MediaPipeHandsMediaPipeModelConfig;

const ESTIMATION_CONFIG = {flipHorizontal: true};

export class HandDetector {
  private detector: handPoseDetection.HandDetector | undefined;
  
  /**
   * Create a MediaPipeHands model detector
   */
  public async init(): Promise<void> {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    this.detector = await handPoseDetection.createDetector(model, DETECTOR_CONFIG);
  }

  /**
   * Finds hands in the input video.
   * @param video The video to classify
   */
  public async run(video: HTMLVideoElement): Promise<handPoseDetection.Hand[]> {
    if (!this.detector) {
      throw new Error('Detector not initialized.');
    }

    const hands = await this.detector.estimateHands(video, ESTIMATION_CONFIG);
    return hands;
  }
}