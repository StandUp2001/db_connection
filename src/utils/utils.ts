import { Column } from "../types/types";
export const jsonError = "Invalid JSON";

/**
 * Retrieves the body structure from a database table.
 * @param {string} table - The name of the table.
 * @param {D1Database} DB - The database instance.
 * @returns {Promise<any>} - The body structure of the table.
 */
export async function getBodyFromTable(table: string, DB: D1Database): Promise<Record<string, string>> {
    const columns: Column[] = await getTablesInfo(table, DB);
    const body: Record<string, string> = {};
    for (const column of columns) {
        body[column.name] = column.type.toLowerCase() === "integer" ? "number" : "string";
    }
    return body;
}

/**
 * Retrieves information about the columns of a database table.
 * @param {string} table - The name of the table.
 * @param {D1Database} DB - The database instance.
 * @returns {Promise<Column[]>} - The information about the columns.
 */
export async function getTablesInfo(table: string, DB: D1Database): Promise<Column[]> {
    const sql: string = `PRAGMA table_info(${table})`;
    const res: D1Result<Column> = await DB.prepare(sql).all();
    return res.results;
}

/**
 * Retrieves the body of a request.
 * @param {Request} req - The request object.
 * @returns {Promise<any>} - The body of the request.
 */
export function getBody(req: Request): Promise<any> {
    try {
        if (req.body) { return req.json(); }
        return Promise.resolve(null);
    }
    catch (_) {
        return Promise.resolve(jsonError);
    }

}