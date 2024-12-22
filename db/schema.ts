import { int, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const financeTable = sqliteTable('finance_table', {
  id: int().primaryKey({ autoIncrement: true }),
  date: text().notNull(),
  name: text().notNull(),
  description: text(),
  price: real().notNull(),
  iconType: text().notNull(),
});
