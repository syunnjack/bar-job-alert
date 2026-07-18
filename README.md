# Bar Job Alert

飲食店・夜職・バー求人通知

## Repository

Recommended repository name: `bar-job-alert`

## Domain candidates

First candidate: `barjobalert.jp`

Other candidates:

- `barjobalert.jp`
- `yorujob.jp`
- `barworkalert.jp`
- `nightwork.jp`

## Concept

バー、飲食、夜職の求人、面接枠、体験入店、喫煙可店舗情報を通知し、成果報酬へつなげる。

## Technical Selection

- Frontend: Vite + React 19
- Styling: Plain CSS
- Initial data: Static alert seed records in `src/App.jsx`
- Local state: localStorage for MVP saved alerts and UGC requests
- Notification integrations: LINE Messaging API, X API, transactional email provider, Slack Incoming Webhooks
- Future data layer: Supabase or Cloudflare D1
- SEO/AIO/LLMO: structured data, answer block, FAQ, sitemap, robots and `llms.txt`

## Revenue Paths

- 求人成果報酬
- 面接予約
- 店舗掲載
- 広告
- LINE課金

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```
