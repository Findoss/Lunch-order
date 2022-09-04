export const IS_DEV: boolean = process.env['APP'] === 'dev';
export const TG_TOKEN_BOT: string = process.env['TELEGRAM_BOT_TOKEN'] ?? '';
export const FILE_NAME_DB: string = process.env['APP'] ?? 'dev';
export const ADMIN_USERNAME: string =
  process.env['ADMIN_USERNAME'] ?? 'findoss';
export const REPORT_ID_CHENAL: number =
  Number(process.env['REPORT_ID_CHENAL']) ?? -669795023;
