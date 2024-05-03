export function getAxisType(input: string, mode: AutoLayoutMixin['layoutMode']): string {
  switch (input) {
    case 'FILL_H':
    case 'HUG_H':
      if (mode === 'HORIZONTAL') return 'PRIMARY';
      if (mode === 'VERTICAL') return 'COUNTER';
      break;
    case 'FILL_V':
    case 'HUG_V':
      if (mode === 'HORIZONTAL') return 'COUNTER';
      if (mode === 'VERTICAL') return 'PRIMARY';
      break;
    default:
      break;
  }
  return 'NONE';
}
