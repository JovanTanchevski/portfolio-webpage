/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_EMAIL: string;
  readonly VITE_PHONE: string;
  readonly VITE_CV_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

