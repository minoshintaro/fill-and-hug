export function hasStretchItem(nodes: ReadonlyArray<SceneNode>, axis: string): boolean {
  return nodes.some(node => (
    (axis === 'PRIMARY' && 'layoutGrow' in node && node.layoutGrow === 1) ||
    (axis === 'COUNTER' && 'layoutAlign' in node && node.layoutAlign === 'STRETCH')
  ));
}
