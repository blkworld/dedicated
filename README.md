# John Doe — personal site

A minimal one-page static site. No build tools, no framework — just
`index.html` + `style.css`. This file walks you through everything,
assuming you've never used GitHub, Codespaces, or Vercel before.

---

## 0. What's actually in this folder

```
index.html    → the page itself (edit your name, bio, links here)
style.css     → all the styling (colors, fonts, spacing)
images/       → put your two photos here
robots.txt    → tells Google "you're allowed to crawl this site"
sitemap.xml   → tells Google "here is the one page that exists"
README.md     → this file
```

Every place you need to personalize is marked with a comment like
`STEP 1 —` inside `index.html`. Open the file and search for `your`
to find every placeholder value (fake name, fake domain, fake links).

---

## 1. Put this code on GitHub

GitHub is just a place to store your code online (a "repository", or
"repo" for short).

1. Go to [github.com](https://github.com) and create a free account if
   you don't have one.
2. Click the **+** icon top-right → **New repository**.
3. Name it something like `my-name-site`. Keep it **Public**. Don't
   add a README (you already have one) — click **Create repository**.
4. On the empty repo page, click **uploading an existing file** and
   drag in all the files from this folder (`index.html`, `style.css`,
   `robots.txt`, `sitemap.xml`, the `images` folder, this `README.md`).
   Commit the upload.

That's it — your code now lives on GitHub.

---

## 2. Edit the site using GitHub Codespaces

A Codespace is a full code editor (like VS Code) that runs in your
browser — you don't install anything on your computer.

1. On your repo's page, click the green **Code** button.
2. Click the **Codespaces** tab → **Create codespace on main**.
3. Wait ~30 seconds. A VS Code-like editor opens in your browser.
4. In the file list on the left, open `index.html`.
5. Replace every placeholder:
   - `John Doe` → your real name (appears ~6 times, use Find & Replace:
     `Ctrl/Cmd+Shift+H`)
   - the bio sentence in the `<figcaption>`
   - `https://your-link-here.com` → the link your button should open
   - `https://your-domain.vercel.app/` → leave this for now, you'll get
     this URL in Step 4 below, then come back and update it
6. Drag your two real photos into the `images` folder (right-click the
   folder → **Upload...**), named `profile-1.jpg` and `profile-2.jpg`
   — or rename them and update the `src=""` in `index.html` to match.
7. To preview it: right-click `index.html` → **Open with Live Server**
   (or install the "Live Server" extension first if it's not there).
8. When you're happy, save your changes back to GitHub:
   - Click the **Source Control** icon on the left sidebar (looks like
     a branch icon)
   - Type a short message like `add my content`
   - Click **Commit**, then **Sync Changes**

Your Codespace is temporary — the files are safely saved on GitHub
once you commit + sync. You can close the browser tab any time.

---

## 3. Deploy it to Vercel

Vercel takes the code in your GitHub repo and turns it into a live
website URL, and re-deploys automatically every time you push changes.

1. Go to [vercel.com](https://vercel.com) → **Sign up** → choose
   **Continue with GitHub** (this links the two accounts).
2. Click **Add New...** → **Project**.
3. Find your repo (`my-name-site`) in the list → click **Import**.
4. Framework preset: leave it as **Other** (this is a plain static
   site, no build step needed).
5. Click **Deploy**. Wait ~30 seconds.
6. Vercel gives you a live URL like `my-name-site.vercel.app`.

Open that URL — your site is now live on the internet.

---

## 4. Go back and fix the placeholder URLs

Now that you have your real Vercel URL:

1. In your Codespace (reopen it from GitHub if closed), find every
   `https://your-domain.vercel.app/` in `index.html`, `sitemap.xml`,
   and `robots.txt`, and replace it with your real URL.
2. Commit + sync again (same as Step 2.8). Vercel automatically
   redeploys within a minute — you don't need to do anything on the
   Vercel side.

Optional: in Vercel's project settings you can also connect a real
domain name (e.g. `johndoe.com`) instead of the `.vercel.app` one, if
you buy one later.

---

## 5. Tell Google the page exists

Deploying doesn't automatically mean Google indexes it — that can take
days to weeks on its own. You can speed it up:

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your site (use the "URL prefix" method with your Vercel URL).
3. Verify ownership (Search Console will give you a simple option
   like adding an HTML meta tag — follow its instructions).
4. Once verified, go to **Sitemaps** in the left menu → submit
   `sitemap.xml`.
5. Go to **URL Inspection**, paste your homepage URL, click
   **Request Indexing**.

This tells Google to crawl the page soon instead of waiting for it to
discover it on its own.

---

## A realistic note on the actual goal

One page with a name and two photos is unlikely to outrank your
existing LinkedIn/Instagram/etc. results quickly — those already have
years of authority. What this page *can* do:
- become one more legitimate result in the mix for your name
- act as a clean "hub" link you control, pointing to everything else
- get pulled into Google Images once it's indexed and your photos have
  proper alt text

To actually rank higher over time: keep the bio text real and
specific (not generic), link out to your other real profiles (the
`sameAs` list in the structured data), and get a few other sites
(social bios, a portfolio, etc.) linking back to this URL.
