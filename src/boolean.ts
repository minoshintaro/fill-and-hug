
function isAutoSizing(node: ComponentNode | ComponentSetNode | FrameNode | InstanceNode): boolean {
  const { layoutMode: mode, primaryAxisSizingMode: primary, counterAxisSizingMode: counter } = node;
  return (mode === 'HORIZONTAL' && primary === 'AUTO') || (mode === 'VERTICAL' && counter === 'AUTO');
}

export function hasFixedContainer(node: SceneNode): boolean {
  if (!('layoutMode' in node)) return false;
  let container = node;
  while (isAutoSizing(container)) {
    const { parent } = container;
    if (!(parent && 'layoutMode' in parent)) break;
    container = parent;
  }
  return !isAutoSizing(container);
}
