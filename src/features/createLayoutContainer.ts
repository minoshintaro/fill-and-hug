interface Position {
  x: number;
  y: number;
}
function getLeftTopPosition(nodes: ReadonlyArray<SceneNode>): Position {
  const result = { x: Infinity, y: Infinity };
  nodes.forEach(node => {
    result.x = Math.min(result.x, node.x);
    result.y = Math.min(result.y, node.y);
  });
  return result;
}

export function createLayoutContainer(nodes: ReadonlyArray<SceneNode>): void {
  const { x, y } = getLeftTopPosition(nodes);
  const sortedNodes = [...nodes].sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
  const newFrame = figma.createFrame();

  newFrame.name = 'Frame';
  newFrame.x = x;
  newFrame.y = y;
  newFrame.layoutMode = 'VERTICAL';
  newFrame.primaryAxisSizingMode = 'AUTO';
  newFrame.counterAxisSizingMode = 'AUTO';

  sortedNodes.forEach(node => newFrame.appendChild(node));
}
