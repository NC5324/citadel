import { createActionGroup, props } from "@ngrx/store";
import { Book } from './books.feature';

export const BooksActions = createActionGroup({
    source: 'Books',
    events: {
        search: props<{ query: string }>(),
        searchSuccess: props<{ books: Book[]; page: number; hasMore: boolean }>(),
        showMore: props<{ query: string }>(),
        showMoreSuccess: props<{ books: Book[]; page: number; hasMore: boolean }>(),
    },
});

