import { FILE_NAME_DB, IS_DEV } from '../../config';
import JSONdb from 'simple-json-db';

export const db = new JSONdb(`./db.${FILE_NAME_DB}.json`, {
  asyncWrite: true,
  jsonSpaces: !IS_DEV,
});

export async function load(key: string) {
  return db.get(key);
}

export async function save(key: string, payload: any) {
  db.set(key, payload);
}
