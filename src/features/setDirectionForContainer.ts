export function setDirectionForContainer(node: FrameNode | ComponentNode | ComponentSetNode): void {
  switch (node.layoutMode) {
    case 'NONE':
    case 'HORIZONTAL':
      node.layoutMode = 'VERTICAL';
      break;
    case 'VERTICAL':
      node.layoutMode = 'HORIZONTAL';
      break;
    default:
      break;
  }
}
