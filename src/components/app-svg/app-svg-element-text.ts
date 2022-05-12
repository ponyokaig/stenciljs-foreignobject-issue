import {AppElementType, AppSvgElementData} from "./app-svg-interface";

const _global = (window /* browser */ || global /* node */) as any

_global.onAppTextKeyDown = (ev: KeyboardEvent): void => {
    ev.stopPropagation();

    if (ev.key.toLowerCase() === 'escape') {
        (ev.target as HTMLDivElement).blur();
    }
}

_global.onAppTextFocus = (ev: FocusEvent): void => {
    const target = ev.target as HTMLDivElement
    const foreignObject = target.parentNode as SVGSVGElement;

    foreignObject.classList.add('edit-mode');

    const range = document.createRange();
    range.selectNodeContents(target);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}


_global.onAppTextBlur = (ev: FocusEvent): void => {
    const foreignObject = (ev.target as HTMLDivElement).parentNode as SVGSVGElement;

    foreignObject.classList.remove('edit-mode');

    window.getSelection().removeAllRanges();
}

const createSvgFromObject = (item: AppSvgElementData) => {
    const {cmpId, type, width, height, left, top} = item;

    const style = `width: ${width}px;
                   height: ${height}px;
                   left: ${left}px;
                   top: ${top}px;
                   transformBox: fill-box;
                   transformOrigin: center;
                   transform: translate(${left}px, ${top}px) rotate(0deg);`;

    if (type == AppElementType.image) {
        return (`
            <image
              data-cmp-id="${cmpId}"
              data-element-type="${type}"
              preserveAspectRatio="none"
              href="${item.src}"
              style="${style}">
            </image>
        `);
    }

    if (type == AppElementType.text) {
        const text = String(item.value ?? '');

        return (`
        <foreignObject
          data-cmp-id="${cmpId}"
          data-element-type="${type}"
          style="${style}">
            <div 
              class="text-editable-element" 
              contenteditable='true'
              onblur="onAppTextBlur(event)"
              onkeydown="onAppTextKeyDown(event)"
              onfocus="onAppTextFocus(event)"
              >${text}</div>
        </foreignObject>
      `);
    }
};

export const AppSvgElementAsText = (item) => createSvgFromObject(item);
