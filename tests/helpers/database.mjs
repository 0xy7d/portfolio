import { DatabaseSync } from 'node:sqlite'
import { readFileSync } from 'node:fs'

/** SQLite-backed D1 adapter: execute the real migration and SQL, including transactions. */
export function testDatabase() {
  const sqlite = new DatabaseSync(':memory:')
  sqlite.exec(readFileSync(new URL('../../migrations/0001_portfolio.sql', import.meta.url), 'utf8'))
  function prepare(sql, values = []) {
    const execute = () => {
      const statement = sqlite.prepare(sql)
      const results = statement.columns().length ? statement.all(...values) : (statement.run(...values), [])
      return { results, meta: { changes: sqlite.prepare('SELECT changes() AS count').get().count } }
    }
    return {
      bind: (...parameters) => prepare(sql, parameters),
      first: async () => execute().results[0] ?? null,
      all: async () => execute(),
      run: async () => execute(),
      execute,
    }
  }
  return {
    sqlite,
    prepare,
    async batch(statements) {
      sqlite.exec('BEGIN')
      try {
        const results = statements.map(statement => statement.execute())
        sqlite.exec('COMMIT')
        return results
      } catch (error) { sqlite.exec('ROLLBACK'); throw error }
    },
  }
}
