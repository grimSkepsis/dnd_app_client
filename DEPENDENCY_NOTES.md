# Dependency Update Notes

## Dependencies with Major Version Updates Available (Not Updated)

### Production Dependencies

- **@hookform/resolvers**: Current v3.10.0 → v5.1.1 available
  - **Issue**: Breaking changes in v5.x
  - **Action**: Consider upgrading after reviewing breaking changes

- **zod**: Current v3.25.76 → v4.0.5 available
  - **Issue**: Breaking changes in v4.x
  - **Action**: Consider upgrading after reviewing breaking changes

### Development Dependencies

- **@types/node**: Current v20.19.8 → v24.0.14 available
  - **Issue**: May require Node.js 20+ and could have breaking changes
  - **Action**: Consider upgrading if Node.js version supports it

- **dotenv**: Current v16.6.1 → v17.2.0 available
  - **Issue**: May have breaking changes
  - **Action**: Review changelog before upgrading

- **eslint**: Current v8.57.1 → v9.31.0 available
  - **Issue**: Breaking changes in v9.x, Next.js may not support yet
  - **Action**: Wait for Next.js official support or review compatibility

- **tailwindcss**: Current v3.4.17 → v4.1.11 available
  - **Issue**: v4.x is in beta and has breaking changes
  - **Action**: Wait for stable release

## Successfully Updated Dependencies

### Production Dependencies
- @apollo/client: 3.10.8 → 3.13.8
- @apollo/experimental-nextjs-app-support: 0.11.0 → 0.12.2
- @hookform/resolvers: 3.9.0 → 3.10.0
- @tanstack/react-table: 8.17.3 → 8.21.3
- @types/lodash: 4.17.5 → 4.17.20
- class-variance-authority: 0.7.0 → 0.7.1
- lucide-react: 0.390.0 → 0.525.0
- next-themes: 0.3.0 → 0.4.6
- react-hook-form: 7.53.0 → 7.60.0
- sonner: 1.5.0 → 2.0.6
- tailwind-merge: 2.3.0 → 3.3.1
- zod: 3.23.8 → 3.25.76

### Development Dependencies
- @graphql-codegen/cli: 5.0.2 → 5.0.7
- @graphql-codegen/client-preset: 4.3.1 → 4.8.3
- @types/node: 20.x → 20.19.8
- dotenv: 16.4.5 → 16.6.1
- eslint: 8.x → 8.57.1
- postcss: 8.x → 8.5.6
- tailwindcss: 3.4.1 → 3.4.17
- typescript: 5.x → 5.8.3