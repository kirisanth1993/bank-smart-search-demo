import { computePosition, offset, flip, shift } from "@floating-ui/dom";

export async function positionDropdown(anchor: HTMLElement, dropdown: HTMLElement) {
  const { x, y } = await computePosition(anchor, dropdown, {
    middleware: [offset(6), flip(), shift()],
    placement: "bottom-start"
  });

  dropdown.style.left = `${x}px`;
  dropdown.style.top = `${y}px`;
}
