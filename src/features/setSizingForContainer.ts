export function setFixedSizingForContainer(node: SceneNode, axis: string): void {
  if (axis === "PRIMARY" && 'primaryAxisSizingMode' in node) node.primaryAxisSizingMode = 'FIXED';
  if (axis === "COUNTER" && 'counterAxisSizingMode' in node) node.counterAxisSizingMode = 'FIXED';
}

export function setAutoSizingForContainer(node: SceneNode, axis: string): void {
  if (axis === "PRIMARY" && 'primaryAxisSizingMode' in node) node.primaryAxisSizingMode = 'AUTO';
  if (axis === "COUNTER" && 'counterAxisSizingMode' in node) node.counterAxisSizingMode = 'AUTO';
}

