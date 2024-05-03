export function setContainerSizingByCommand(node: SceneNode, axis: 'PRIMARY' | 'COUNTER' | 'NONE'): void {
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET' || node.type === 'INSTANCE') {
    switch (figma.command) {
      case 'FILL_H':
      case 'FILL_V':
        if (axis === "PRIMARY") node.primaryAxisSizingMode = 'FIXED';
        if (axis === "COUNTER") node.counterAxisSizingMode = 'FIXED';
        break;
      case 'HUG_H':
      case 'HUG_V':
        if (axis === "PRIMARY") node.primaryAxisSizingMode = 'AUTO';
        if (axis === "COUNTER") node.counterAxisSizingMode = 'AUTO';
        break;
      default:
        break;
    }
  }
}
