/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly HASHNODE_PUBLICATION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
