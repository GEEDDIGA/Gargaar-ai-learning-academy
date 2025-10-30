<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DXNPLB4CFkJ8fH4MoWXJLRlT20MDiRqq

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


---

## ⚠️ MUHIIM: Xal Dhibaatada API Key

App-ku wuxuu isticmaalaa `process.env.API_KEY` laakiin Vite build wuxuu u baahan yahay `import.meta.env.VITE_API_KEY`.

### Sida loo xalliyo (2 daqiiqo):

1. **Fur file-ka index.tsx:**
   - Tag: https://github.com/GEEDDIGA/Gargaar-ai-learning-academy/edit/main/index.tsx

2. **Find & Replace:**
   - Press `Ctrl+F` (Windows) ama `Cmd+F` (Mac)
   - Type ku qor: `process.env.API_KEY`
   - Beddel ku qor:  `import.meta.env.VITE_API_KEY`
   - Guji "Next" oo guji "Replace" labada meel (line 106 iyo 254)

3. **Commit Changes:**
   - Scroll down oo click "Commit changes"
   - Vercel automatic deployment ayuu bilaabin doonaa

4. **Test App:**
   - Sug 2-3 daqiiqo
   - Tag: https://gargaar-ai-learning-academy.vercel.app/
   - Click cashar - hadda wuu shaqeyn doonaa! ✅

---
