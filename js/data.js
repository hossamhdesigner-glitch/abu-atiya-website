// بيانات الموقع — لتعديل المنتجات أو الأرقام عدّل هذا الملف فقط.

const COMPANY = {
  name: "محامص ومطاحن أبو عطية للصناعة والتسويق",
  whatsapp: "972598123369",
  phoneDisplay: "059-812-3369",
  email: "info@abuattiacompany.com",
  address: "جنين – شارع حيفا – مدخل السكة",
  facebook: "https://www.facebook.com/profile.php?id=100063068568901",
  mapQuery: "Haifa Street, Jenin, Palestine",
};

const CATEGORIES = [
  { id: "roasted", name: "محامص ومكسرات", icon: "🥜" },
  { id: "kitchen", name: "مكسرات للحلويات", icon: "🌰" },
  { id: "legumes", name: "بقوليات وحبوب", icon: "🫘" },
  { id: "coffee", name: "قهوة وبن", icon: "☕" },
  { id: "zaatar", name: "زعتر بلدي", icon: "🌿" },
];

const WHOLESALE_NOTE = "يتوفر بأوزان من 2 إلى 5 كيلو لجميع الأصناف";

const PRODUCTS = [
  // محامص
  { id: "mix-super-extra", cat: "roasted", name: "مخلوطة سوبر اكسترا", sizes: ["200 غ", "400 غ", "2–5 كغ"], tags: ["الأكثر طلباً"] },
  { id: "mix-super-extra-smoked", cat: "roasted", name: "مخلوطة سوبر اكسترا مدخّنة", sizes: ["200 غ", "400 غ", "2–5 كغ"], tags: ["مدخّن"] },
  { id: "mix-extra", cat: "roasted", name: "مخلوطة اكسترا", sizes: ["200 غ", "350 غ", "2–5 كغ"] },
  { id: "mix", cat: "roasted", name: "مخلوطة", sizes: ["400 غ", "2–5 كغ"] },
  { id: "pistachio-halabi", cat: "roasted", name: "فستق حلبي", sizes: ["200 غ", "2–5 كغ"] },
  { id: "cashew", cat: "roasted", name: "كاشو", sizes: ["200 غ", "2–5 كغ"] },
  { id: "almond-roasted", cat: "roasted", name: "لوز محمّص", sizes: ["200 غ", "2–5 كغ"] },
  { id: "peanuts-shell", cat: "roasted", name: "فستق بالقشر", sizes: ["200 غ", "2–5 كغ"] },
  { id: "watermelon-seeds", cat: "roasted", name: "بزر بطيخ", sizes: ["200 غ", "2–5 كغ"] },
  { id: "watermelon-seeds-smoked", cat: "roasted", name: "بزر بطيخ مدخّن", sizes: ["200 غ", "2–5 كغ"], tags: ["مدخّن"] },
  { id: "sunflower-seeds", cat: "roasted", name: "بزر شمس صيني", sizes: ["40 غ", "200 غ", "2–5 كغ"] },
  { id: "pumpkin-seeds", cat: "roasted", name: "بزر قرع", sizes: ["200 غ", "2–5 كغ"] },
  { id: "qudameh", cat: "roasted", name: "قضامة تركية", sizes: ["200 غ", "2–5 كغ"] },
  { id: "qudameh-smoked", cat: "roasted", name: "قضامة مدخّنة", sizes: ["200 غ", "2–5 كغ"], tags: ["مدخّن"] },

  // مكسرات للحلويات والمطابخ
  { id: "almond", cat: "kitchen", name: "لوز", sizes: ["بالكيلو", "كرتونة"], photo: true },
  { id: "almond-slivered", cat: "kitchen", name: "لوز مبشور", sizes: ["بالكيلو", "كرتونة"], photo: true },
  { id: "almond-halves", cat: "kitchen", name: "لوز نُصفين", sizes: ["بالكيلو", "كرتونة"], photo: true },
  { id: "pistachio-slivered", cat: "kitchen", name: "فستق مشرّح", sizes: ["بالكيلو", "كرتونة"], photo: true },
  { id: "walnut", cat: "kitchen", name: "جوز أمريكي", sizes: ["بالكيلو", "كرتونة"], photo: true },
  { id: "nigella", cat: "kitchen", name: "قزحة بلدية (حبة البركة)", sizes: ["1 كغ"], photo: true },

  // بقوليات
  { id: "fava", cat: "legumes", name: "فول بوليفي إكسترا", sizes: ["1 كغ", "شوال"] },
  { id: "chickpeas", cat: "legumes", name: "حمص", sizes: ["1 كغ", "شوال"] },
  { id: "lentils", cat: "legumes", name: "عدس", sizes: ["1 كغ", "شوال"] },
  { id: "red-lentils", cat: "legumes", name: "عدس مجروش تركي", sizes: ["1 كغ", "شوال"] },
  { id: "white-beans", cat: "legumes", name: "فاصوليا", sizes: ["1 كغ", "شوال"] },
  { id: "lupini", cat: "legumes", name: "ترمس", sizes: ["1 كغ", "شوال"] },
  { id: "popcorn", cat: "legumes", name: "ذرة فشار", sizes: ["1 كغ", "شوال"] },
  { id: "burghul", cat: "legumes", name: "برغل", sizes: ["ناعم", "وسط", "خشن"] },
  { id: "freekeh", cat: "legumes", name: "فريكة بلدية", sizes: ["علبة"] },

  // قهوة
  { id: "coffee-fairouz", cat: "coffee", name: "قهوة فيروز", note: "عربية مع هيل – الفئة المتوسطة", sizes: ["½ كغ", "1 كغ"], tags: ["مع هيل"] },
  { id: "coffee-abuatiya", cat: "coffee", name: "بن أبو عطية مع هيل", sizes: ["علبة"], tags: ["مع هيل"] },
  {
    id: "coffee-colombia", cat: "coffee", name: "بن بالجملة – 5 كغ",
    note: "أصناف البن المتوفرة",
    sizes: ["كولومبيا سوبريمو 18", "كولومبيا إكسيلسو", "كوستاريكا", "تنزانيا", "جيما", "روبوستا فيتنامي", "روبوستا هندي", "برازيلي"],
  },

  // زعتر
  { id: "zaatar-jar", cat: "zaatar", name: "زعتر أبو عطية البلدي", sizes: ["علبة"] },
  { id: "zaatar-bag", cat: "zaatar", name: "زعتر بلدي فلسطيني", sizes: ["5 كغ"] },
  { id: "zaatar-sack", cat: "zaatar", name: "زعتر بلدي – شوال", sizes: ["20 كغ"], tags: ["للمخابز والمحلات"] },
];

