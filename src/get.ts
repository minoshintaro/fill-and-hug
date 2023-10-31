import { LayoutMode } from "./type";
import { hasFixedContainer } from "./boolean";

export function getParentLayoutMode(node: SceneNode): LayoutMode {
  const { parent } = node;
  return parent && 'layoutMode' in parent && hasFixedContainer(parent) ? parent.layoutMode : 'NONE';
}

export function getLayoutMode(node: SceneNode): LayoutMode {
  return 'layoutMode' in node ? node.layoutMode : 'NONE';
}
