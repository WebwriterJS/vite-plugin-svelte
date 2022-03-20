type configModuleSource = {
  type: 'source';
  source: string;
}

type configModulePath = {
  type: 'path';
  path: string;
}

type configModule =  configModuleSource | configModulePath;

interface UserOptions {
  devModule?: configModule;
  prodModule?: configModule;
}

interface Options extends Required<UserOptions> { }

const defaultOptions: Options = {
  devModule: {
    type: 'source',
    source: `
      import { Buffer } from "buffer";

      export default {
        async loadRaw(path) {
          return "Can't load raw! Dev configuration module not provided to Webwriter";
        },

        async loadHtml() {
          return "Can't load HTML! Dev configuration module not provided to Webwriter";
        },

        async save(path, data) {
          alert("Can't save! Dev configuration module not provided to Webwriter");
        },
      };
    `,
  },
  prodModule: {
    type: 'source',
    source: `
      export default {
        async loadHtml(path) {
          return "Can't load HTML! Prod configuration module not provided to Webwriter";
        },
      };
    `,
  },
};

function resolveOptions(userOptiuons: UserOptions): Options {
  return Object.assign(defaultOptions, userOptiuons);
}

export {
  UserOptions,
  Options,
  defaultOptions,
  resolveOptions,
};
