import { getParentLayoutMode } from "./get";

export function setFilledContainer(node: SceneNode): void {
  if ('layoutGrow' in node) {
    const { layoutGrow, layoutAlign } = node;
    const parentLayoutMode = getParentLayoutMode(node);
    node.layoutGrow = parentLayoutMode === 'HORIZONTAL' ? 1 : layoutGrow;
    node.layoutAlign = parentLayoutMode === 'VERTICAL' ? 'STRETCH' : layoutAlign;
  }
  if ('layoutMode' in node) {
    const { layoutMode, primaryAxisSizingMode: primary } = node;
    node.primaryAxisSizingMode = layoutMode === 'HORIZONTAL' ? 'FIXED' : primary;
  }
}

export function setHuggedContent(node: SceneNode): void {
  if ('layoutMode' in node) {
    const { layoutMode, primaryAxisSizingMode: primary, counterAxisSizingMode: counter } = node;
    node.primaryAxisSizingMode = layoutMode === 'VERTICAL' ? 'AUTO' : primary;
    node.counterAxisSizingMode = layoutMode === 'HORIZONTAL' ? 'AUTO' : counter;
  }
}

export function setFlexDirection(node: SceneNode): void {
  if ('layoutMode' in node) {
    if (node.primaryAxisAlignItems === 'SPACE_BETWEEN') node.primaryAxisAlignItems = 'MIN';
    if (node.counterAxisAlignItems === 'BASELINE') node.counterAxisAlignItems = 'CENTER';
    const { layoutMode: current, primaryAxisAlignItems: primary, counterAxisAlignItems: counter } = node;
    node.layoutMode = current === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL';
    node.primaryAxisAlignItems = counter;
    node.counterAxisAlignItems = primary;
  }
}

export function setPositionBasedOnNodes(target: SceneNode, nodes: readonly SceneNode[]): void {
  const x: number[] = nodes.map(node => node.x);
  const y: number[] = nodes.map(node => node.y);
  target.x = Math.min(...x);
  target.y = Math.min(...y);
}

export function setSortedChildrenByPosition(node: SceneNode): void {
  if (node.type !== 'INSTANCE' && 'children' in node) {
    const children = [...node.children].sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
    children.forEach(child => node.appendChild(child));
  }
}

export function setColumnLayout(node: SceneNode): void {
  if ('layoutMode' in node) {
    node.layoutMode = 'VERTICAL';
    node.layoutSizingHorizontal = 'HUG';
  }
}
