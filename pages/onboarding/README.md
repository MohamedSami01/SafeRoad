# شاشات البداية (Onboarding)

يحتوي هذا المجلد على أول شاشتين يراهما المستخدم عند فتح التطبيق لأول مرة.

---

## 1. Splash Screen — `splash.html`

### الغرض (Purpose)
شاشة تحميل أولية تظهر لثوانٍ معدودة عند فتح التطبيق، بهدف عرض الهوية البصرية وتحديد الوجهة التالية للمستخدم (Onboarding لمستخدم جديد، أو Home لمستخدم سبق له رؤية الـ Onboarding).

### التخطيط (Layout)
- تخطيط عمودي ممركز (Flexbox column, centered) يأخذ كامل الشاشة (100vh).
- خلفية بتدرج لوني من `--color-primary` إلى `--color-primary-dark`.
- الترتيب من الأعلى للأسفل: أيقونة/شعار → عنوان التطبيق → الشعار الدعائي (tagline) → مؤشر تحميل دائري.

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `.splash__logo` | أيقونة درع (🛡️) كرمز مؤقت للشعار |
| `.splash__title` | اسم التطبيق "خطوة أمان" بخط Cairo Black |
| `.splash__tagline` | جملة "قرارك اليوم.. ينقذ حياة غدًا" |
| `.splash__spinner` | دائرة تحميل متحركة (CSS keyframes) |

### المنطق (Logic - `splash.js`)
- بعد 2.2 ثانية، يتحقق من قيمة `khotwa_seen_onboarding` في `localStorage` عبر `Storage.get()`.
- إذا كانت القيمة `true` → ينتقل لـ `pages/home/home.html`.
- إذا لم تكن موجودة → ينتقل لـ `onboarding.html`.

### الانتقال (Navigation)
`splash.html` → `onboarding.html` **أو** `home.html`

---

## 2. Onboarding — `onboarding.html`

### الغرض (Purpose)
تعريف المستخدم الجديد بالفكرة الأساسية للتطبيق وأقسامه الأربعة الرئيسية، من خلال كاروسيل (Carousel) من 4 شرائح قابلة للتخطي.

### التخطيط (Layout)
- حاوية `.app-frame` بعرض أقصى `--max-width` (480px) ممركزة في الشاشة.
- زر "تخطي" ثابت في أعلى يسار/يمين الشاشة (`.onboarding__skip`).
- منطقة الشرائح في المنتصف (`.onboarding__slides`) — شريحة واحدة تظهر في كل مرة بفئة `.is-active`.
- مؤشر نقاط (`.onboarding__dots`) أسفل الشرائح يوضح الموضع الحالي.
- زر تنقل أساسي (`.onboarding__next`) ثابت في أسفل الشاشة، يتحول نصه إلى "ابدأ الآن" في الشريحة الأخيرة.

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `.onboarding__slide[data-slide]` | 4 شرائح، كل واحدة: أيقونة + عنوان (h2) + وصف (p) |
| `.dot[data-dot]` | نقطة مؤشر لكل شريحة، تتحول لمستطيل عند التفعيل |
| `#skipBtn` | يتخطى مباشرة لشاشة تسجيل الدخول |
| `#nextBtn` | يتقدم للشريحة التالية أو ينقل لتسجيل الدخول في الشريحة الأخيرة |

### المنطق (Logic - `onboarding.js`)
- متغير `currentSlide` يتتبع الشريحة الحالية (0 إلى 3).
- دالة `renderSlide()` تتحكم في إظهار/إخفاء الشرائح وتحديث النقاط.
- دالة `goToAuth()` تحفظ `khotwa_seen_onboarding = true` في `localStorage` قبل الانتقال، لمنع تكرار عرض الـ Onboarding في الزيارات القادمة.

### الانتقال (Navigation)
`onboarding.html` → `../auth/login.html`

---

## الاعتماديات المشتركة (Shared Dependencies)
- `css/variables.css`, `css/base.css`, `css/components.css`
- `js/storage.js` (مطلوب في `onboarding.html` لحفظ حالة المشاهدة)
- خطوط Google Fonts: Cairo (عناوين) + Tajawal (نصوص)
