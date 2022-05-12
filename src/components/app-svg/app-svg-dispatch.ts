import {AppSvgElementData} from "./app-svg-interface";

const emit = (name: string) => (detail: AppSvgElementData) => {
  const event = new CustomEvent(name, {
    detail: detail
  });
  document.dispatchEvent(event);
}

export const dispatchAppSvgAddItem = emit('appSvgAddItem');
