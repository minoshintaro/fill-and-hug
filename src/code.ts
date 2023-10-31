import { getLayoutMode } from "./get";
import { setFilledContainer, setHuggedContent, setFlexDirection } from "./set";

figma.on('run', ({ command }: RunEvent) => {
  let message: string = 'Not changed'

  for (const selectedNode of figma.currentPage.selection) {
    switch (command) {
      case 'FILL': {
        setFilledContainer(selectedNode);
        message = 'Filled';
        break;
      }
      case 'HUG': {
        setHuggedContent(selectedNode);
        message = 'Hugged';
        break;
      }
      case 'DIRECTION': {
        setFlexDirection(selectedNode);
        message = `Set ${getLayoutMode(selectedNode) === 'HORIZONTAL' ? 'Row' : 'Column'}`;
        break;
      }
      default: break;
    }
  }
  figma.closePlugin(message);
});
