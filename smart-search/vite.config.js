import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/smart-search.ts',
      name: 'BankSmartSearch',
      formats: ['es']
    }
  },
  server: {
    open: true, // open browser automatically
  }
});
