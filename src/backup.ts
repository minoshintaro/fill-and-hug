import { setFilledContainer, setHuggedContent, setFlexDirection, setPositionBasedOnNodes, setColumnLayout, setSortedChildrenByPosition } from "./set";

import { getLayoutProperty } from "./features/getLayoutProperty";

import { hasAutoLayout } from "./utils/hasStretchItem";

figma.on('run', ({ command }: RunEvent) => {
  const selectedNodes: readonly SceneNode[] = figma.currentPage.selection;
  if (selectedNodes.length === 0) {
    figma.closePlugin('No selection');
    return;
  }

  for (const node of selectedNodes) {
    if ('layoutAlign' in node && node.parent && hasAutoLayout(node.parent)) {
      const { layoutMode, primaryAxisSizingMode, counterAxisSizingMode } = node.parent;

      const { layoutAlign } = node;

      switch (command) {
        case 'FILL_X':

      }

    }
  }

  let closingMessage: string = 'Not changed';

  switch (command) {
  case 'FILL': {
    selectedNodes.forEach(node => setFilledContainer(node));
    closingMessage = 'Filled';
    break;
  }

  case 'HUG': {
    selectedNodes.forEach(node => setHuggedContent(node));
    closingMessage = 'Hugged';
    break;
  }

  case 'SET_DIRECTION': {
    const firstNode = selectedNodes[0];
    if (length === 1 && 'layoutMode' in firstNode) {
      setFlexDirection(firstNode);
      closingMessage = `Set ${firstNode.layoutMode === 'HORIZONTAL' ? 'horizontal layout' : 'vertical layout'}`;
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

      closingMessage = 'Auto layout added';
    }
    break;
  }
  }
  figma.closePlugin(closingMessage);
});
