import { swapAxisLayout } from "../utils/swapAxisLayout";

export function setDirection(node: FrameNode | ComponentNode | ComponentSetNode): void {
  if (node.layoutMode === 'NONE') {
    node.layoutMode = 'VERTICAL';
    return;
  }

  node.children.forEach(child => swapAxisLayout(child));

  const current = {
    mode: node.layoutMode,
    sizing: {
      h: node.layoutSizingHorizontal,
      v: node.layoutSizingVertical
    },
    items: {
      primary: node.primaryAxisAlignItems, // MIN | MAX | CENTER | SPACE_BETWEEN
      counter: node.counterAxisAlignItems // MIN | MAX | CENTER | BASELINE
    }
  }
  node.layoutMode = current.mode === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL';
  node.layoutSizingHorizontal = current.sizing.h;
  node.layoutSizingVertical = current.sizing.v;
  node.primaryAxisAlignItems = current.items.counter !== 'BASELINE' ? current.items.counter : 'MIN';
  node.counterAxisAlignItems = current.items.primary !== 'SPACE_BETWEEN' ? current.items.primary : 'MIN';
}
