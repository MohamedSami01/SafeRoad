# الإبلاغ والتوعية المجتمعية (Reporting)

ثلاث شاشات تمكّن المستخدم من المساهمة في سلامة الطريق عبر إرسال بلاغات سريعة، وتتبعها لاحقًا.

---

## 1. Report Form — `report-form.html`

### الغرض (Purpose)
تسهيل إرسال بلاغ عن مشكلة طريق أو سائق متهور في أقل عدد خطوات، مع خيار عدم الكشف عن الهوية.

### التخطيط (Layout)
1. Top bar برجوع وعنوان "إرسال بلاغ".
2. **شبكة نوع البلاغ** (`.report-type-grid`) 2×N: 5 خيارات راديو مصممة كبطاقات قابلة للضغط (سائق متهور، إشارة تالفة، مطب خطير، حادث، أخرى).
3. **قسم الموقع**: زر "تحديد الموقع تلقائيًا" + منطقة خريطة مصغرة (`.map-placeholder.small`).
4. **قسم رفع صورة** (`.upload-box`) اختياري، بشكل منطقة سحب/ضغط منقطة الحدود.
5. حقل وصف نصي اختياري (`textarea`).
6. **خيار "إرسال بدون ذكر اسمي"** (`.anonymous-toggle`) كـ checkbox.
7. زر "إرسال البلاغ" بارز بلون `btn-danger` (لارتباطه بالإلحاح/الخطر).

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `.report-type` | حقل راديو مموّه (`input` مخفي) يُلوّن حدوده عند التحديد عبر `:has(input:checked)` |
| `#autoLocationBtn` | يستخدم `navigator.geolocation` الحقيقي لطلب الموقع من المتصفح |
| `#photoInput` | حقل رفع ملف مخفي (`visually-hidden`) مرتبط بـ `label` منسق كبطاقة رفع |
| `#anonymousCheck` | يُحفظ مع بيانات البلاغ لإخفاء هوية المستخدم عند الإرسال للجهة المختصة |

### المنطق (Logic - `reporting.js`)
- `autoLocationBtn`: يطلب الموقع الجغرافي ويُحدّث نص الزر بحسب النتيجة (نجاح/فشل).
- `photoInput` change: يعرض اسم الملف المختار داخل صندوق الرفع.
- `reportForm` submit: يمنع إعادة التحميل، يجمع بيانات البلاغ، يحفظه عبر `Storage.addReport()` (يضيف `id` و`status` تلقائيًا)، وينتقل لشاشة التأكيد.

### الانتقال (Navigation)
`report-form.html` → `report-confirm.html`

---

## 2. Report Confirmation — `report-confirm.html`

### الغرض (Purpose)
تأكيد استلام البلاغ وإعطاء المستخدم رقمًا مرجعيًا وحالة يمكنه تتبعها.

### التخطيط (Layout)
1. أيقونة تأكيد (✅) + عنوان + جملة شكر.
2. **بطاقة مرجعية** (`.report-ref`): صفين (رقم البلاغ، الحالة الحالية كـ badge).
3. أزرار: "عرض كل بلاغاتي السابقة" (outline) و"رجوع للرئيسية" (primary).

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `#reportId` / `#reportStatus` | يُحدّثان ديناميكيًا من `report-confirm.js` بقراءة آخر بلاغ محفوظ |

### المنطق (Logic - `report-confirm.js`)
- يقرأ أول عنصر في مصفوفة البلاغات المحفوظة (الأحدث، لأن `addReport` يستخدم `unshift`) ويعرض رقمه وحالته.

### الانتقال (Navigation)
- `report-confirm.html` → `reports-history.html`
- `report-confirm.html` → `../home/home.html`

---

## 3. Reports History — `reports-history.html`

### الغرض (Purpose)
عرض سجل كل البلاغات التي أرسلها المستخدم وحالتها الحالية.

### التخطيط (Layout)
1. Top bar برجوع.
2. قائمة بطاقات `.report-history-card` (نوع البلاغ + تاريخ + حالة كـ badge)، أو حالة فارغة (`.empty-state`) في حال عدم وجود بلاغات سابقة.

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `#reportsList` | يُملأ ديناميكيًا عبر `reports-history.js` |
| `#emptyState` | يظهر فقط إذا كانت قائمة البلاغات فارغة، ويحتوي CTA لإرسال أول بلاغ |

### المنطق (Logic - `reports-history.js`)
- يقرأ كل البلاغات من `localStorage`، يحول نوع كل بلاغ لاسم عربي مقروء عبر `REPORT_TYPE_LABELS`، ويبني بطاقة HTML لكل بلاغ ديناميكيًا.

---

## الاعتماديات المشتركة (Shared Dependencies)
- `css/variables.css`, `css/base.css`, `css/components.css`, `./reporting.css`
- `js/storage.js`, `js/navigation.js`, و JS خاص بكل شاشة (`reporting.js`, `report-confirm.js`, `reports-history.js`)
- **ملاحظة أمان/خصوصية**: عند ربط backend حقيقي، تأكد أن خيار "إرسال بدون ذكر اسمي" يُطبَّق فعليًا على مستوى الخادم (عدم إرسال أي معرف للمستخدم مع البلاغ) وليس فقط حقل واجهة.
