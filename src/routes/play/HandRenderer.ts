import { Application, Graphics } from 'pixi.js';
import { Camera } from "./Camera";
import { HandDetector } from './HandDetector';

const COLORS = {
  hand: 0x00FF4D,
  touch: 0xFF0051,
}

export class HandRenderer {
  private container: HTMLElement;
  private video: HTMLVideoElement;
  private pixi: Application | undefined;
  private detector: HandDetector | undefined;

  constructor(container: HTMLElement) {
    this.container = container;

    // Create the video element
    this.video = document.createElement('video');
    this.video.style.display = 'none';
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.setAttribute('aria-hidden', 'true');
    this.container.appendChild(this.video);
  }

  /**
   * Create Pixi application and initialize the camera
   * and hand detector
   */
  public async init(): Promise<void> {
    this.pixi = new Application();
    await this.pixi.init({ resizeTo: window, antialias: true, backgroundAlpha: 0 }).catch((error) => {
			console.error('Failed to initialize Pixi:', error);
      throw error(error);
		});
    this.container.appendChild(this.pixi.canvas);

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
    if (!this.pixi || !this.detector) {
      throw new Error('Renderer not initialized.');
    }

    // Get video and canvas dimensions
    const videoWidth = this.video.videoWidth;
    const videoHeight = this.video.videoHeight;
    const canvasWidth = this.pixi.renderer.width;
    const canvasHeight = this.pixi.renderer.height;

    // Calculate scaling factors
    const scaleX = canvasWidth / videoWidth;
    const scaleY = canvasHeight / videoHeight;

    // Create keypoints
    const keypoints: {x: number, y: number}[] = [];
    for (let i = 0; i <= 20; i++) {
      keypoints.push({ x: 0, y: 0 });
    }

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
    this.pixi!.stage.addChild(lines);

    // Create a circle for each keypoint
    const circles: Graphics[] = [];
    keypoints.forEach(() => {
      const circle = new Graphics();
      circle.circle(0, 0, 4);
      circle.fill(COLORS.hand);
      circle.visible = false; // Hide initially
      circles.push(circle);
      this.pixi!.stage.addChild(circle);
    });

    // Start ticker
    this.pixi.ticker.add(async () => {
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
          lines.stroke({ width: 1, color: COLORS.hand });
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
