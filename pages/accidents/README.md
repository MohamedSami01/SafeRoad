# قسم الحوادث (Accidents)

يجمع كل المحتوى التوعوي المتعلق بالسلامة المرورية.

---

## 1. Accidents Home — `accidents-home.html`

### الغرض (Purpose)
عرض كل المحتوى التوعوي عن السلامة المرورية في مكان واحد، مقسم لأربع فئات يتنقل المستخدم بينها بسهولة عبر تبويبات (Tabs).

### التخطيط (Layout)
1. **Top bar**: زر رجوع، عنوان "قسم الحوادث"، أيقونة بحث.
2. **شريط تبويبات** (`.tabs`) أفقي قابل للتمرير: فيديوهات، قصص حقيقية، نصائح، إحصائيات.
3. **لوحة محتوى لكل تبويب** (`.tab-panel`) — لوحة واحدة ظاهرة في كل مرة:
   - **فيديوهات/قصص**: بطاقات `.content-card` (صورة مصغرة + عنوان + بادچ المدة أو وصف).
   - **نصائح**: عناصر `<details>` قابلة للطي/الفتح لعرض النصيحة كاملة.
   - **إحصائيات**: بطاقات `.stat-card` برقم كبير ووصف.
4. **Bottom navigation** مشترك.

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `.tab[data-tab]` | 4 أزرار تبويب، تتحول لـ `.is-active` عند الاختيار |
| `.tab-panel[data-panel]` | لوحة محتوى مطابقة لكل تبويب |
| `.content-card` | بطاقة قابلة للضغط تنقل لـ `content-detail.html` |
| `.tip-item` (`<details>`) | نصيحة قابلة للطي، لا تحتاج JS لفتح/إغلاق |
| `.stat-card` | رقم إحصائي بارز + وصف سطر واحد |

### المنطق (Logic - `accidents.js`)
- عند الضغط على أي `.tab`، يُزال `.is-active` من كل التبويبات واللوحات، ثم يُضاف فقط للتبويب واللوحة المطابقة لـ `data-tab`/`data-panel`.

### الانتقال (Navigation)
`accidents-home.html` → `content-detail.html?type=video&id=N` (عند الضغط على أي بطاقة)

---

## 2. Content Detail — `content-detail.html`

### الغرض (Purpose)
عرض فيديو أو قصة توعوية بشكل كامل، مع إمكانية التفاعل (إعجاب، مشاركة، حفظ) ومحتوى مشابه مقترح.

### التخطيط (Layout)
1. **Top bar** بزر رجوع فقط.
2. **منطقة الوسائط** (`.detail__media`) — placeholder لمشغل فيديو.
3. عنوان + تاريخ النشر.
4. النص الكامل للمحتوى.
5. **شريط تفاعل** (`.detail__actions`): إعجاب (مع عداد)، مشاركة، حفظ.
6. **شبكة محتوى مشابه** (`.related-grid`) تستخدم نفس مكون `.content-card`.
7. زر "شارك تجربتك أو قصتك" في الأسفل.

### المكونات (Components)
| المكون | الوصف |
|---|---|
| `#likeBtn` / `#likeCount` | يزيد/ينقص عداد الإعجاب عند الضغط (Toggle) |
| `#shareBtn` | يستخدم `navigator.share` إن كان متاحًا، أو تنبيه بديل |
| `#shareStoryBtn` | يفتح (مستقبلًا) نموذج إرسال قصة شخصية للمراجعة |

### المنطق (Logic - `content-detail.js`)
- يقرأ `id` و`type` من رابط الصفحة (`URLSearchParams`) — حاليًا المحتوى المعروض ثابت (placeholder)، ويُفترض ربطه بـ API لجلب المحتوى الحقيقي حسب `id`.
- `likeBtn` يبدّل حالة `liked` ويُحدّث العداد المعروض.

### الانتقال (Navigation)
`content-detail.html` → رجوع لـ `accidents-home.html`، أو لمحتوى مشابه آخر بنفس الصفحة (`?id=`)

---

## الاعتماديات المشتركة (Shared Dependencies)
- `css/variables.css`, `css/base.css`, `css/components.css`, `./accidents.css`
- `js/storage.js`, `js/navigation.js`, `./accidents.js` أو `./content-detail.js` بحسب الشاشة
