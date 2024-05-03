export function hasStretchItem(nodes: ReadonlyArray<SceneNode>, axisType: string): boolean {
  return nodes.some(node => (
    (axisType === 'PRIMARY' && 'layoutGrow' in node && node.layoutGrow === 1) ||
    (axisType === 'COUNTER' && 'layoutAlign' in node && node.layoutAlign === 'STRETCH')
  ));
}
