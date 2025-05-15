import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Mineral Collection',
  brandTarget: '_self',

  //
  colorPrimary: 'hsl(195, 89%, 29%)',
  colorSecondary: 'hsl(195, 89%, 42%)',

  // UI
  appBg: 'hsl(189, 78%, 9%)', //darkShade
  appContentBg: 'hsl(193, 56%, 15%)', //darkAccent
  appPreviewBg: 'hsl(193, 56%, 15%)', //darkAccent
  appBorderColor: 'hsl(178, 24%, 56%)', //lightAccent
  appBorderRadius: 8,

  // Text colors
  textColor: 'hsl(200, 19%, 94%)', //lightShade
  textInverseColor: 'hsl(178, 24%, 56%)', //lightAccent

  // Toolbar default and active colors
  barTextColor: 'hsl(200, 19%, 94%)', //lightShade
  barSelectedColor: 'hsl(178, 24%, 56%)', //lightAccent
  barHoverColor: 'hsl(178, 24%, 56%)', //lightAccent
  barBg: 'hsl(189, 78%, 9%)', //darkShade

  // Form colors
  inputBg: 'hsl(189, 78%, 9%)', //darkShade
  inputBorder: 'hsl(178, 24%, 56%)', //lightAccent
  inputTextColor: 'hsl(200, 19%, 94%)', //lightShade
  inputBorderRadius: 4,
});
