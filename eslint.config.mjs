import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

const config = [
  ...require("eslint-config-next/core-web-vitals"),
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**"],
  },
]

export default config

