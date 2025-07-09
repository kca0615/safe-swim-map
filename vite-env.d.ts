///  <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_MAPBOX_TOKEN: string; // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


