/// <reference types="astro/client" />

namespace NodeJS {
  interface ProcessEnv {
    readonly GITHUB_API_BASE_URL: string
  }
}

interface ImportMetaEnv {
  readonly GITHUB_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
