import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'rg81x492',
    dataset: 'production',
  },
  studioHost: 'crystal-db',
  deployment: {
    appId: 'i0usv6i2zp3v7vzcxc94ni3g',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
});
