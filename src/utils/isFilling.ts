import { AxisType } from "../settings";
import { Axis } from "./getPrimaryAxis";

export function isFilling(node: SceneNode, axis: AxisType): boolean {
  return (
    (axis === 'PRIMARY' && 'layoutGrow' in node && node.layoutGrow === 1) ||
    (axis === 'COUNTER' && 'layoutAlign' in node && node.layoutAlign === 'STRETCH')
  );
}

interface Input {
  // direction: 'HORIZONTAL' | 'VERTICAL',
  primary: AutoLayoutChildrenMixin['layoutGrow'],
  counter: AutoLayoutChildrenMixin['layoutAlign'],
  container: Axis,
}
export function isFillingContainer(input: Input): boolean {
  const { primary, counter, container } = input;

  switch (container) {
    case 'HORIZONTAL': return (
      ((figma.command === 'HUG_H' || figma.command === 'FILL_H' || figma.command === 'TOGGLE_H') && primary === 1) ||
      ((figma.command === 'HUG_V' || figma.command === 'FILL_V' || figma.command === 'TOGGLE_V') && counter === 'STRETCH')
    );
    case 'VERTICAL':
    default: return false;
  }
}
