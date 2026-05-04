# 🏥 Hospital System – Deployment Guide

This project consists of three main components:

1. **Frontend** → React (Vite) application
2. **Backend** → Strapi (API + Admin Dashboard)
3. **Database** → MySQL (Restored via Strapi backup)

---

# 📦 1. Project Structure

```
project/
├── client/
├── strapi/
│   ├── final-backup.tar.gz.enc   # Encrypted DB backup (IMPORTANT)
│   └── ...
└── README.pdf
```

---

# 🟢 2. Frontend (React - Vite)

## 2.1 Install dependencies

```
cd client
npm install
```

---

## 2.2 Environment variables (Frontend)

Create a `.env` file inside:

```
/client/.env
```

Add:

```
VITE_STRAPI_URL=http://localhost:1337
```

### 🔍 Explanation

This variable defines the **API URL of the Strapi backend** that the frontend (React application) will communicate with.

---

### ⚠️ VERY IMPORTANT (Production Setup)

After deployment, this value **MUST be updated** to the actual backend URL.

#### Example:

If Strapi is deployed on:

```
https://api.yourdomain.com
```

Then update `/client/.env` to:

```
VITE_STRAPI_URL=https://api.yourdomain.com
```

---

### ❌ If not configured correctly

- Frontend will NOT load data
- API requests will fail
- Website will appear empty or broken

---

## 2.3 Build frontend

```
npm run build
```

---

## 2.4 Output

```
/dist
```

Deploy `/dist` to your web server (Nginx / Apache / hosting).

---

# 🔵 3. Backend (Strapi)

## 3.1 Install dependencies

```
cd strapi
npm install
npm install mysql2
```

---

## 3.2 Environment variables (REQUIRED)

Create `.env` inside `/strapi`:

```
HOST=0.0.0.0
PORT=1337

DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=qnh_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=yourpassword

JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_secret
APP_KEYS=your_app_keys
```

---

# 🟡 4. Database Setup & Restore (CRITICAL)

## 4.1 Create MySQL database

```sql
CREATE DATABASE qnh_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

---

## 4.2 Initialize Strapi (create tables)

```
npm run develop
```

Wait until Strapi starts successfully, then stop:

```
CTRL + C
```

---

## 4.3 Restore Data

The backup file is located inside `/strapi`:

```
final-backup.tar.gz.enc
```

Run:

```
npx strapi import --file final-backup.tar.gz.enc --key qnh123
```

When prompted:

```
The import will delete your existing data
```

Type:

```
Yes
```

---

## ⚠️ IMPORTANT

- This will **delete existing MySQL data only**
- It will NOT affect any other database
- Make sure `.env` database configuration is correct BEFORE import
- It restores:
  - All content
  - Media files
  - Users & roles
  - Relations
  - CMS configuration

---

## 🔐 Backup Key

```
Encryption Key: qnh123
```

👉 This key MUST be used during import.

---

## 4.4 Start in production

```
npm run build
npm start
```

---

# 🌐 5. Domain & Routing

```
yourdomain.com        → React frontend
api.yourdomain.com    → Strapi backend
```

---

# 🔁 6. System Flow

```
User → React (Frontend)
React → Strapi API
Strapi → MySQL Database

Admin → /admin panel
```

---

# ⚠️ 7. Important Notes

❌ Do NOT use:

```
npm run dev
```

✔ Use:

```
npm run build
npm start
```

# ✅ 8. Summary

| Component | Action                           |
| --------- | -------------------------------- |
| React     | `npm run build` → deploy `/dist` |
| Strapi    | `npm run build && npm start`     |
| Database  | Restore via `strapi import`      |

---

# 📞 Support

For deployment assistance or issues, contact the developer.
