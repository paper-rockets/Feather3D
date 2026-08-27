import { FeatherCurve, FeatherCurveData } from '../scene/FeatherCurve';

export interface FeatherClipboardData {
  format: 'feather-clipboard';
  version: '1.0.0';
  curves: FeatherCurveData[];
}

export class ClipboardService {
  public static async copyCurves(curves: FeatherCurve[]): Promise<boolean> {
    if (curves.length === 0) return false;

    const data: FeatherClipboardData = {
      format: 'feather-clipboard',
      version: '1.0.0',
      curves: curves.map(c => c.toJSON())
    };

    try {
      const json = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(json);
      return true;
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      return false;
    }
  }

  public static async pasteCurves(): Promise<FeatherCurveData[] | null> {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);
      if (parsed && parsed.format === 'feather-clipboard' && Array.isArray(parsed.curves)) {
        return parsed.curves;
      }
      return null;
    } catch (err) {
      console.warn('Clipboard read failed:', err);
      return null;
    }
  }
}
