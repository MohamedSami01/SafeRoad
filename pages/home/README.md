# الشاشة الرئيسية (Home)

نقطة الانطلاق المركزية لكل أقسام التطبيق بعد تسجيل الدخول.

---

## Home Dashboard — `home.html`

### الغرض (Purpose)
لوحة تحكم رئيسية تمنح المستخدم نظرة سريعة على إحصائية الأسبوع، وصولًا سريعًا لكل الأقسام الأربعة، تحدي اليوم، وحقيقة توعوية يومية — لتشجيعه على فتح التطبيق بشكل متكرر.

### التخطيط (Layout)
1. **Top bar** ثابت (`sticky`): اسم المستخدم على اليمين، وعداد النقاط + أيقونة الإشعارات على اليسار.
2. **بانر إحصائية** (`.home__banner`) ببطاقة بارزة بخلفية متدرجة من ألوان الهوية.
3. **شبكة وصول سريع** (`.quick-grid`) 2×2: الحوادث، مكافحة الإدمان، دليل المساعدة، إبلاغ سريع.
4. **بطاقة تحدي اليوم** (`.home__challenge`) بخلفية كريمية وحد لوني accent، مع زر CTA واحد.
5. **قسم "هل تعلم؟"** (`.home__fact`) كحقيقة نصية بسيطة.
6. **Bottom navigation** ثابت في الأسفل لكل الشاشات الرئيسية الخمس.

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `#userName` | يُحدّث ديناميكيًا من `home.js` بناءً على بيانات المستخدم المخزنة |
| `#pointsBadge` | يعرض عدد نقاط المستخدم الحالية |
| `.quick-card` (×4) | روابط `<a>` مباشرة لكل قسم رئيسي، تستخدم شكل `.card-signature` |
| `.bottom-nav` | شريط تنقل سفلي مشترك مع كل الشاشات الرئيسية (الرئيسية، الحوادث، الإدمان، المساعدة، حسابي) |

### المنطق (Logic - `home.js`)
- عند تحميل الصفحة، يقرأ بيانات المستخدم والنقاط من `localStorage` عبر `Storage.get()` ويملأ `#userName` و`#pointsBadge`.
- شريط التنقل السفلي يُدار بالكامل من `js/navigation.js` المشترك (تمييز الزر النشط + التنقل عند الضغط).

### الانتقال (Navigation)
- `home.html` → `../accidents/accidents-home.html`
- `home.html` → `../addiction/addiction-home.html`
- `home.html` → `../help/help-map.html`
- `home.html` → `../reporting/report-form.html`
- `home.html` → `../challenges/quiz-list.html` (من بطاقة تحدي اليوم)
- `home.html` → `../account/profile.html` (من شريط التنقل السفلي)

### الاعتماديات المشتركة (Shared Dependencies)
- `css/variables.css`, `css/base.css`, `css/components.css`, `./home.css`
- `js/storage.js`, `js/navigation.js`, `./home.js`
