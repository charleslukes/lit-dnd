import {
  LitElement,
  customElement,
  property,
  html,
  TemplateResult,
  CSSResult,
} from "lit-element";
import { dndStyles } from "./dndStyles";

@customElement("drag-n-drop")
export class DragAndDrop extends LitElement {
  static get styles(): CSSResult {
    return dndStyles;
  }

  firstUpdated() {
    this.dragAndDropOnDoc();
  }

  dragAndDropOnDoc(): void {
    let isSelected: boolean,
      elemSelected: any,
      startX: number = 0,
      startY: number = 0;

    const doc = document.querySelector("body");
    doc.addEventListener("mousedown", (e: MouseEvent) => {
      e.preventDefault();
      // get targeted element
      const target = e.target as HTMLElement;
      if (target.assignedSlot) {
        elemSelected = target;
        isSelected = true;

        let initalX = target.getAttribute("data-positionX")
          ? Number(target.getAttribute("data-positionX"))
          : 0;
        let initalY = target.getAttribute("data-positionY")
          ? Number(target.getAttribute("data-positionY"))
          : 0;

        startX = e.pageX - initalX;
        startY = e.pageY - initalY;
      }
    });

    doc.addEventListener("mousemove", (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (isSelected && target === elemSelected) {
        const leftX = e.pageX - startX;
        const rightY = e.pageY - startY;

        target.style.transform = `translate(${leftX}px, ${rightY}px)`;

        // save their last postion
        target.setAttribute(`data-positionX`, `${leftX}`);
        target.setAttribute(`data-positionY`, `${rightY}`);
      }
    });

    doc.addEventListener("mouseup", (e) => {
      e.preventDefault();
      isSelected = false;
    });
  }

  render(): TemplateResult {
    return html`
      <div class="dnd">
        <slot></slot>
      </div>
    `;
  }
}
