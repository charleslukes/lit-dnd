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
  private isSelected: boolean;
  private tagSelected: any;

  static get styles(): CSSResult {
    return dndStyles;
  }

  firstUpdated() {
    this.getAllSlotedTemplate();
  }

  getAllSlotedTemplate(): void {
    const slot = this.shadowRoot.querySelector("slot");
    console.log(slot.assignedElements());

    slot.assignedElements().forEach((elem) => {
      elem.addEventListener("mousedown", (e: any) => {
        e.preventDefault();
        this.isSelected = true;
        this.tagSelected = e.target;
      });

      elem.addEventListener("mouseup", (e: any) => {
        this.isSelected = false;
        console.log("invoked");
      });

      elem.addEventListener("mousemove", (e: any) => {
        e.preventDefault();
        const target = e.target;
        console.log(target, this.tagSelected);

        if (this.isSelected && target === this.tagSelected) {
          // get the left coordinates
          const leftX = e.pageX;
          const rightY = e.pageY;
          target.style.transform = `translate(${leftX}px, ${rightY}px)`;
        }
      });
    });

    // elem.addEventListener("mousedown", (e: any) => {
    //   this.isSelected = true;
    //   this.tagSelected = e.target;
    // });

    // slot.addEventListener("mouseup", (e: any) => {
    //   this.isSelected = false;
    //   console.log("invoked");
    // });

    // slot.addEventListener("mousemove", (e: any) => {
    //   const target = e.target;
    //   console.log(target, this.tagSelected);

    //   if (this.isSelected && target === this.tagSelected) {
    //     // get the left coordinates
    //     const leftX = e.pageX;
    //     const rightY = e.pageY;
    //     target.style.transform = `translate(${leftX}px, ${rightY}px)`;
    //   }
    // });
  }

  render(): TemplateResult {
    return html`
      <div class="dnd">
        <slot></slot>
      </div>
    `;
  }
}
