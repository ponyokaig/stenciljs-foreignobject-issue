export enum AppElementType {
  image = 'svg-image',
  text = 'svg-text',
}

export interface AppSvgElementData {
  cmpId?: number;
  type: AppElementType;
  width: number;
  height: number;
  top: number;
  left: number;
  [anyOtherProp: string]: any;
}
