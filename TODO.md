# Feature: Implement Creator Categories and Tags (#70)

✅ **Plan approved by user.**

## TODO Steps

1. ✅ Create `src/utils/categories.ts` (category/tag lists, utils)
2. ✅ Update `src/schemas/creatorSchema.ts` (add categories/tags)
3. ✅ Create `src/components/TagBadge.tsx`
4. ✅ Create `src/components/TagCloud.tsx`
5. ✅ Create `src/components/CategoryFilter.tsx` (multi-select)
6. ✅ Update `src/services/api.ts` (endpoints + mocks)
7. ✅ Update `src/app/explore/page.tsx` (add tags filtering/cloud/search)
8. ✅ Update `src/app/creator/[username]/page.tsx` (display tags/categories)
9. [ ] Add Vitest: `src/components/__tests__/CategoryFilter.test.tsx`, `TagCloud.test.tsx`, `TagBadge.test.tsx`
10. [ ] Update E2E tests: `tests/e2e/creator-profile.spec.ts`, `tests/e2e/explore.spec.ts`
11. [ ] `npm run test && npx playwright test`
12. [ ] `git checkout -b feature/creator-categories`
13. [ ] `git add . && git commit -m "feat(creators): add categories and tags #70"`
14. [ ] Check/install `gh` CLI
15. [ ] `gh pr create --title "feat: Implement Creator Categories and Tags #70" --base main`
16. [ ] Verify CI passes

**Next step after each: Update this TODO.md and run tests.**

