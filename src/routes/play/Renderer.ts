import { Application, Graphics } from 'pixi.js';
import { Camera } from "./Camera";
import { HandDetector } from './HandDetector';

export class Renderer {
  private canvas: HTMLElement;
  private app: Application | undefined;
  private detector: HandDetector | undefined;
  private video: HTMLVideoElement;

  constructor(canvas: HTMLElement, video: HTMLVideoElement) {
    this.canvas = canvas;
    this.video = video;
  }

  /**
   * Create Pixi application and initialize the camera
   * and hand detector
   */
  public async init(): Promise<void> {
    this.app = new Application();
    await this.app.init({ resizeTo: window }).catch((error) => {
			console.error('Failed to initialize Pixi:', error);
      throw error(error);
		});
    this.canvas.appendChild(this.app.canvas);

    const webcam = new Camera(this.video);
    await webcam.init().catch((error) => {
      console.error('Failed to initialize webcam:', error);
      throw error;
    });

    this.detector = new HandDetector();
    await this.detector.init().catch((error) => {
      console.error('Failed to initialize detector:', error);
      throw error;
    });
  }

  /**
   * Start detecting hands from the camera
   * and draw the hand on the canvas
   */
  public start(): void {
    if (!this.app || !this.detector) {
      throw new Error('Renderer not initialized.');
    }

    // Get video and canvas dimensions
    const videoWidth = this.video.videoWidth;
    const videoHeight = this.video.videoHeight;
    const canvasWidth = this.app.renderer.width;
    const canvasHeight = this.app.renderer.height;

    // Calculate scaling factors
    const scaleX = canvasWidth / videoWidth;
    const scaleY = canvasHeight / videoHeight;

    // Create keypoints
    const keypoints: {x: number, y: number}[] = [];
    for (let i = 0; i <= 20; i++) {
      keypoints.push({ x: 0, y: 0 });
    }

    // Create a circle for each keypoint
    const circles: Graphics[] = [];
    keypoints.forEach(() => {
      const circle = new Graphics();
      circle.circle(0, 0, 5);
      circle.fill(0xff0000);
      circle.visible = false; // Hide initially
      circles.push(circle);
      this.app!.stage.addChild(circle);
    });

    // Define connections
    const connections = [
      [0,1], [1,2], [2,3], [3,4],
      [0,5], [5,6], [6,7], [7,8],
      [5,9], [9,10], [10,11], [11,12],
      [9,13], [13,14], [14,15], [15,16],
      [0,17], [13,17], [17,18], [18,19], [19,20],
      [2,5]
    ]

    // Create a line for each connection
    const lines = new Graphics();
    this.app!.stage.addChild(lines);

    // Start ticker
    this.app.ticker.add(async () => {
      const hands = await this.detector!.run(this.video); // Detect hands in the video

      lines.clear();

      if (hands.length > 0 && hands[0].keypoints) {
        // Update keypoints position
        keypoints.forEach((point, index) => {
          const keypoint = hands[0].keypoints[index];
          point.x = keypoint.x * scaleX;
          point.y = keypoint.y * scaleY;
        });

        // Place circles at keypoint positions
        circles.forEach((circle, index) => {
          const keypoint = keypoints[index];
          circle.position.set(keypoint.x, keypoint.y);
          circle.visible = true;
        });

        // Draw a line for each connection
        connections.forEach((connection) => {
          const x1 = keypoints[connection[0]].x;
          const y1 = keypoints[connection[0]].y;
          const x2 = keypoints[connection[1]].x;
          const y2 = keypoints[connection[1]].y;
          lines.moveTo(x1, y1);
          lines.lineTo(x2, y2);
          lines.stroke({ width: 1, color: 0x00ff00 });
        })
      } else {
        // Hide circles if no hands are detected
        circles.forEach((circle) => {
          circle.visible = false;
        });
      }
    });
  }
}
