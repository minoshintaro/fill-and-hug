import { AxisType } from '../settings';
import { isFilling } from './isFilling';
import { getTargetAxisByCommand } from './getTargetAxisByCommand';


/**
 * Container types: FrameNode | ComponentNode | ComponentSetNode | InstanceNode
 * Container hugs contents
 * - isAutoLayout
 * - !(hasAutoLayoutParent && isFillingParent)
 * - hasChildren
 * - !hasAllChildrenFilling
 *
 * Item fills container
 * - hasAutoLayoutParent
 * - !(hasParentHugging && hasAllSiblingsFilling)
 */

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

export function canHug(node: SceneNode, parentAxis: AxisType): boolean {
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    const selfAxis = getTargetAxisByCommand(node.layoutMode);
    return (
      /**
       * - 自身がコンテナ isContainer = (node) => node.layoutMode !== 'NONE'
       *   -
       * - もし親がコンテナなら hasContainer = (node, parent) => isContainer(parent)
       *   - 自身がFillではない
       */
      selfAxis !== 'NONE' &&
      node.children.length > 0
      // node.children.some(child => !isFilling(child, selfAxis)) &&
      // !isFilling(node, parentAxis)
    );
  }
  return false;
}

export function canFill(node: SceneNode, parentAxis: AxisType): boolean {
  if (parentAxis !== 'NONE') {
    return true;
  }
  return false;
}
