# 🛡️ خطوة أمان (Khotwat Amaan)

تطبيق ويب توعوي يهدف لتقليل حوادث الطرق الناتجة عن الإدمان أو القيادة المتهورة، من خلال التوعية، الدعم النفسي، الإبلاغ المجتمعي، والتفاعل التحفيزي.

> **شعار التطبيق:** "قرارك اليوم.. ينقذ حياة غدًا"

بُني هذا المشروع كـ **HTML / CSS / JavaScript Vanilla** (بدون أي framework أو أداة بناء)، بحيث يمكن فتحه وتشغيله مباشرة في المتصفح، أو رفعه على أي استضافة ملفات ثابتة (Static Hosting) كما هو.

---

## 🚀 طريقة التشغيل

لا حاجة لتثبيت أي شيء. ببساطة:

1. افتح ملف `index.html` (في جذر المشروع) في متصفحك مباشرة، أو
2. لتجربة أقرب للواقع (خاصة لاستخدام `localStorage` بدون مشاكل CORS)، شغّل خادمًا محليًا بسيطًا:

```bash
# باستخدام Python (مثبت غالبًا على أغلب الأجهزة)
cd khotwat-amaan
python3 -m http.server 8000

# أو باستخدام Node.js (إذا كان متاحًا)
npx serve .
```

ثم افتح `http://localhost:8000` في المتصفح.

---

## 📁 هيكل المشروع (Folder Structure)

```
khotwat-amaan/
│
├── index.html                  # نقطة الدخول، يحوّل تلقائيًا لشاشة Splash
│
├── css/                        # الأنماط المشتركة بين كل الشاشات
│   ├── variables.css           # توكنز التصميم: ألوان، خطوط، مسافات، ظلال
│   ├── base.css                # Reset + إعدادات RTL + هيكل .app-frame
│   └── components.css          # مكونات UI مشتركة: أزرار، بطاقات، شريط تنقل، تابات...
│
├── js/                         # سكريبتات مشتركة بين كل الشاشات
│   ├── navigation.js           # منطق شريط التنقل السفلي + دالة goBack()
│   └── storage.js              # طبقة تجريدية فوق localStorage (نقاط، بلاغات، مستخدم)
│
├── assets/
│   ├── icons/                  # أيقونات SVG/PNG (فارغ حاليًا، استُخدمت Emoji كبدائل)
│   └── images/                 # صور التطبيق (فارغ حاليًا)
│
└── pages/                      # كل شاشة في مجلدها الخاص (HTML + CSS + JS + README)
    │
    ├── onboarding/              # 1-2: Splash + Onboarding
    │   ├── splash.html / .css / .js
    │   ├── onboarding.html / .css / .js
    │   └── README.md
    │
    ├── auth/                    # 3: تسجيل الدخول / إنشاء حساب
    │   ├── login.html
    │   ├── signup.html
    │   ├── auth.css / auth.js
    │   └── README.md
    │
    ├── home/                    # 4: الشاشة الرئيسية
    │   ├── home.html / .css / .js
    │   └── README.md
    │
    ├── accidents/                # 5-6: قسم الحوادث
    │   ├── accidents-home.html
    │   ├── content-detail.html
    │   ├── accidents.css / accidents.js / content-detail.js
    │   └── README.md
    │
    ├── addiction/                # 7-8: قسم مكافحة الإدمان
    │   ├── addiction-home.html
    │   ├── addiction-detail.html
    │   ├── addiction.css
    │   └── README.md
    │
    ├── challenges/                # 9-10: التحديات والمسابقات
    │   ├── quiz-list.html
    │   ├── quiz-question.html
    │   ├── quiz-result.html
    │   ├── challenges.css / quiz.js / quiz-result.js
    │   └── README.md
    │
    ├── help/                      # 11-13: دليل المساعدة + الدعم النفسي
    │   ├── help-map.html
    │   ├── center-detail.html
    │   ├── support-corner.html
    │   ├── help.css / help.js
    │   └── README.md
    │
    ├── reporting/                  # 14-16: الإبلاغ المجتمعي
    │   ├── report-form.html
    │   ├── report-confirm.html
    │   ├── reports-history.html
    │   ├── reporting.css / reporting.js / report-confirm.js / reports-history.js
    │   └── README.md
    │
    └── account/                    # 17-18: الحساب والإعدادات
        ├── profile.html
        ├── settings.html
        ├── account.css / account.js / settings.js
        └── README.md
```

