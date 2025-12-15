Clean build artifacts and dependencies.

Steps:
1. Remove node_modules from both projects: rm -rf apps/*/node_modules
2. Remove build outputs:
   - backend: rm -rf apps/backend/build apps/backend/out
   - frontend: rm -rf apps/web/dist apps/web/dist-ssr apps/web/.nitro apps/web/.output
3. Remove lock files if requested: rm apps/*/bun.lock

Ask user for confirmation before deleting.
