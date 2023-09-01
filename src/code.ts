import { setLayoutMode, setFilledContainer, setHuggedContent } from "./setProp";

let message = 'Not changed';



figma.on('run', ({ command }: RunEvent) => {
  for (const node of figma.currentPage.selection) {
    switch (command) {
      case 'direction': {
        setLayoutMode(node);
        message = `Set ${'layoutMode' in node ? node.layoutMode : 'lorem'}`;
        break;
      }
      case 'fill-x': {
        setFilledContainer(node);
        message = 'Filled';
        break;
      }
      case 'hug-y': {
        setHuggedContent(node);
        message = 'Hugged';
        break;
      }
      default: break;
    }
  }
  figma.closePlugin(message);
});
