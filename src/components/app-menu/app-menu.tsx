import {Component, h} from '@stencil/core';
import {dispatchAppSvgAddItem} from "../app-svg/app-svg-dispatch";
import {AppElementType} from "../app-svg/app-svg-interface";

@Component({
  tag: 'app-menu',
  styleUrl: 'app-menu.css',
  shadow: true,
})
export class AppMenu {
  private static getRandomInteger(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private handleAddImage = () => {
    dispatchAppSvgAddItem({
      type: AppElementType.image,
      src: 'https://ionicframework.com/blog/wp-content/uploads/2019/06/stencil-one-feature.png',
      width: 228,
      height: 125.39,
      top: AppMenu.getRandomInteger(0, 450),
      left: AppMenu.getRandomInteger(0, 1000),
    });
  }

  private handleAddText = () => {
    dispatchAppSvgAddItem({
      type: AppElementType.text,
      width: 300,
      height: 200,
      value: 'This is a text! You can edit it:\n - Click it to edit\n - Press esc to leave edit mode',
      top: AppMenu.getRandomInteger(0, 500),
      left: AppMenu.getRandomInteger(0, 900),
    })
  }


  render() {
    return (
      <div class="side-menu">
        <button onClick={this.handleAddImage}>Add Image</button>
        <button onClick={this.handleAddText}>Add Text</button>
      </div>
    );
  }
}
