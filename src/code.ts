import { getAxisType } from "./features/getAxisType";
import { hasStretchItem } from "./utils/hasStretchItem";
import { setFixedSizingForContainer, setAutoSizingForContainer } from "./features/setSizingForContainer";
import { setStretchedForItem, setUnstretchedForItem } from "./features/setLayoutForItem";

/**
 * # [1] レイアウトコンテナ
 * ## 主軸の設定（ComponentNode | ComponentSetNode | FrameNode | InstanceNode）
 * - layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
 *
 * ## コンテナのサイズ
 * - 【主軸】PrimaryAxisSizingMode: 'FIXED' | 'AUTO'
 * - 【副軸】CounterAxisSizingMode: 'FIXED' | 'AUTO'
 * 結果、
 * - Fixed width: 'FIXED'
 *   - 【条件】親が Autolayout、自身が Fill container
 * - Hug contents: 'AUTO'
 *   - 【条件】親が Autolayout、自身が Fill container ではない
 *
 * # [2] レイアウトアイテム
 * ## アイテムの伸張
 * - 【主軸】layoutGrow: 0 | 1
 * - 【副軸】layoutAlign: 'INHERIT' | 'STRETCH'
 * 結果、
 * - Fill container: 1 | 'STRETCH'
 *   - 【条件】親が AutoLayout
 *   - 【条件】自身が AutoLayout なら、自身の AxisSizingMode は 'FIXED'
 */

figma.on('run', ({ command }: RunEvent) => {
  const selectedNodes: readonly SceneNode[] = figma.currentPage.selection;
  if (selectedNodes.length === 0) {
    figma.closePlugin('No selection');
    return;
  }

  const isFilling: boolean = ['FILL_H', 'FILL_V'].includes(command);
  const isHugging: boolean = ['HUG_H', 'HUG_V'].includes(command);

  for (const node of selectedNodes) {
    if (node.parent && 'layoutMode' in node.parent && node.parent.layoutMode !== 'NONE') {
      const axis = getAxisType(command, node.parent.layoutMode); // => PRIMARY | COUNTER

      if (isFilling && !hasStretchItem(node.parent.children, axis)) {
        setFixedSizingForContainer(node.parent, axis);
      }
      if (isFilling) {
        setStretchedForItem(node, axis);
      }
      if (isHugging) {
        setUnstretchedForItem(node, axis);
      }
    }

    if ('layoutMode' in node && node.layoutMode !== 'NONE') {
      const axis = getAxisType(command, node.layoutMode); // => PRIMARY | COUNTER

      if (isFilling) {
        setFixedSizingForContainer(node, axis);
      }
      if (isHugging) {
        setAutoSizingForContainer(node, axis);
      }
    }
  }

  figma.closePlugin(isFilling ? 'Filled' : 'Hugged');
});
