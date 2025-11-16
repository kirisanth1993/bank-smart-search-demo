export interface SearchResultItem {
  id: string;
  type: string;            // account | transaction | customer | loan | card | etc.
  title: string;
  subtitle?: string;
  icon?: string;
  metadata?: Record<string, any>;
}
