export function setItemLayoutByCommand(node: SceneNode, axis: 'PRIMARY' | 'COUNTER' | 'NONE'): void {
  if ('layoutGrow' in node && 'layoutAlign' in node) {
    switch (figma.command) {
      case 'FILL_H':
      case 'FILL_V':
        if (axis === "PRIMARY") node.layoutGrow = 1;
        if (axis === "COUNTER") node.layoutAlign = 'STRETCH';
        break;
      case 'HUG_H':
      case 'HUG_V':
        if (axis === "PRIMARY") node.layoutGrow = 0;
        if (axis === "COUNTER") node.layoutAlign = 'INHERIT';
        break;
      default:
        break;
    }
  }
}
