/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "csstype" {
  interface Properties {
    [index: `--${string}`]: unknown
  }
}
