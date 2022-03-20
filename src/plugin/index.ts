import type { Plugin } from 'vite';

function WebwriterSvelte(options: any): Plugin[] {
  const virtualModuleId = '@webwriter-options'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return [
    {
      name: 'webwriter-svelte',
      enforce: 'pre',
      apply: 'serve',
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return options.devModule;
        }
      }
    },

    {
      name: 'webwriter-svelte',
      enforce: 'pre',
      apply: 'build',
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return options.prodModule;
        }
      }
    },

    {
      name: 'webwriter-svelte',
      enforce: 'pre',
      apply: 'build',
      resolveId(importee, importer, resolveOptions) {
        if (importee === '@webwriter/vite-plugin-svelte/components') {
          return this.resolve(
            '@webwriter/vite-plugin-svelte/components/prod',
            importer,
            Object.assign({ skipSelf: true }, resolveOptions)
          ).then((resolved) => resolved || { id: '@webwriter/vite-plugin-svelte/components/prod' });
        }
      },
    }
  ];
}

export default WebwriterSvelte;
