# KLIO Antique Salon — Website

## Setup Instructions

### Step 1 — Set up Tina Cloud (the admin panel)
1. Go to **https://app.tina.io** and sign up with GitHub
2. Click **"New Project"** → connect to your `klio-salon` GitHub repo
3. Copy your **Client ID** and **Token**

### Step 2 — Add environment variables in Vercel
1. Go to your Vercel project → **Settings → Environment Variables**
2. Add:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = your Client ID from Tina
   - `TINA_TOKEN` = your Token from Tina

### Step 3 — Push this code to GitHub
Replace all files in your `klio-salon` repo with this project's files.

### Step 4 — Access your admin panel
Visit: `https://your-site.vercel.app/admin`
Log in with your Tina Cloud account.

---

## Managing your site (no coding needed!)

### Add a product
1. Go to `/admin` on your live site
2. Click **"Products & Inventory"** → **"New Product"**
3. Fill in name, price, era, upload a photo
4. Check **"Show on Homepage"** to feature it
5. Click **Save** — site updates in ~30 seconds!

### Edit homepage text
1. Go to `/admin`
2. Click **"Homepage Text & Settings"**
3. Edit any text and save

### Upload product photos
- In the product editor, click the image field
- Upload directly from your computer

---

## Local development
```bash
npm install
npm run dev
# Visit http://localhost:3000
# Admin panel: http://localhost:3000/admin
```
