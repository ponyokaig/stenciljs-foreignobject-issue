import {Component, h, Host, Listen, Prop, State} from '@stencil/core';
import {AppSvgElementData} from "./app-svg-interface";
import {AppSvgElement} from "./app-svg-element";

@Component({
  tag: 'app-svg',
  styleUrl: 'app-svg.scss',
  shadow: true,
})
export class AppSvg {

  @State() items: AppSvgElementData[] = [];
  @State() zoom: number = 1;
  @Prop({reflect: true}) pageWidth: number = 1360;
  @Prop({reflect: true}) pageHeight: number = 700;
  @Prop({reflect: true}) margin: number = 40;

  private static nextId = 0;
  private static getNewId(): number {
    return ++AppSvg.nextId;
  }

  @Listen('appSvgAddItem', {target: 'document'})
  handleAddItems(ev: CustomEvent) {
    this.items = [
      ...this.items,
      {
        cmpId: AppSvg.getNewId(),
        ...ev.detail
      }
    ];
  }

  render() {
    return (
      <Host>
        <svg
          class="stage-svg"
          xmlns="http://www.w3.org/2000/svg"
          width={this.pageWidth * this.zoom}
          height={this.pageHeight * this.zoom}
          style={{ margin: `${this.margin}px` }}
        >
          <g transform={`scale(${this.zoom})`}>
            <rect
              fill="#ffffff"
              width={this.pageWidth}
              height={this.pageHeight}
              x="0"
              y="0"
              style={{stroke: "#9f9f9f", strokeWidth: "1", strokeOpacity: "0.5"}}
            />
            {
              this.items.map((item: AppSvgElementData) =>
                <AppSvgElement
                  {...item}
                ></AppSvgElement>
              )
            }
          </g>
        </svg>
      </Host>
    );
  }
}
