export class Camera {
  private video: HTMLVideoElement;
  private stream: MediaStream | null = null;

  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  /**
   * Initializes the webcam by requesting access to the user's camera
   * and streaming the video to the provided video element.
   */
  public async init(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.srcObject = this.stream;
      await this.video.play();
    } catch (error) {
      console.error('Error accessing webcam:', error);
      throw error;
    }
  }

  /**
   * Captures a snapshot from the video stream and returns it as a data URL.
   * @returns A string containing the image data URL.
   */
  public getSnapshot(): string {
    if (!this.video.videoWidth || !this.video.videoHeight) {
      throw new Error('Video stream not initialized or video dimensions unavailable.');
    }

    const canvas = document.createElement('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to get canvas rendering context.');
    }

    context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  }

  /**
   * Stops the video stream and releases the webcam resource.
   */
  public stop(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.video.pause();
    this.video.srcObject = null;
  }
}