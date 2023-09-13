import { getParentLayoutMode } from "./getProp";

export function setFilledContainer(node: SceneNode): void {
  if ('layoutGrow' in node) {
    const { layoutGrow, layoutAlign } = node;
    const parentLayoutMode = getParentLayoutMode(node);
    node.layoutGrow = parentLayoutMode === 'HORIZONTAL' ? 1 : layoutGrow;
    node.layoutAlign = parentLayoutMode === 'VERTICAL' ? 'STRETCH' : layoutAlign;
  }
  if ('layoutMode' in node) {
    const { layoutMode, primaryAxisSizingMode } = node;
    node.primaryAxisSizingMode = layoutMode === 'HORIZONTAL' ? 'FIXED' : primaryAxisSizingMode;
  }
}

export function setHuggedContent(node: SceneNode): void {
  if ('layoutMode' in node) {
    const { layoutMode, primaryAxisSizingMode, counterAxisSizingMode } = node;
    node.primaryAxisSizingMode = layoutMode === 'VERTICAL' ? 'AUTO' : primaryAxisSizingMode;
    node.counterAxisSizingMode = layoutMode === 'HORIZONTAL' ? 'AUTO' : counterAxisSizingMode;
  }
}

export function setFlexDirection(node: SceneNode): void {
  if ('layoutMode' in node) {
    const { layoutMode, primaryAxisAlignItems, counterAxisAlignItems } = node;
    const primary = primaryAxisAlignItems;
    const counter = counterAxisAlignItems === 'BASELINE' ? 'CENTER' : counterAxisAlignItems;
    node.layoutMode = layoutMode === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL';
    node.primaryAxisAlignItems = primary === 'SPACE_BETWEEN' ? primary : counter;
    node.counterAxisAlignItems = primary === 'SPACE_BETWEEN' ? counter: primary;
  }
}
