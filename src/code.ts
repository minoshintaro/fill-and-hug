import { canFill, canHug } from "./utils/canDo";
import { createLayoutContainer } from "./features/createLayoutContainer";
import { getCommandByLayoutSizing } from "./features/getCommandByLayoutSizing";
import { getTargetAxisByCommand } from "./utils/getTargetAxisByCommand";
import { setDirection } from "./features/setDirection";

const message = {
  set: 'Set Direction',
  fix: 'Fixed',
  hug: 'Hugged',
  fill: 'Filled',
  stop: 'No Your Selection',
  none: 'No Changed',
};

figma.on('run', ({ command }: RunEvent) => {
  const nodes: readonly SceneNode[] = figma.currentPage.selection;

  if (nodes.length === 0) {
    figma.closePlugin(message.stop);
    return;
  }

  if (command === 'SET_DIRECTION') {
    if (nodes.length === 1 && (nodes[0].type === 'FRAME' || nodes[0].type === 'COMPONENT' || nodes[0].type === 'COMPONENT_SET')) {
      setDirection(nodes[0]);
    } else {
      createLayoutContainer(nodes);
    }
    figma.closePlugin(message.set);
    return;
  }

  let result = message.none;
  for (const node of nodes) {
    if ('layoutSizingHorizontal' in node && 'layoutSizingVertical' in node) {
      const selfAxis = 'layoutMode' in node ? getTargetAxisByCommand(node.layoutMode) : 'NONE';
      const parentAxis = node.parent && 'layoutMode' in node.parent ? getTargetAxisByCommand(node.parent.layoutMode) : 'NONE';

      switch (getCommandByLayoutSizing(node, selfAxis, parentAxis)) {
      case 'FIXED_H':
        node.layoutSizingHorizontal = 'FIXED';
        result = message.fix;
        break;
      case 'FIXED_V':
        node.layoutSizingVertical = 'FIXED';
        result = message.fix;
        break;
      case 'HUG_H':
        if (canHug(node, parentAxis)) {
          node.layoutSizingHorizontal = 'HUG';
          result = message.hug;
        }
        break;
      case 'HUG_V':
        if (canHug(node, parentAxis)) {
          node.layoutSizingVertical = 'HUG';
          result = message.hug;
        }
        break;
      case 'FILL_H':
        if (canFill(node, parentAxis)) {
          node.layoutSizingHorizontal = 'FILL';
          result = message.fill;
        }
        break;
      case 'FILL_V':
        if (canFill(node, parentAxis)) {
          node.layoutSizingVertical = 'FILL';
          result = message.fill;
        }
        break;
      default:
        break;
      }
    }
  }

  figma.closePlugin(result);
});
