# Dependency Update Notes

## Dependencies with Major Version Updates Available (Not Updated)

### Production Dependencies

- **@hookform/resolvers**: Current v5.1.1 ✅ **UPDATED**
  - **Status**: Successfully upgraded to v5.1.1
  - **Changes**: No breaking changes encountered

- **zod**: Current v4.0.5 ✅ **UPDATED**
  - **Status**: Successfully upgraded to v4.0.5
  - **Changes**: Updated z.coerce.number() to z.number() in schemas
  - **Files Modified**: 
    - src/components/inventories/currency/types.ts
    - src/components/inventories/item-details/types.ts

### Development Dependencies

- **dotenv**: Current v16.6.1 → v17.2.0 available

  - **Issue**: May have breaking changes
  - **Action**: Review changelog before upgrading

- **eslint**: Current v9.31.0 ✅ **UPDATED**
  - **Status**: Successfully upgraded to ESLint v9 with Next.js 15 support
  - **Changes**: Migrated from .eslintrc.json to eslint.config.mjs flat config format

- **tailwindcss**: Current v3.4.17 → v4.1.11 available
  - **Issue**: v4.x is in beta and has breaking changes
  - **Action**: Wait for stable release

## Successfully Updated Dependencies

### Major Version Updates (with Breaking Changes)
- **@hookform/resolvers**: 3.10.0 → 5.1.1 - No breaking changes encountered
- **zod**: 3.25.76 → 4.0.5 - Fixed z.coerce.number() → z.number() in schemas
- **eslint**: 8.57.1 → 9.31.0 - Migrated to flat config format

### Minor/Patch Updates
