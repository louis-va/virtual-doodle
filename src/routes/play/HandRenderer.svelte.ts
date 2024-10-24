import { Application, Graphics } from 'pixi.js';
import { Camera } from "./Camera";
import { HandDetector } from './HandDetector';
import { addPoint, newStroke } from './state.svelte';

const COLORS = {
  hand: 0x00FF4D,
  touch: 0xFF0051,
  crosshair: 0xFEFFED
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
   * Create Pixi application and initialize the camera and hand detector
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
   * Start detecting hands from the camera and draw the hand on the canvas
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
      [2,5], [0,5], [5,6], [6,7], [7,8],
      [5,9], [9,10], [10,11], [11,12],
      [9,13], [13,14], [14,15], [15,16],
      [0,17], [13,17], [17,18], [18,19], [19,20],
    ]

    // Create a line for each connection
    const lines = new Graphics();
    this.pixi!.stage.addChild(lines);

    // Create a circle for each keypoint
    const circles: Graphics[] = [];
    keypoints.forEach(() => {
      const circle = new Graphics();
      circles.push(circle);
      this.pixi!.stage.addChild(circle);
    });

    // Create an indicator where the player will draw
    const crosshair = new Graphics();
    crosshair.circle(0, 0, 2);
    crosshair.fill(COLORS.crosshair);
    this.pixi!.stage.addChild(crosshair);

    // Define the time between inputPoints recording
    let lastPushTime = 0;
    const throttleInterval = 25; // milliseconds

    // Define the time between the creation of a new stroke when the user stops drawing
    // This is to avoid creating new strokes when the touch detector skips a loop
    let pausedTime = 0;
    const pauseInterval = 100; // milliseconds

    // Start ticker
    this.pixi.ticker.add(async () => {
      const hands = await this.detector!.run(this.video); // Detect hands in the video

      const currentTime = Date.now(); // Record current time

      lines.clear(); // Reset lines

      if (hands.length > 0 && hands[0].keypoints) {
        // Use only first hand
        const hand = hands[0].keypoints;
        
        // Check if thumb and index tips touch
        const thumbTip = hand[4];
        const indexTip = hand[8];
        const distance = Math.sqrt(
          Math.pow(thumbTip.x - indexTip.x, 2) + 
          Math.pow(thumbTip.y - indexTip.y, 2)
        );
        const touchThreshold = 25;
        const isTouching = distance < touchThreshold;

        // Calculate point between thumb and index tips
        const drawCoordinates = {
          x: ((hand[4].x + hand[8].x) / 2) * scaleX,
          y: ((hand[4].y + hand[8].y) / 2) * scaleY,
        }

        // Display crosshair
        crosshair.position.set(drawCoordinates.x, drawCoordinates.y);
        crosshair.visible = true;

        if (isTouching) {
          // Reset pausedTime
          pausedTime = 0;
          
          // Records coordonates where to draw, throttled to throttleInterval
          if (currentTime - lastPushTime > throttleInterval) {
            addPoint([drawCoordinates.x, drawCoordinates.y]);
            lastPushTime = currentTime;
          }
        } else {
          // Create new stroke if enough time has passed while drawing paused
          pausedTime = pausedTime===0 ? currentTime : pausedTime;
          if (currentTime - pausedTime > pauseInterval) {
            newStroke();
            lastPushTime = currentTime;
          }
        }

        // Update keypoints position
        keypoints.forEach((point, index) => {
          const keypoint = hand[index];
          point.x = keypoint.x * scaleX;
          point.y = keypoint.y * scaleY;
        });

        // Place circles at keypoint positions
        circles.forEach((circle, index) => {
          const keypoint = keypoints[index];

          // Clear previous drawings
          circle.clear();
          // Set circles based on if thumb and index are touching
          if (isTouching && (index === 4 || index === 8)) {
            circle.circle(0, 0, 8);
            circle.fill(COLORS.touch);
          } else {
            circle.circle(0, 0, 4);
            circle.fill(COLORS.hand);
          }
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
        crosshair.visible = false;
      }
    });
  }
}
