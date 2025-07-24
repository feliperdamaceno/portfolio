/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
