import { Viewport } from '../core/Viewport';

export class TurntableRecorder {
  private isRecording: boolean = false;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  public startRecording(
    viewport: Viewport,
    durationMs: number = 4000,
    onProgress?: (progress: number) => void,
    onComplete?: () => void
  ): boolean {
    if (this.isRecording) return false;

    const stream = viewport.canvas.captureStream(60);
    const options = { mimeType: 'video/webm;codecs=vp9' };

    try {
      this.mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
      try {
        this.mediaRecorder = new MediaRecorder(stream);
      } catch (err) {
        console.error('MediaRecorder not supported on this browser', err);
        return false;
      }
    }

    this.recordedChunks = [];
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'turntable.webm';
      link.click();
      URL.revokeObjectURL(url);
      this.isRecording = false;
      if (onComplete) onComplete();
    };

    this.isRecording = true;
    this.mediaRecorder.start();

    const startTime = performance.now();
    const startTheta = viewport.theta;

    const step = (time: number) => {
      if (!this.isRecording) return;
      const elapsed = time - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);

      viewport.theta = startTheta + progress * Math.PI * 2;
      viewport.updateCameraPosition();

      if (onProgress) onProgress(progress);

      if (progress < 1.0) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
          }
        }, 200);
      }
    };

    requestAnimationFrame(step);
    return true;
  }
}
