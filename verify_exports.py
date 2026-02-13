import os
import json
import re

print("Starting verification...")

package_json_path = 'package.json'
src_path = 'src/components'
categories = ['atoms', 'molecules', 'organisms', 'rhf']

try:
    with open(package_json_path, 'r') as f:
        pkg = json.load(f)
        exports = pkg.get('exports', {})
    print(f"Loaded package.json, found {len(exports)} exports")
except Exception as e:
    print(f"Failed to load package.json: {e}")
    exit(1)

errors = []

for category in categories:
    cat_path = os.path.join(src_path, category)
    if not os.path.exists(cat_path):
        print(f"Category path {cat_path} does not exist")
        continue
    
    print(f"Checking category: {category}")
    
    # Read parent index.ts
    parent_index_path = os.path.join(cat_path, 'index.ts')
    parent_exports = ""
    if os.path.exists(parent_index_path):
        with open(parent_index_path, 'r') as f:
            parent_exports = f.read()
    else:
        print(f"Warning: {parent_index_path} missing")

    for component in os.listdir(cat_path):
        comp_path = os.path.join(cat_path, component)
        if not os.path.isdir(comp_path):
            continue
            
        # Check 1: index.ts exists
        if not os.path.exists(os.path.join(comp_path, 'index.ts')):
            if os.path.exists(os.path.join(comp_path, 'index.tsx')):
                 errors.append(f"[{category}/{component}] has index.tsx but should be index.ts")
            else:
                 errors.append(f"[{category}/{component}] missing index.ts")

        # Check 2: package.json export
        export_key = f"./{component}"
        if export_key not in exports:
            errors.append(f"[{category}/{component}] missing in package.json exports")

        # Check 3: parent index export
        if not re.search(fr'export \* from "[\./]+{component}', parent_exports):
             errors.append(f"[{category}/{component}] missing export in {category}/index.ts")

print("Finished checking.")

if not errors:
    print("All checks passed!")
else:
    print("Found errors:")
    for e in errors:
        print(e)
