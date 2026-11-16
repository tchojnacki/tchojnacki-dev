/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

declare module "csstype" {
  interface Properties {
    [index: `--${string}`]: unknown
  }
}
