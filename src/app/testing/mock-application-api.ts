import { of } from 'rxjs';

export function createMockApplicationApiService() {
  return {
    getStats: () =>
      of({
        total: 0,
        draft: 0,
        submitted: 0,
        inReview: 0,
        approved: 0,
        rejected: 0,
      }),
    list: () => of({ items: [], total: 0, page: 1, pageSize: 10 }),
    getById: () => of(null),
    createDraft: () => of({ id: 'app-test' }),
    save: () => of({}),
    submit: () => of({}),
    review: () => of({}),
    listReviewers: () => of([]),
    assignReviewer: () => of({}),
    checkFieldAvailability: () => of({ available: true }),
    simulateTokenExpiry: () => of({ ok: true }),
    deleteDraft: () => of(undefined),
  };
}
