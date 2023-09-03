import { ModeType, PrimaryType, CounterType } from "./typeSet";

function isAutoSizing(mode: ModeType, primary: PrimaryType, counter: CounterType): boolean {
  return (mode === 'HORIZONTAL' && primary === 'AUTO') || (mode === 'VERTICAL' && counter === 'AUTO');
}

function hasFixedContainer(currentNode: SceneNode): boolean {
  if (!(currentNode && 'layoutMode' in currentNode)) return false;

  let container = currentNode;
  while (isAutoSizing(container.layoutMode, container.primaryAxisSizingMode, container.counterAxisSizingMode)) {
    const { parent } = container;
    if (!(parent && 'layoutMode' in parent)) break;
    container = parent;
  }
  return !isAutoSizing(container.layoutMode, container.primaryAxisSizingMode, container.counterAxisSizingMode);
}

export function getParentLayoutMode(currentNode: SceneNode): ModeType {
  const { parent } = currentNode;
  if (parent && 'layoutMode' in parent && hasFixedContainer(parent)) return parent.layoutMode;
  return 'NONE';
}

export function getLayoutMode(currentNode: SceneNode): ModeType {
  if ('layoutMode' in currentNode) return currentNode.layoutMode;
  return 'NONE';
}
