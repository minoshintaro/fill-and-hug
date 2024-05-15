export type Axis = Exclude<AutoLayoutMixin['layoutMode'], 'NONE'>;

export function getPrimaryAxis(node: SceneNode): Axis | null {
  return 'layoutMode' in node && node.layoutMode !== 'NONE' ? node.layoutMode : null;
}
