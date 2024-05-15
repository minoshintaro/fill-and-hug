export function setStretchedForItem(node: SceneNode, axis: string): void {
  if (axis === "PRIMARY" && 'layoutGrow' in node) node.layoutGrow = 1;
  if (axis === "COUNTER" && 'layoutAlign' in node) node.layoutAlign = 'STRETCH';
}

export function setUnstretchedForItem(node: SceneNode, axis: string): void {
  if (axis === "PRIMARY" && 'layoutGrow' in node) node.layoutGrow = 0;
  if (axis === "COUNTER" && 'layoutAlign' in node) node.layoutAlign = 'INHERIT';
}


