# Ibadullah Online Academy: Website Handover

**Version:** 3.0 (20 November 2026)
**Live domain:** https://www.ibadullahacademy.com
**Owner:** Muhammadmustapha Yusuf (founder)

## 1. What the site is

A static marketing and enrolment website for an online academy teaching live one-to-one Qur'an, Tajweed, Hifz, Arabic, Islamic Studies, and UK curriculum Maths and English.

- **Audience:** Muslim parents in the UK, USA, Canada and Australia. Adult learners are a second audience.
- **Main goal of every page:** get the visitor to book a free trial class (`apply.html`). WhatsApp is the second path.
- **Feel:** warm, honest, safeguarding-first. Diaspora parents are wary of scams, so trust matters more than hype.

## 2. Locked rules: contact details

- **WhatsApp number:** +234 701 846 8609
- **Link format:** `https://wa.me/2347018468609?text=...` (pre-filled message, URL-encoded)
- **The number is never written out anywhere on the site.** Every mention is a "Chat on WhatsApp" button or link. Reason: a Nigerian number on show puts off diaspora parents.
- **No phone number in the top bar.** The top bar shows the tagline only.
- **Email:** info@ibadullahacademy.com. Shown in the footer, contact page and policies only. WhatsApp and the forms are the main channels.
- **Short link for bios and flyers:** ibadullahacademy.com/whatsapp opens WhatsApp (set in `netlify.toml`).

## 3. Locked rules: content and claims

Confirmed by the owner.

| Topic | Rule |
|---|---|
| Teacher checks | "Background and identity checked". Never "DBS". |
| Numbers | 50+ families, 10+ countries, 5.0 parent rating, founded 2023, 8+ average years teaching, 50/50 male and female teachers. |
| Reviews | The five reviews are real. Keep their wording exactly as written, including casual words. Ibrahim A. is labelled "Verified Student". |
| Reply time | "We reply within one hour, in sha Allah." Teacher matching: "usually within a day". |
| Recording | Classes are recorded only if a parent asks. Recordings go to that family only and are deleted within 30 days. |
| Young children | For under-12s, a parent or guardian should be at home and nearby during class. Parents may sit in on any lesson. |
| Safeguarding | Named by role only: "Safeguarding Lead". No personal name. |
| Prices | See section 5. |

## 4. Pages

All files sit at the root of the repository. There is no build step.

```
index.html                         Home
programs.html                      All 12 programs
program-quran-tajweed.html         Quran Recitation & Tajweed
program-advanced-tajweed.html      Advanced Tajweed (old address redirects here)
program-hifz.html                  Quran Memorisation (Hifz)
program-arabic.html                Arabic Language
program-islamic-studies.html       Islamic Studies (Foundations)
program-aqeedah.html               Aqeedah
program-fiqh.html                  Fiqh
program-seerah.html                Seerah
program-hadith.html                Hadith Studies
program-inheritance.html           Islamic Inheritance
program-maths.html                 Maths (UK National Curriculum)
program-english.html               English (UK National Curriculum)
online-quran-classes-uk.html       Country page: UK (prices in £)
online-quran-classes-usa.html      Country page: USA (prices in $)
online-quran-classes-canada.html   Country page: Canada (prices in CA$)
online-quran-classes-australia.html Country page: Australia (prices in A$)
teachers.html                      Teachers (designed cards, no photos yet)
pricing.html                       Pricing with currency switch
about.html                         Story, promises, safeguarding summary
faq.html                           FAQ
contact.html                       Contact + enquiry form
apply.html                         Free trial application (main conversion page)
safeguarding.html                  Safeguarding Policy
privacy.html                       Privacy Policy
404.html                           Page not found (uses root links like /assets/...)
assets/style.css                   All styling (v3 additions are at the bottom)
assets/main.js                     All scripts
assets/faviicon.jpg                Favicon (filename typo kept on purpose)
assets/og-image.jpg                Image shown when the site is shared
sitemap.xml, robots.txt            For search engines
netlify.toml                       Redirects and security headers
```

The header, menu, sticky phone bar, floating WhatsApp button and footer are repeated in every HTML page. To change any of them, find and replace across all pages.

## 5. Prices (per month)

| Plan | Classes | £ GBP | $ USD | CA$ CAD | A$ AUD |
|---|---|---|---|---|---|
| Starter | 4 a month, 30 min | 40 | 55 | 75 | 75 |
| Regular (most chosen) | 8 a month, 45 min | 60 | 80 | 115 | 115 |
| Intensive | 12 a month, 45 to 60 min | 100 | 130 | 190 | 190 |

Converted from pounds in November 2026 and rounded. Each price card holds all four prices as `data-gbp`, `data-usd`, `data-cad`, `data-aud` attributes. Update all four when prices change, on `pricing.html` and on the matching country page.

## 6. Forms

Both forms send to Formspree: `https://formspree.io/f/mgawjloq`

- **Apply form** (`apply.html`): subject line "New free trial application", `form_source` = Apply page.
- **Contact form** (`contact.html`): subject line "New enquiry from the contact page", `form_source` = Contact page.
- Both send in the background and then show a thank-you panel. A hidden `_gotcha` field catches spam bots.
- The apply form picks the subject automatically from links like `apply.html?program=hifz`, and fills in the visitor's time zone and country.


## 7. Scripts (assets/main.js)

Mobile menu, FAQ accordion, scroll animations, currency switch (picks the currency from the visitor's time zone and remembers their choice), live clocks (`data-tz`), apply form pre-fill, and the form sending.


- **v2 (August 2026):** 20-page site, deployed by Netlify drag and drop.
- **v2.1 (17 November 2026):** number change and top-bar removal. Never published.
- **v3 (20 November 2026):**
  - WhatsApp moved to +234 701 846 8609, never written out on any page.
  - All copy rewritten in a plain, human voice.
  - Ijazah removed everywhere; "Advanced Tajweed & Ijazah" renamed "Advanced Tajweed".
  - "DBS" replaced by "Background and identity checked"; 100+ changed to 50+ families.
  - Reply time set to "within one hour, in sha Allah" everywhere.
  - Contact form now saves to Formspree, with a thank-you screen and WhatsApp follow-up.
  - New pages: Safeguarding Policy, Privacy Policy, four country pages, 404.
  - Pricing in four currencies; live local clocks; "Where we teach" section on the home page.
  - Designed teacher cards in place of photos.
  - Sticky booking bar on phones; bigger footer with policy and country links.
  - Sitemap, robots.txt, structured data, share image, netlify.toml with redirects and security headers.

## 10. Still to do

1. **Teacher photos and videos.** Each teacher sends a shoulders-up photo against a plain wall, sent on WhatsApp as a document, plus written permission to show it. Videos (30 to 60 seconds) go on the academy YouTube channel, then link them from the teacher cards. Remove the "photos are on their way" note on `teachers.html` once done.
2. **More real reviews.** Ask current families using the message in section 11. Add a review only with the parent's permission, first name and initial, and city.
3. **WhatsApp Business profile** for the new number: academy name, logo, description, website, hours, greeting and away messages.
4. **Google Search Console:** add the domain and submit `sitemap.xml` after launch.
5. Later ideas: visitor stats that need no cookie banner, and a free download (for example an Arabic alphabet sheet) to collect parent emails.



