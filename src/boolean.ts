import { LayoutMode, AxisSizingMode } from "./type";

function isAutoSizing(mode: LayoutMode, primary: AxisSizingMode, counter: AxisSizingMode): boolean {
  return (mode === 'HORIZONTAL' && primary === 'AUTO') || (mode === 'VERTICAL' && counter === 'AUTO');
}

export function hasFixedContainer(node: SceneNode): boolean {
  if (!node || !('layoutMode' in node)) return false;
  let container = node;
  while (isAutoSizing(container.layoutMode, container.primaryAxisSizingMode, container.counterAxisSizingMode)) {
    const { parent } = container;
    if (!parent || !('layoutMode' in parent)) break;
    container = parent;
  }
  return !isAutoSizing(container.layoutMode, container.primaryAxisSizingMode, container.counterAxisSizingMode);
}
