import { getLayoutMode } from "./getProp";
import { setFilledContainer, setHuggedContent, setFlexDirection } from "./setProp";

let message: string = 'Not changed'

figma.on('run', ({ command }: RunEvent) => {
  for (const selectedNode of figma.currentPage.selection) {
    switch (command) {
      case 'fill': {
        setFilledContainer(selectedNode);
        message = 'Filled';
        break;
      }
      case 'hug': {
        setHuggedContent(selectedNode);
        message = 'Hugged';
        break;
      }
      case 'direction': {
        setFlexDirection(selectedNode);
        message = `Set ${getLayoutMode(selectedNode) === 'HORIZONTAL' ? 'Row' : 'Column'}`;
        break;
      }
      default: break;
    }
  }
  figma.closePlugin(message);
});
