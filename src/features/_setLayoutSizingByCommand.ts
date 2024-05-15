import { AxisType } from '../settings';
import { isFilling } from '../utils/isFilling';
import { getTargetAxisByCommand } from '../utils/getTargetAxisByCommand';

function canHug(node: SceneNode, parentAxis: AxisType): boolean {
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    const selfAxis = getTargetAxisByCommand(node.layoutMode);
    return (
      selfAxis !== 'NONE' &&
      node.children.length > 0 &&
      node.children.some(child => !isFilling(child, selfAxis)) &&
      !isFilling(node, parentAxis)
    );
  }
  return false;
}

function canFill(node: SceneNode, parentAxis: AxisType): boolean {
  if (parentAxis !== 'NONE') {
    return true;
  }
  return false;
}

export function setLayoutSizingByCommand(node: SceneNode): void {
  if ('layoutSizingHorizontal' in node && 'layoutSizingVertical' in node) {
    const parentAxis = node.parent && 'layoutMode' in node.parent ? getTargetAxisByCommand(node.parent.layoutMode) : 'NONE';

    switch (figma.command) {
      case 'HUG_H':
        if (canHug(node, parentAxis)) node.layoutSizingHorizontal = 'HUG';
        break;
      case 'HUG_V':
        if (canHug(node, parentAxis)) node.layoutSizingVertical = 'HUG';
        break;
      case 'FILL_H':
        if (canFill(node, parentAxis)) node.layoutSizingHorizontal = 'FILL';
        break;
      case 'FILL_V':
        if (canFill(node, parentAxis)) node.layoutSizingVertical = 'FILL';
        break;
      case 'TOGGLE_H':
        node.layoutSizingHorizontal = node.layoutSizingHorizontal === 'FILL' ? 'HUG' : 'FILL';
        break;
      case 'TOGGLE_V':
        node.layoutSizingVertical = node.layoutSizingVertical === 'FILL' ? 'HUG' : 'FILL';
        break;
      default:
        break;
    }
  }
}
