import { AxisType } from "../settings";

export function setItemLayoutByCommand(node: SceneNode, axis: AxisType): void {
  if ('layoutGrow' in node && 'layoutAlign' in node) {
    switch (figma.command) {
      case 'FILL_H':
        node.layoutSizingHorizontal = 'FILL';
        break;
      case 'FILL_V':
        node.layoutSizingVertical = 'FILL';
        break;
      case 'HUG_H':
        node.layoutSizingHorizontal = 'HUG';
        break;
      case 'HUG_V':
        node.layoutSizingVertical = 'HUG';
        break;
      default:
        break;
    }
  }
}

// export function setItemLayoutByCommand1(node: SceneNode, axis: AxisType): void {
//   if ('layoutGrow' in node && 'layoutAlign' in node) {
//     switch (figma.command) {
//       case 'FILL_H':
//       case 'FILL_V':
//         if (axis === "PRIMARY") node.layoutGrow = 1;
//         if (axis === "COUNTER") node.layoutAlign = 'STRETCH';
//         break;
//       case 'HUG_H':
//       case 'HUG_V':
//         if (axis === "PRIMARY") node.layoutGrow = 0;
//         if (axis === "COUNTER") node.layoutAlign = 'INHERIT';
//         break;
//       default:
//         break;
//     }
//   }
// }
