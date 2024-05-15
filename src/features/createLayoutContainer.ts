import { getLeftTopPosition } from "../utils/getLeftTopPosition";

export function createLayoutContainer(nodes: ReadonlyArray<SceneNode>): void {
  const { x, y } = getLeftTopPosition(nodes);
  const sortedNodes = [...nodes].sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
  const first = sortedNodes[0];
  const parent = first.parent;
  if (!parent) return;

  const newFrame = figma.createFrame();
  parent.insertChild(parent.children.indexOf(first), newFrame);

  newFrame.name = 'Frame';
  newFrame.fills = [];
  newFrame.x = x;
  newFrame.y = y;
  newFrame.layoutMode = 'VERTICAL';
  if ('layoutMode' in parent && parent.layoutMode !== 'NONE') newFrame.layoutSizingHorizontal = 'FILL';

  sortedNodes.forEach(node => newFrame.appendChild(node));

  figma.currentPage.selection = [newFrame];
}
