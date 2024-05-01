import { LayoutMode } from "./type";
import { hasFixedContainer } from "./boolean";

export function getParentLayoutMode(node: SceneNode): LayoutMode {
  const target = node.parent;
  return target && 'layoutMode' in target && hasFixedContainer(target) ? target.layoutMode : 'NONE';
}
