/// <reference types="vite/client" />

// Declare CSS modules so TypeScript doesn't error on CSS imports
declare module '*.css' {
  const content: Record<string, string>
  export default content
}
