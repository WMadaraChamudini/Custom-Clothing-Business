# Fashion By Nilu - Business Portfolio Website

A modern, professional business portfolio website for "Fashion By Nilu," a premium custom tailoring startup by master tailor Nilu.

## 🌟 Features

### Pages
- **Home (index.html)** - Landing page with hero section, featured services, testimonials, and CTA
- **Portfolio (portfolio.html)** - Showcase of tailoring work with filterable gallery
- **Services (services.html)** - Detailed service offerings with pricing and process
- **About (about.html)** - Business story, values, and client testimonials
- **Contact (contact.html)** - Contact form, business info, FAQs, and booking options

### Key Features
✨ **Modern Design**
- Elegant gradient color scheme (Purple & Pink theme)
- Responsive design for all devices
- Smooth animations and transitions
- Professional typography

🎨 **Interactive Elements**
- Mobile-responsive hamburger menu
- Filterable portfolio gallery
- Contact form with validation
- **WhatsApp direct chat integration** (floating button)
- Smooth scroll animations
- Counter animations for statistics

📱 **Mobile Optimized**
- Fully responsive layout
- Touch-friendly navigation
- Mobile-first approach

🚀 **Performance**
- Lightweight and fast
- Font Awesome icons
- No external dependencies

## 📂 Project Structure

```
Custom-Clothing-Business/
├── index.html          # Homepage
├── portfolio.html      # Portfolio gallery
├── services.html       # Services & pricing
├── about.html          # About the business
├── contact.html        # Contact & booking
├── style.css           # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## 🎨 Color Scheme

- **Primary Color**: #8B4789 (Deep Purple)
- **Secondary Color**: #D4A5A5 (Mauve)
- **Accent Color**: #E8C4C4 (Light Pink)
- **Dark Color**: #2D2D2D (Charcoal)
- **Light Color**: #F5F5F5 (Off White)

## 📖 Sections Included

### Home Page
- Hero section with call-to-action buttons
- Featured services grid (4 services)
- Statistics section
- Client testimonials (3 reviews)
- Call-to-action section

### Portfolio Page
- Filterable portfolio gallery (8 items)
- Categories: All, Lehenga, Saree, Wedding, Western Wear
- Portfolio cards with hover effects
- Quick action CTA

### Services Page
- 6 detailed service offerings
- Service features list
- Step-by-step process (5 steps)
- Pricing tiers
- Service packages

### About Page
- Business story (Nilu's journey)
- 4 core values
- Meet Nilu (founder profile)
- Why choose us (6 reasons)
- Customer testimonials

### Contact Page
- Contact form with validation
- Contact information
- Business hours
- Social media links
- Booking options (3 types)
- FAQ section (6 questions)
- Embedded Google Map

## 🚀 Getting Started

### Installation
1. Extract all files to your website directory
2. No installation or build process required
3. All files are ready to use

### Local Testing
1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

### Customization

#### Update Business Information
Edit these files to customize content:
- **Navbar Logo**: Update in HTML files (line with class `logo`)
- **Contact Details**: Edit `contact.html` contact info section
- **Business Hours**: Update in footer and contact sections
- **Colors**: Change CSS variables in `style.css` (`:root` section)
- **Business Name**: Find and replace "Fashion By Nilu" throughout files

#### Add Real Images
Replace placeholder images:
1. Find `.placeholder-img` elements in HTML
2. Replace with real image URLs or local image paths
3. Update background images in CSS if needed

#### Connect Contact Form
To make the contact form functional:
1. Replace the form submission in `script.js`
2. Use Formspree, Netlify Forms, or your backend API
3. Update the `contactForm.addEventListener` handler

#### Add Google Map
Update the iframe in `contact.html`:
```html
<iframe src="YOUR_GOOGLE_MAPS_EMBED_URL">
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **JavaScript (Vanilla)** - No frameworks required
- **Font Awesome 6** - Icon library
- **Google Fonts** (Segoe UI) - Typography

## 📩 Sending form submissions via WhatsApp (server option)

If you want the site to send WhatsApp messages without opening the WhatsApp app/web for the user, you can run a small server that uses the WhatsApp Cloud API (Meta). This requires a WhatsApp Business account and a registered app.

Quick steps:

1. Create a new Node.js server (example `server.js` provided in this repo).
2. Copy `.env.example` to `.env` and set `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_ID`.
3. Install dependencies and run the server:

```bash
npm init -y
npm install express node-fetch dotenv
node server.js
```

4. The client will POST to `/api/send-whatsapp` with `{ phone, message }` and the server will forward the message via the WhatsApp Cloud API.

Notes & requirements:
- You need a registered Meta app and WhatsApp Business Account. See Meta docs: https://developers.facebook.com/docs/whatsapp/cloud-api
- Messages to users who haven't opted in may require pre-approved templates. For testing with your own number, you can usually send free messages to numbers added in the WhatsApp sandbox or registered as testers.
- This server example is minimal and not production hardened (no auth, rate-limiting, or logging). Use it as a starting point.


## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Features to Implement

Consider adding these features in the future:
- [ ] Real image gallery with lightbox
- [ ] Blog section
- [ ] Client reviews/ratings system
- [ ] Email notifications for contact form
- [ ] Online booking/appointment system
- [ ] Payment integration
- [ ] Email newsletter signup
- [ ] Video testimonials
- [ ] Before/after gallery
- [ ] Team member profiles with social links

## 📞 Contact Customization

Update these contact details in the files:
- Phone: +91 98765 43210
- Email: info@fashionbynilu.com
- Address: 123 Fashion Street, Your City, State 12345
- Social Media Links: Facebook, Instagram, Pinterest, Twitter

## 💡 SEO Best Practices

The website includes:
- Proper meta tags and descriptions
- Semantic HTML structure
- Mobile-friendly design
- Fast loading times
- Proper heading hierarchy

For better SEO:
1. Add unique content to each page
2. Submit sitemap to search engines
3. Optimize images for web
4. Add schema markup
5. Ensure fast page load times

## 📄 License

This portfolio template is provided for "Fashion By Nilu" business use.

## 🤝 Support & Customization

For questions or custom modifications, contact your web developer.

---

**Created for Fashion By Nilu** ✨
*Premium Custom Tailoring & Bespoke Clothing Services*
