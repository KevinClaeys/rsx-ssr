import { RouteTypes, ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';

// const defaultPostRenderers = ['seoHrefOptimise', baseHrefRewrite]
// setPluginConfig(baseHrefRewrite, {
//   href: '/rsx-ssr/',
// });

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "rsx-ssr",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',

  routes: {
    '/corporate': {
      type: 'ignored'
    }
  }, extraRoutes: [
    '/news',
  ],
};
