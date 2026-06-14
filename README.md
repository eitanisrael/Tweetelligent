# Twitter / X Search Builder

תיקייה מסודרת ומוכנה להעלאה ל-GitHub Pages.

## מבנה הקבצים

```text
package.json
index.html
vite.config.js
README.md
UPLOAD_ORDER.md
.gitignore
src/
  main.jsx
  App.jsx
.github/
  workflows/
    deploy.yml
```

## סדר העלאה ידני ל-GitHub

1. `package.json`
2. `index.html`
3. `vite.config.js`
4. `.gitignore`
5. `README.md`
6. `UPLOAD_ORDER.md`
7. `src/main.jsx`
8. `src/App.jsx`
9. `.github/workflows/deploy.yml`

אחרי זה:

1. Repository → Settings → Pages
2. Source → GitHub Actions
3. Actions → ודא שההרצה ירוקה

## הרצה מקומית

```bash
npm install
npm run dev
```
