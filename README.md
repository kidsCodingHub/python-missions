# Kids Coding Hub — Python Missions

منصة تحديات تفاعلية لتثبيت حصص **Python Future Builders — Level 1**.

## روابط الحصص (كل حصة لينك منفصل)

بعد النشر على GitHub Pages، روابط الحصص الست تكون:

- `https://your-username.github.io/your-repo-name/#/session/01`
- `https://your-username.github.io/your-repo-name/#/session/02`
- `https://your-username.github.io/your-repo-name/#/session/03`
- `https://your-username.github.io/your-repo-name/#/session/04`
- `https://your-username.github.io/your-repo-name/#/session/05`
- `https://your-username.github.io/your-repo-name/#/session/06`

## خطوات النشر على GitHub Pages

1. أنشئ repo جديد على GitHub (لا تضيف README أو .gitignore).
2. ارفع الملفات إلى الـrepo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. اذهب إلى **Settings → Pages** في الـrepo.
4. في قسم **Source** اختر **GitHub Actions**.
5. اضغط على أي commit جديد أو اذهب إلى **Actions** وشغّل workflow يدويًا.
6. بعد دقيقتين، سيتم نشر الموقع على الرابط:
   ```
   https://your-username.github.io/your-repo-name/
   ```

## التشغيل المحلي

```bash
npm install
npm run dev
```

## بناء الإصدار النهائي

```bash
npm run build
```

للنشر على GitHub Pages مع base path:

```bash
npm run build -- --base=/your-repo-name/
```

## ملاحظات

- التطبيق يستخدم **HashRouter**، لذا كل حصة لها رابط مستقل.
- التقدم يُحفظ محليًا في `localStorage`.
- لا يوجد خادم خارجي أو API keys.
