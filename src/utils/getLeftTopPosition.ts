interface Position {
  x: number;
  y: number;
}
export function getLeftTopPosition(nodes: ReadonlyArray<SceneNode>): Position {
  return nodes.reduce((result, node) => ({
    x: Math.min(result.x, node.x),
    y: Math.min(result.y, node.y)
  }), { x: Infinity, y: Infinity });
}
