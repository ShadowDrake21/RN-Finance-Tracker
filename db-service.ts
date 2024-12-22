// import { IFinanceItem } from './dummy/dummy-balance-data';
// import { dummyBalanceData } from './dummy/dummy-balance-data';

// const tableName = 'finance-data';

// export const getDBConnection = async (): Promise<SQLiteDatabase> => {
//   try {
//     const db = await openDatabase({
//       name: 'finance-tracker.db',
//       location: 'default',
//     });
//     if (db === null || db === undefined) {
//       throw new Error('Failed to open database: db is null or undefined');
//     }
//     return db;
//   } catch (error) {
//     console.error('Failed to open database:', error);
//     throw Error('Failed to open database');
//   }
// };

// export const createTable = async (db: SQLiteDatabase) => {
//   const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
//     id TEXT PRIMARY KEY NOT NULL,
//     date TEXT NOT NULL,
//     name TEXT NOT NULL,
//     description TEXT,
//     price REAL NOT NULL,
//     iconType TEXT NOT NULL
//   );`;

//   await db.executeSql(query);
// };

// export const getFinanceDataPerDay = async (
//   db: SQLiteDatabase,
//   date: string
// ): Promise<IFinanceItem[]> => {
//   // export interface IFinanceItem {
//   //   id: string;
//   //   date: string;
//   //   name: string;
//   //   description?: string;
//   //   price: number;
//   //   iconType: string;
//   // }
//   try {
//     const financeItems: IFinanceItem[] = [];
//     const results = await db.executeSql(
//       `SELECT * FROM ${tableName} WHERE date = ?`,
//       [date]
//     );
//     results.forEach((result) => {
//       for (let index = 0; index < result.rows.length; index++) {
//         financeItems.push(result.rows.item(index));
//       }
//     });
//     return financeItems;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to get FinanceItems!');
//   }
// };

// export const saveFinanceItem = async (
//   db: SQLiteDatabase,
//   item: IFinanceItem
// ) => {
//   const insertQuery = `INSERT OR REPLACE INTO ${tableName} (id, date, name, description, price, iconType) values (?, ?, ?, ?, ?, ?)`;
//   await db.executeSql(insertQuery, [
//     item.id,
//     item.date,
//     item.name,
//     item.description,
//     item.price,
//     item.iconType,
//   ]);
// };

// export const deleteFinanceItem = async (db: SQLiteDatabase, id: number) => {
//   const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
//   await db.executeSql(deleteQuery);
// };

// export const deleteTable = async (db: SQLiteDatabase) => {
//   const query = `drop table ${tableName}`;

//   await db.executeSql(query);
// };

// export const getFinanceDataPerMonth = async (
//   db: SQLiteDatabase,
//   month: string
// ): Promise<IFinanceItem[]> => {
//   try {
//     const financeItems: IFinanceItem[] = [];
//     const results = await db.executeSql(
//       `SELECT * FROM ${tableName} WHERE strftime('%Y-%m', date) = ?`,
//       [month]
//     );
//     results.forEach((result) => {
//       for (let index = 0; index < result.rows.length; index++) {
//         financeItems.push(result.rows.item(index));
//       }
//     });
//     return financeItems;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to get FinanceItems!');
//   }
// };

// export const initializeDummyData = async (db: SQLiteDatabase) => {
//   try {
//     await createTable(db);
//     const insertPromises = dummyBalanceData.map((item) =>
//       saveFinanceItem(db, item)
//     );
//     await Promise.all(insertPromises);
//   } catch (error) {
//     console.error('Failed to initialize dummy data:', error);
//     throw Error('Failed to initialize dummy data!');
//   }
// };
