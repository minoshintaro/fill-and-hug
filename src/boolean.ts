
function isAutoSizing(node: SceneNode): boolean {
  if ('layoutMode' in node) {
    const { layoutMode, primaryAxisSizingMode, counterAxisSizingMode } = node;
    switch (layoutMode) {
      case 'HORIZONTAL': return primaryAxisSizingMode === 'AUTO';
      case 'VERTICAL': return counterAxisSizingMode === 'AUTO';
      default: break;
    }
  }
  return false;
}

export function hasFixedContainer(currentNode: SceneNode): boolean {
  let container = currentNode;
  while (isAutoSizing(container)) {
    const { parent } = container;
    if (parent && 'layoutMode' in parent) {
      container = parent;
    } else {
      break;
    }
  }
  return !isAutoSizing(container);
}
