import {FunctionalComponent, h} from "@stencil/core";
import {AppElementType, AppSvgElementData} from "./app-svg-interface";


const onTextKeyDown = (ev: KeyboardEvent): void => {
  ev.stopPropagation();

  if (ev.key.toLowerCase() === 'escape') {
    (ev.target as HTMLDivElement).blur();
  }
}

const onTextFocus = (ev: FocusEvent): void => {
  const target = ev.target as HTMLDivElement
  const foreignObject = target.parentNode as SVGSVGElement;

  foreignObject.classList.add('edit-mode');

  const range = document.createRange();
  range.selectNodeContents(target);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

const onTextBlur = (ev: FocusEvent): void => {
  const foreignObject = (ev.target as HTMLDivElement).parentNode as SVGSVGElement;

  foreignObject.classList.remove('edit-mode');

  window.getSelection().removeAllRanges();
}

const createSvgFromObject = (item: AppSvgElementData) => {
  const { cmpId, type, width, height, left, top } = item;

  const style = {
    width: `${width}px`,
    height:`${height}px`,
    left: `${left}px`,
    top:`${top}px`,
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transform: `translate(${left}px, ${top}px) rotate(0deg)`,
  };

  if (type == AppElementType.image) {
    return (
      <image
        data-cmp-id={cmpId}
        data-element-type={type}
        preserveAspectRatio='none'
        href={item.src}
        style={style}
      >
      </image>
    );
  }

  if (type == AppElementType.text) {
    const text = String(item.value ?? '');

    return (
      <foreignObject
        data-element-type={type}
        data-cmp-id={cmpId}
        style={style}
      >
        <div
          class='text-editable-element'
          contentEditable='true'
          onKeyDown={onTextKeyDown}
          onFocus={onTextFocus}
          onBlur={onTextBlur}
          innerHTML={text}>
        </div>
      </foreignObject>
    );
  }
};

export const AppSvgElement: FunctionalComponent<AppSvgElementData> = (item) => (createSvgFromObject(item));
