import { useMemo, useState } from 'react'
import './App.css'

const saveKey = 'bar-job-alert.saved'
const postKey = 'bar-job-alert.posts'
const alerts = [
  {
    "id": "bar-job-alert-1",
    "title": "バー求人 alert seed 1",
    "area": "名古屋",
    "category": "バー求人",
    "score": 95,
    "summary": "バー、飲食、夜職の求人、面接枠、体験入店、喫煙可店舗情報を通知し、成果報酬へつなげる。 バー求人の条件一致時に通知し、保存、送客、課金へつなげます。",
    "channels": [
      "LINE",
      "X"
    ],
    "tags": [
      "バー求人",
      "通知",
      "UGC",
      "収益導線"
    ],
    "revenue": "求人成果報酬"
  },
  {
    "id": "bar-job-alert-2",
    "title": "飲食求人 alert seed 2",
    "area": "東京",
    "category": "飲食求人",
    "score": 92,
    "summary": "バー、飲食、夜職の求人、面接枠、体験入店、喫煙可店舗情報を通知し、成果報酬へつなげる。 飲食求人の条件一致時に通知し、保存、送客、課金へつなげます。",
    "channels": [
      "LINE",
      "X",
      "メール"
    ],
    "tags": [
      "飲食求人",
      "通知",
      "UGC",
      "収益導線"
    ],
    "revenue": "面接予約"
  },
  {
    "id": "bar-job-alert-3",
    "title": "夜職 alert seed 3",
    "area": "大阪",
    "category": "夜職",
    "score": 89,
    "summary": "バー、飲食、夜職の求人、面接枠、体験入店、喫煙可店舗情報を通知し、成果報酬へつなげる。 夜職の条件一致時に通知し、保存、送客、課金へつなげます。",
    "channels": [
      "LINE",
      "X",
      "メール",
      "Slack"
    ],
    "tags": [
      "夜職",
      "通知",
      "UGC",
      "収益導線"
    ],
    "revenue": "店舗掲載"
  },
  {
    "id": "bar-job-alert-4",
    "title": "面接 alert seed 4",
    "area": "静岡",
    "category": "面接",
    "score": 86,
    "summary": "バー、飲食、夜職の求人、面接枠、体験入店、喫煙可店舗情報を通知し、成果報酬へつなげる。 面接の条件一致時に通知し、保存、送客、課金へつなげます。",
    "channels": [
      "LINE",
      "X"
    ],
    "tags": [
      "面接",
      "通知",
      "UGC",
      "収益導線"
    ],
    "revenue": "広告"
  }
]
const revenuePlans = [
  "求人成果報酬",
  "面接予約",
  "店舗掲載",
  "広告",
  "LINE課金"
]
const channels = [
  "LINE",
  "X",
  "メール",
  "Slack"
]
const faqs = [
  ['通知からどう収益化しますか？', '無料通知で接点を作り、条件一致時に予約、掲載、クーポン、有料通知、スポンサー枠へ誘導します。'],
  ['LINE・X・メール・Slackの使い分けは？', 'LINEは個人の即時通知、Xは拡散、メールは週次まとめ、Slackは店舗や法人運用向けです。'],
  ['SEO/AIO/LLMOの狙いは？', '地域名、カテゴリ、条件、通知、口コミ、FAQを組み合わせたロングテールページを作ります。'],
]

function readArray(key) {
  try { return JSON.parse(localStorage.getItem(key)) ?? [] } catch { return [] }
}

