import { Pool } from 'pg';
import { config } from '@school/config';

const pool = new Pool({
  connectionString: config.database.url
});

export default pool; 