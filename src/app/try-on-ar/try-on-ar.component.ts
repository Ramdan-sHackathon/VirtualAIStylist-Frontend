import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Pose } from '@mediapipe/pose';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
import { Camera } from '@mediapipe/camera_utils';

@Component({
  selector: 'app-try-on-ar',
  standalone: true,
  templateUrl: './try-on-ar.component.html',
  styleUrls: ['./try-on-ar.component.css']
})
export class TryOnArComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  video!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D | null;
  selectedClothing: HTMLImageElement = new Image();
  pose!: Pose;
  segmentation!: SelfieSegmentation;
  landmarks: any = null;
  maskCanvas!: HTMLCanvasElement;
  maskContext!: CanvasRenderingContext2D | null;

  ngAfterViewInit() {
    this.selectedClothing.src = 'outfit/jacket-outfit.png';
    this.initPoseTracking();
    this.initSegmentation();
  }

  async initPoseTracking() {
    this.video = this.videoElement.nativeElement;
    this.canvas = this.canvasElement.nativeElement;
    this.context = this.canvas.getContext('2d');

    const camera = new Camera(this.video, {
      onFrame: async () => {
        await this.pose.send({ image: this.video });
        await this.segmentation.send({ image: this.video });
      },
      width: 640,
      height: 480
    });
    camera.start();

    this.pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });
    this.pose.setOptions({ modelComplexity: 1, smoothLandmarks: true });
    this.pose.onResults((results) => {
      this.landmarks = results.poseLandmarks;
      this.renderFrame();
    });
  }

  async initSegmentation() {
    this.maskCanvas = document.createElement('canvas');
    this.maskContext = this.maskCanvas.getContext('2d');
    this.maskCanvas.width = 640;
    this.maskCanvas.height = 480;

    this.segmentation = new SelfieSegmentation({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    });
    this.segmentation.setOptions({ modelSelection: 1 });
    this.segmentation.onResults(async (results) => {
      const maskImage = await createImageBitmap(results.segmentationMask);
      this.applyMask(maskImage);
    });
  }

  applyMask(maskImage: ImageBitmap) {
    if (!this.maskContext) return;

    this.maskContext.clearRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    this.maskContext.globalCompositeOperation = 'source-in';
    this.maskContext.drawImage(maskImage, 0, 0, this.maskCanvas.width, this.maskCanvas.height);
  }

  renderFrame() {
    if (!this.context || !this.landmarks) return;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    this.context.globalCompositeOperation = 'destination-out';
    this.context.drawImage(this.maskCanvas, 0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = 'source-over';

    const leftShoulder = this.landmarks[11];
    const rightShoulder = this.landmarks[12];
    const leftHip = this.landmarks[23];
    const rightHip = this.landmarks[24];

    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x) * this.canvas.width;
      const hipWidth = Math.abs(rightHip.x - leftHip.x) * this.canvas.width;

      const width = Math.max(shoulderWidth, hipWidth) * 1.5;
      const height = width * 1.5;

      const centerX = (leftShoulder.x + rightShoulder.x) / 2 * this.canvas.width;
      const centerY = (leftShoulder.y + rightShoulder.y) / 2 * this.canvas.height + 50; // ✅ إنزال الملابس قليلًا

      const angle = Math.atan2(rightShoulder.y - leftShoulder.y, rightShoulder.x - leftShoulder.x);

      this.context.save();
      this.context.translate(centerX, centerY);
      // this.context.rotate(angle);
      this.context.drawImage(this.selectedClothing, -width / 2, -height / 3, width, height);
      this.context.restore();
    }
  }

  changeClothing(imagePath: string) {
    this.selectedClothing.src = imagePath;
  }
}
