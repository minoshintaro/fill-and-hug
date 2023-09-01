import { hasFixedContainer } from "./boolean";

export function setLayoutMode(node: SceneNode): void {
  if ('layoutMode' in node) {
    const { layoutMode } = node;
    if (layoutMode === 'VERTICAL') {
      node.layoutMode = 'HORIZONTAL';
    } else {
      node.layoutMode = 'VERTICAL';
    }
  }
}

export function setFilledContainer(node: SceneNode): void {
  if ('layoutGrow' in node) {
    const { parent } = node;
    if (parent && 'layoutMode' in parent && hasFixedContainer(parent)) {
      switch (parent.layoutMode) {
        case 'HORIZONTAL': {
          node.layoutGrow = 1;
          break;
        }
        case 'VERTICAL': {
          node.layoutAlign = 'STRETCH';
          break;
        }
        default: break;
      }
    }
  }
  if ('layoutMode' in node && node.layoutMode === 'HORIZONTAL') {
    node.primaryAxisSizingMode = 'FIXED';
  }
}

// export function _setFilledContainer(node: SceneNode, parentLayoutMode: string): void {
//   if ('layoutGrow' in node) {
//     if (parentLayoutMode === 'HORIZONTAL') node.layoutGrow = 1;
//     if (parentLayoutMode === 'VERTICAL') node.layoutAlign = 'STRETCH';
//   }
//   if ('layoutMode' in node && node.layoutMode === 'HORIZONTAL') {
//     node.primaryAxisSizingMode = 'FIXED';
//   }
// }

export function setHuggedContent(node: SceneNode): void {
  if ('layoutMode' in node) {
    const { layoutMode } = node;
    if (layoutMode === 'HORIZONTAL') node.counterAxisSizingMode = 'AUTO';
    if (layoutMode === 'VERTICAL') node.primaryAxisSizingMode = 'AUTO';
  }
}
