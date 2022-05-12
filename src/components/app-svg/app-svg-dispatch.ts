import {AppSvgElementData, AppSvgRender} from "./app-svg-interface";

const emit = <T>(name: string) => (detail: T) => {
  const event = new CustomEvent(name, {
    detail: detail
  });
  document.dispatchEvent(event);
}

export const dispatchAppSvgAddItem = emit<AppSvgElementData>('appSvgAddItem');

export const dispatchUseRenderer = emit<AppSvgRender>('appUseRenderer');