const SPICES = [
  "توابل أرز قدرة", "توابل أرز برياني", "توابل أرز بخاري", "توابل أرز مبهّر", "توابل أرز كبسة",
  "توابل أرز محاشي", "توابل أرز بالنكهة الشامية", "توابل أرز بالنكهة الخليجية", "توابل أرز بالنكهة المكسيكية",
  "توابل أوزي", "توابل بيتزا", "توابل دجاج", "توابل تايلندي", "توابل شيش طاووق", "توابل شاورما",
  "توابل سمك", "توابل زبادي ولحوم بحرية", "توابل لحمة", "توابل كبة شامية", "توابل كباب ومشاوي",
  "فاهيتا", "خلطة دجاج بالكاري", "خلطة دجاج حار", "خلطة برجر", "خلطة دجاج بنكهة الباربكيو",
  "خلطة المندي المدخّن", "مندي", "توابل مشهيات طعام", "سبع بهارات", "بهار مشكّل", "بهار اللبن (منسف)",
  "توابل المعمول والكعك", "بابريكا حلو / حار", "كاري حلو / حار", "فلفل أسود", "كركم", "زنجبيل",
  "جوزة الطيب", "زهرة القرنفل", "هال حب", "هال مطحون", "ثوم شرائح", "ثوم مطحون", "ورق غار",
  "ملح ليمون", "كربونة", "ماجي",
];

const MACHINES = [
  {
    id: "grinder", name: "ماكنة طحن البن الأوروبية", model: "AAM-003 (11 سم)", own: true,
    specs: [["القدرة الإنتاجية", "15–20 كغ / ساعة"], ["الوزن", "50 كغ"], ["الأبعاد", "30 × 30 × 70 سم"], ["الكهرباء", "370V / 50Hz / 1.5kW"]],
  },
  {
    id: "tahini", name: "ماكنة الطحينية", model: "AAM-003 (10 سم)", own: true,
    specs: [["القدرة الإنتاجية", "15–20 كغ / ساعة"], ["الوزن", "36.5 كغ"], ["الأبعاد", "52.5 × 25 × 65 سم"], ["الكهرباء", "370V / 50Hz / 1.5kW / 7A"]],
  },
  {
    id: "roaster", name: "محمّص بن", model: "على الطلب",
    specs: [["السعة", "من 5 كغ حتى 240 كغ"], ["التوريد", "حسب الطلب"]],
  },
  {
    id: "kuban", name: "مطحنة بن كوبان", model: "Kuban",
    specs: [["الاستخدام", "محلات البن والمحامص"]],
  },
  {
    id: "oilpress", name: "ماكينة عصر الزيت على البارد", model: "NF-100", wide: true,
    specs: [["الاستخدام", "عصر الزيوت على البارد"], ["الشهادات", "CE – ISO"]],
  },
];
