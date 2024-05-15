import { Command, AxisType } from "../settings";

export function getCommandByLayoutSizing(node: SceneNode, selfAxis: AxisType, parentAxis: AxisType): Command {
  const current = {
    h: 'layoutSizingHorizontal' in node ? node.layoutSizingHorizontal : 'FIXED',
    v: 'layoutSizingVertical' in node ? node.layoutSizingVertical : 'FIXED'
  };

  const command = figma.command;
  switch (command) {
    case 'TOGGLE_H':
      if (parentAxis === 'NONE') return current.h === 'FIXED' ? 'HUG_H': 'FIXED_H';
      if (selfAxis === 'NONE') return current.h === 'FIXED' ? 'FILL_H' : 'FIXED_H';
      return current.h === 'HUG' ? 'FILL_H' : 'HUG_H';
    case 'TOGGLE_V':
      if (parentAxis === 'NONE') return current.v === 'FIXED' ? 'HUG_V': 'FIXED_V';
      if (selfAxis === 'NONE') return current.v === 'FIXED' ? 'FILL_V' : 'FIXED_V';
      return current.v === 'HUG' ? 'FILL_V' : 'HUG_V';
    default:
      return command as Command;
  }
}
