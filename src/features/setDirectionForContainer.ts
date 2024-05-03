export function setDirectionForContainer(node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
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
  else if (node.type !== 'SECTION') {

  }

  if ('layoutMode' in node) {
    const { layoutMode } = node;
    node.layoutMode = layoutMode === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL';
  }

}



case 'SET_DIRECTION': {
  const firstNode = selectedNodes[0];
  if (length === 1 && 'layoutMode' in firstNode) {
    setFlexDirection(firstNode);
  } else {
    const { parent } = firstNode;
    if (!parent) return;

    // 新規フレームを生成 -> 選択ノードを基準に配置
    const newFrame = figma.createFrame();
    setPositionBasedOnNodes(newFrame, selectedNodes);

    // 親ノード内での選択ノードの順番 -> 親ノード内に新規フレームを配置
    const targetOrder = parent.children.indexOf(firstNode);
    parent.insertChild(targetOrder, newFrame);

    // 新規フレーム内に選択ノードを配置 ->
    selectedNodes.forEach(node => newFrame.appendChild(node));
    setSortedChildrenByPosition(newFrame);
    setColumnLayout(newFrame);
