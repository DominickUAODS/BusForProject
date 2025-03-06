interface ImportMetaEnv {
    readonly DB_NAME: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_HOST: string;
    readonly DB_PORT: string;
  
    readonly EMAIL_HOST: string;
    readonly EMAIL_PORT: number;
    readonly EMAIL_USE_TLS: boolean;
    readonly EMAIL_USE_SSL: boolean;
    readonly EMAIL_HOST_USER: string;
    readonly EMAIL_HOST_PASSWORD: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }