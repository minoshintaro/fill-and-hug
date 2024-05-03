import { createLayoutContainer } from "./features/createLayoutContainer";
import { getAxisType } from "./features/getAxisType";
import { hasStretchItem } from "./utils/hasStretchItem";
import { setContainerSizingByCommand } from "./features/setContainerSizingByCommand";
import { setDirectionForContainer } from "./features/setDirectionForContainer";
import { setItemLayoutByCommand } from "./features/setItemLayoutByCommand";

/** # レイアウトコンテナ
 * ## 主軸の設定（ComponentNode | ComponentSetNode | FrameNode | InstanceNode）
 * - layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
 *
 * ## コンテナのサイズ
 * - 【主軸】PrimaryAxisSizingMode: 'FIXED' | 'AUTO' => Fill container ※自身もレイアウトアイテム、かつ Grow: 1 | Align: 'STRETCH'
 * - 【副軸】CounterAxisSizingMode: 'FIXED' | 'AUTO' => Hug contents ※自身もレイアウトアイテムなら、Grow: 0 | Align: 'INHERIT'
 *
 * ## アイテムの伸張
 * - 【主軸】layoutGrow: 0 | 1
 * - 【副軸】layoutAlign: 'INHERIT' | 'STRETCH'
 */

figma.on('run', ({ command }: RunEvent) => {
  const selectedNodes: readonly SceneNode[] = figma.currentPage.selection;
  if (selectedNodes.length === 0) {
    figma.closePlugin('No selection');
    return;
  }

  const isFilling = ['FILL_H', 'FILL_V'].includes(command);

  switch (command) {
    case 'SET_DIRECTION':
      if (
        selectedNodes.length === 1 &&
        (selectedNodes[0].type === 'FRAME' || selectedNodes[0].type === 'COMPONENT' || selectedNodes[0].type === 'COMPONENT_SET')
      ) {
        setDirectionForContainer(selectedNodes[0]);
      } else {
        createLayoutContainer(selectedNodes);
      }
      figma.closePlugin('Set Direction');
      break;
    default:
      for (const node of selectedNodes) {
        if (node.parent && 'layoutMode' in node.parent && node.parent.layoutMode !== 'NONE') {
          const axis = getAxisType(command, node.parent.layoutMode);
          if (isFilling && !hasStretchItem(node.parent.children, axis)) setContainerSizingByCommand(node.parent, axis);
          setItemLayoutByCommand(node, axis);
        }
        if ('layoutMode' in node && node.layoutMode !== 'NONE') {
          const axis = getAxisType(command, node.layoutMode);
          setContainerSizingByCommand(node, axis);
        }
      }
      figma.closePlugin(isFilling ? 'Filled container' : 'Hugged contents');
      break;
  }
});
