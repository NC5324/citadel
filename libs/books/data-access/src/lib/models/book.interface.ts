export interface Book {
  key: string;
  title: string;
  author_name: string[];
  description: string | { value: string };
  first_publish_year: number;
  cover_i: string;
  covers: string[];
  subject: string[];
  subjects: string[];
}