### فلسفة الهيكل

- **CSS و JS مشتركان على مستوى الجذر** (`/css`, `/js`) — أي تصميم أو منطق يُستخدم في أكثر من شاشة (الأزرار، البطاقات، شريط التنقل، التخزين) يعيش هنا، ولا يتكرر.
- **كل صفحة في مجلدها الخاص داخل `/pages`** مع ملفاتها الخاصة (CSS/JS الخاصين بها فقط) — هذا يجعل المشروع **قابلاً للتوسع**: إضافة شاشة جديدة = مجلد جديد، بدون التأثير على باقي الشاشات.
- **كل مجلد شاشات يحتوي `README.md` خاص به** يشرح كل شاشة بداخله (الغرض، التخطيط، المكونات، المنطق، التنقل) — بدل ملف توثيق ضخم واحد يصعب تتبعه.
- **توكنز التصميم مركزية في `variables.css`** — تغيير لون أساسي واحد فيه يُحدّث كل الشاشات تلقائيًا، بدون البحث في عشرات الملفات.

---

## 🎨 نظام التصميم (Design System) باختصار

| العنصر | القيمة |
|---|---|
| اللون الأساسي | `#0d6e6e` (تركواز - ثقة وأمان) |
| لون التحذير/Accent | `#f4a93a` (كهرماني دافئ - لافتات الطريق) |
| لون الخطر/الطوارئ | `#c0392b` |
| الخلفية | `#f7f5f0` (كريمي دافئ) |
| خط العناوين | Cairo (Bold/Black) |
| خط النصوص | Tajawal |
| الشكل المُوقّع (Signature) | بطاقات بزاوية مقصوصة (`.card-signature`) تذكّر بلافتة تحذير على الطريق |

كل هذه القيم موجودة كمتغيرات CSS في `css/variables.css` ويُعاد استخدامها في كل مكون عبر التطبيق.

---

## 🗺️ خريطة تنقل الشاشات (User Flow)

```
splash → onboarding → login/signup ──► home
                                          │
            ┌─────────────┬──────────────┼──────────────┬─────────────┐
            ▼             ▼              ▼              ▼             ▼
       accidents-home  addiction-home  help-map     report-form     profile
            │             │              │              │             │
            ▼             ▼              ▼              ▼             ▼
     content-detail  addiction-detail center-detail report-confirm  settings
                            │              │              │
                            ▼              ▼              ▼
                     quiz-list      support-corner   reports-history
                            │
                            ▼
                     quiz-question → quiz-result
```

---

## ⚙️ ملاحظات تقنية مهمة

- **التخزين**: التطبيق يستخدم `localStorage` (عبر `js/storage.js`) كمحاكاة لقاعدة بيانات بسيطة — لتخزين بيانات المستخدم، النقاط، والبلاغات. **يجب استبدال هذا باستدعاءات API حقيقية** عند ربط التطبيق بخادم/قاعدة بيانات فعلية.
- **الخريطة**: شاشات `help-map.html` تحتوي على عنصر `.map-placeholder` بديل بصري فقط. عند البناء الفعلي، يجب استبداله بمكتبة خرائط حقيقية (مثل Google Maps JavaScript API أو Leaflet.js).
- **الأيقونات**: استُخدمت رموز Emoji كبدائل مؤقتة لتوضيح الفكرة بسرعة دون الاعتماد على ملفات صور خارجية. يمكن استبدالها بأيقونات SVG حقيقية في `assets/icons/` لاحقًا.
- **اللغة**: كل الصفحات بصيغة `dir="rtl"` و`lang="ar"` بشكل ثابت. دعم تبديل اللغة (عربي/إنجليزي) المذكور في شاشة الإعدادات يحتاج طبقة ترجمة (i18n) لم تُبنَ في هذا الـ Boilerplate.
- **التوافق مع المتصفحات**: تستخدم بعض الأنماط خاصية `:has()` (في `reporting.css`)، وهي مدعومة في كل المتصفحات الحديثة (Chrome, Edge, Safari, Firefox 121+).
