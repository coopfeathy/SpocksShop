import { randomBytes, scryptSync } from "crypto";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
const email = process.env.ADMIN_EMAIL;
const storedHash = process.env.ADMIN_PASSWORD_HASH;

if (!url || !email) {
  console.log("Skipping admin ensure: DATABASE_URL or ADMIN_EMAIL missing.");
  process.exit(0);
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const sql = postgres(url, { max: 1 });
const existing = await sql`select id from users where email = ${email} limit 1`;
if (existing.length === 0) {
  const passwordHash = storedHash || hashPassword(process.env.ADMIN_BOOTSTRAP_PASSWORD || "change-me-now");
  await sql`insert into users (email, password_hash, role) values (${email}, ${passwordHash}, 'admin')`;
  console.log(`Created admin user ${email}`);
} else {
  console.log(`Admin user ${email} already exists`);
}
await sql.end();
