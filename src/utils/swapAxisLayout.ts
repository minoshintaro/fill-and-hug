export function swapAxisLayout(node: SceneNode): void {
  if ('layoutGrow' in node && 'layoutAlign' in node) {
    const current = {
      grow: node.layoutGrow,
      align: node.layoutAlign
    };
    node.layoutGrow = current.align === 'STRETCH' ? 1: 0;
    node.layoutAlign = current.grow === 1 ? 'STRETCH' : 'INHERIT';
  }
}