function App() {
  const [query, setQuery] = useState('名古屋')
  const [category, setCategory] = useState('すべて')
  const [saved, setSaved] = useState(() => readArray(saveKey))
  const [posts, setPosts] = useState(() => readArray(postKey))
  const [form, setForm] = useState({ title: '', channel: 'LINE', memo: '' })
  const categories = ['すべて', ...new Set(alerts.map((item) => item.category))]

  const filtered = useMemo(() => alerts.filter((item) => {
    const text = [item.title, item.area, item.category, item.summary, item.channels.join(' '), item.tags.join(' ')].join(' ')
    return text.includes(query) && (category === 'すべて' || item.category === category)
  }), [query, category])

  function toggleSave(id) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
    setSaved(next)
    localStorage.setItem(saveKey, JSON.stringify(next))
  }

  function addPost(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.memo.trim()) return
    const next = [{ ...form, id: crypto.randomUUID(), date: new Date().toLocaleDateString('ja-JP') }, ...posts]
    setPosts(next)
    localStorage.setItem(postKey, JSON.stringify(next))
    setForm({ title: '', channel: 'LINE', memo: '' })
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">飲食店・夜職・バー求人通知</p>
          <h1>Bar Job Alert</h1>
          <p className="lead">バー、飲食、夜職の求人、面接枠、体験入店、喫煙可店舗情報を通知し、成果報酬へつなげる。</p>
        </div>
        <aside className="hero-panel">
          <span>barjobalert.jp / bar-job-alert</span>
          <strong>通知の瞬間に、予約・掲載・クーポン・有料導線へつなげる。</strong>
          <p>LINE、X、メール、Slackを入口に、UGCで鮮度を作りながら収益導線を太くします。</p>
        </aside>
      </section>
      <section className="controls" aria-label="検索条件">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="地域・カテゴリ・通知条件で検索" />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      </section>
      <section className="metrics">
        <article><span>Alert seeds</span><strong>{alerts.length}</strong></article>
        <article><span>Channels</span><strong>{channels.length}</strong></article>
        <article><span>Saved</span><strong>{saved.length}</strong></article>
        <article><span>UGC</span><strong>{posts.length}</strong></article>
      </section>
      <section className="alert-grid">
        {filtered.map((alert) => (
          <article className="alert-card" key={alert.id}>
            <div className="card-top"><span>{alert.area} / {alert.category}</span><b>{alert.score}</b></div>
            <h2>{alert.title}</h2>
            <p>{alert.summary}</p>
            <div className="tag-row">{alert.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="channel-row">{alert.channels.map((channel) => <span key={channel}>{channel}</span>)}</div>
            <p className="revenue">収益導線: {alert.revenue}</p>
            <button type="button" onClick={() => toggleSave(alert.id)}>{saved.includes(alert.id) ? '保存済み' : '通知導線に保存'}</button>
          </article>
        ))}
      </section>
      <section className="split">
        <div className="panel">
          <h2>技術選定</h2>
          <article><b>Frontend</b><p>Vite + React 19。静的MVPとして軽く、GitHub Pagesへ展開しやすい構成です。</p></article>
          <article><b>通知連携</b><p>初期はUI設計、次段階でLINE Messaging API、X API、SendGrid/Mailgun、Slack Incoming Webhooksを接続します。</p></article>
          <article><b>Data</b><p>MVPは静的seed + localStorage。運用時はSupabaseまたはCloudflare D1へ移行します。</p></article>
          <article><b>収益ルート</b><p>{revenuePlans.join(' / ')}</p></article>
        </div>
        <div className="panel">
          <h2>UGC・通知リクエスト</h2>
          <p>現地確認、在庫、空席、価格、閉店、口コミ、通知希望条件を集めて、鮮度と検索ページを増やします。</p>
          <form className="ugc-form" onSubmit={addPost}>
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="通知リクエスト名" />
            <input value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })} placeholder="LINE / X / メール / Slack" />
            <input value={form.memo} onChange={(event) => setForm({ ...form, memo: event.target.value })} placeholder="条件・口コミ・現地メモ" />
            <button>投稿</button>
          </form>
          <div className="post-list">
            {posts.length === 0 && <p className="empty">公開後は通知希望とUGCで鮮度を作ります。</p>}
            {posts.map((post) => <article key={post.id}><b>{post.title}</b><p>{post.memo}</p><small>{post.channel} / {post.date}</small></article>)}
          </div>
        </div>
      </section>
      <section className="seo-section">
        <h2>SEO / AIO / LLMO</h2>
        <div className="seo-grid">
          <article><b>地域ページ</b><p>地域名、駅名、施設名ごとに通知ニーズを拾います。</p></article>
          <article><b>条件ページ</b><p>空き、値下げ、閉店、在庫、混雑、期限など行動直前の検索を狙います。</p></article>
          <article><b>法人ページ</b><p>掲載、スポンサー、Slack通知、レポート、SaaS契約へつなげます。</p></article>
        </div>
      </section>
      <section className="faq-section">
        <h2>FAQ</h2>
        <div className="faq-grid">{faqs.map(([q, a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
      </section>
    </main>
  )
}

export default App
