# AssetElevatte — React + Node.js + MySQL

This is the first migration of the supplied Core PHP website into a React frontend and Express API. It preserves the supplied public-page copy, navy/white/gold visual direction, MySQL table structure, published-blog behaviour, blog search/pagination, and contact-enquiry storage.

## Included in this migration

- React + Vite pages: Home, About, Services, Markets, Blogs, Blog detail, Contact
- Express API: health check, latest blogs, blog listing/search/pagination, blog detail, contact enquiry submission
- MySQL connection pool using `mysql2`
- Input validation, parameterized SQL, Helmet, rate limiting, configurable CORS
- Vercel configuration for the React static build and Express API function

## Not yet migrated

The upload did not contain the original `includes/header.php`, `includes/footer.php`, `includes/functions.php`, CSS/assets folder, or `admin/` PHP files. The shared layout/styles have therefore been recreated from the supplied page markup. The admin login, blog management CRUD, enquiry inbox, CSRF workflow, and password setup are **not implemented yet**. The `admins` table is retained in the schema, but no public admin API is exposed.

## Requirements

- Node.js 20 or newer
- MySQL 8.x (or a compatible MySQL service)
- npm

## 1. Install dependencies

From the project root:

```bash
npm install
```

## 2. Configure MySQL

Create a local database and import the SQL file you supplied, or use the included schema:

```bash
mysql -u root -p < database/schema.sql
```

If the database already exists with your original data, do not import over it blindly. Back it up first. The project expects the existing tables `posts` and `enquiries` with the columns shown in `database/schema.sql`.

Copy `.env.example` to `.env` in the project root and set your database connection:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=assetelevatte_php
DB_USER=root
DB_PASSWORD=your_local_mysql_password
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

Never commit `.env` or put database credentials in frontend environment variables.

## 3. Run locally

```bash
npm run dev
```

- React: http://localhost:5173
- API health: http://localhost:5000/api/health
- Blog API: http://localhost:5000/api/blogs

If you use a database with no published posts yet, the blog area will show its empty state.

## 4. Build

```bash
npm run build
```

The generated frontend files are in `frontend/dist`.

## 5. Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Keep the project root as the repository root.
4. Vercel uses `npm install`, `npm run build`, and `frontend/dist` as configured in `vercel.json`.
5. Add the MySQL variables from `.env.example` in Vercel Project Settings → Environment Variables.
6. Set `FRONTEND_ORIGIN` to your deployed domain, e.g. `https://assetelevatte.com`.
7. Deploy and test `/api/health`, `/api/blogs`, and the contact form.

**Database note:** Vercel does not host a persistent MySQL database. Use a managed MySQL provider or another securely reachable MySQL host. Restrict database network access where possible, use TLS if supported, and create a dedicated least-privilege database user. Confirm the provider supports connections from Vercel/serverless functions. Do not use your Mac's `localhost` database in production.

## 6. Important production checks

- Back up the original database before migrating.
- Use a dedicated database user (not MySQL root).
- Configure the provider's connection limits/pooling for serverless traffic.
- Add CAPTCHA or equivalent spam protection to the public contact form before launch.
- Configure transactional email separately if enquiry email notifications are required. The supplied PHP project only stores enquiries in MySQL.
- Add an admin authentication system before rebuilding the admin CMS.
- Review privacy policy, terms, and data retention for enquiries.
- Test every page and form on the production domain before changing DNS.

## Original-to-new route mapping

| Original PHP page | React route |
|---|---|
| `index.php` | `/` |
| `about.php` | `/about` |
| `services.php` | `/services` |
| `markets.php` | `/markets` |
| `blogs.php` | `/blogs` |
| `blog.php?slug=...` | `/blog/:slug` |
| `contact.php` | `/contact` |

## API routes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health |
| GET | `/api/blogs/latest` | Latest 3 published posts |
| GET | `/api/blogs?q=&page=` | Published posts with search and pagination |
| GET | `/api/blogs/:slug` | One published article |
| POST | `/api/enquiries` | Validate and store contact enquiry |

\n## Admin panel and supplied logo\n\nThe supplied logo is in `frontend/public/assetelevatte-logo.png`. The `/admin` page supports sign-in, viewing posts, creating/editing articles, saving drafts, publishing and deleting posts.\n\nCreate an admin after configuring `.env` and importing the supplied SQL database:\n\n```bash\nnode backend/scripts/createAdmin.js yourusername "a-strong-password-at-least-12-chars"\n```\n\nSet a random `JWT_SECRET` of at least 32 characters (`openssl rand -hex 32`). The password is stored as a bcrypt hash. Then run `npm run dev` and open `http://localhost:5173/admin`.\n\n### Blog/API diagnosis\n\nOpen `http://localhost:5000/api/health` while both services are running. A JSON response with `database: connected` confirms MySQL access. HTTP 503 means Express is running but cannot connect to MySQL: check MySQL is running and root `.env` has correct `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`. Connection refused means the backend is not running on port 5000; start from the project root with `npm run dev`.\n\nFor production use a dedicated least-privilege MySQL user (not root), set `JWT_SECRET` in Vercel, and create the admin in the production database using this script from a trusted machine with secure database access.\n