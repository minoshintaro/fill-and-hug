import { AxisType } from "../settings";

export function getTargetAxisByCommand(mode: AutoLayoutMixin['layoutMode']): AxisType {
  switch (figma.command) {
    case 'HUG_H':
    case 'FILL_H':
    case 'TOGGLE_H':
      if (mode === 'HORIZONTAL') return 'PRIMARY';
      if (mode === 'VERTICAL') return 'COUNTER';
      break;
    case 'HUG_V':
    case 'FILL_V':
    case 'TOGGLE_V':
      if (mode === 'HORIZONTAL') return 'COUNTER';
      if (mode === 'VERTICAL') return 'PRIMARY';
      break;
    default:
      break;
  }
  return 'NONE';
}
