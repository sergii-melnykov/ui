import { generatePackageExports, getComponentEntries } from "./build-entries.mjs"

generatePackageExports(getComponentEntries())
console.log("Synced package.json exports from src/components (atoms, molecules, organisms, rhf).")
