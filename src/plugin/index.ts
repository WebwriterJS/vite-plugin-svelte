import type { Plugin } from 'vite';
import * as fs from "fs/promises";
import { UserOptions, resolveOptions } from './Options';

function WebwriterSvelte(userOptiuons: UserOptions = {}): Plugin[] {
  const virtualModuleId = '@webwriter-options';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  const options = resolveOptions(userOptiuons);

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
      async load(id) {
        if (id === resolvedVirtualModuleId) {
          if (options.devModule.type === 'path') {
            return await fs.readFile(options.devModule.path, 'utf-8');
          } else if (options.devModule.type === 'source') {
            return options.devModule.source;
          } else {
            // @ts-expect-error
            this.error(`Invalid dev config module type '${options.devModule.type}'`)
          }
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
      async load(id) {
        if (id === resolvedVirtualModuleId) {
          if (options.prodModule.type === 'path') {
            return await fs.readFile(options.prodModule.path, 'utf-8');
          } else if (options.prodModule.type === 'source') {
            return options.prodModule.source;
          } else {
            // @ts-expect-error
            this.error(`Invalid prod config module type '${options.prodModule.type}'`)
          }
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
