import { getParentLayoutMode } from "./getProp";

export function setFilledContainer(node: SceneNode): void {
  if ('layoutGrow' in node) {
    const parentLayoutMode = getParentLayoutMode(node);
    if (parentLayoutMode === 'HORIZONTAL') {
      node.layoutGrow = 1;
    } else if (parentLayoutMode === 'VERTICAL') {
      node.layoutAlign = 'STRETCH';
    }
  }
  if ('layoutMode' in node) {
    if (node.layoutMode === 'HORIZONTAL') node.primaryAxisSizingMode = 'FIXED';
  }
}

export function setHuggedContent(node: SceneNode): void {
  if ('layoutMode' in node) {
    const { layoutMode } = node;
    if (layoutMode === 'HORIZONTAL') {
      node.counterAxisSizingMode = 'AUTO';
    } else if (layoutMode === 'VERTICAL') {
      node.primaryAxisSizingMode = 'AUTO';
    }
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
