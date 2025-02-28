/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_SERVER: string
	readonly VITE_APP_CATEGORIES: string
	readonly VITE_APP_PRODUCTS: string
	readonly VITE_APP_USERS: string
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}