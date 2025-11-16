# Aonz.AI Website

Modern, responsive website for Aonz.AI - Digital Transformation Leaders specializing in AI consulting and enterprise solutions.

## 🚀 Features

- Modern, visually appealing design with smooth animations
- Fully responsive (mobile, tablet, desktop)
- SEO optimized
- Accessible (WCAG AA compliant)
- Fast loading with optimized assets
- Cross-browser compatible

## 📁 Project Structure

```
Aonz.ai/
├── index.html          # Homepage
├── products.html       # Products page
├── services.html       # Services page
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## 🛠️ Setup & Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The site will be available at http://localhost:3000
```

### Build for Production

```bash
# Minify CSS and JavaScript
npm run build

# Output will be in the dist/ folder
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (minify CSS/JS)
- `npm run lint:css` - Lint CSS files
- `npm run lint:js` - Lint JavaScript files
- `npm run format` - Format code with Prettier
- `npm test` - Run all linting checks

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Modern JavaScript features
- **AOS (Animate On Scroll)** - Scroll animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter, Outfit, Space Grotesk)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Configuration

### Customization

- **Colors**: Edit CSS custom properties in `styles.css` (lines 2-52)
- **Fonts**: Update font imports in HTML head section
- **Animations**: Adjust AOS settings in HTML script tags

## 📊 Performance

Target metrics:
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🔒 Security

- Subresource Integrity (SRI) for external resources
- Content Security Policy (CSP) headers
- Input validation and sanitization

## 📈 SEO

- Meta tags and Open Graph tags
- Structured data (JSON-LD)
- Semantic HTML
- Sitemap and robots.txt

## ♿ Accessibility

- WCAG AA compliant
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please contact:
- Website: https://www.aonz.in
- Email: info@aonz.in
- Phone: +91-98468 60695, +91-98955 66001

## 🙏 Acknowledgments

- AOS (Animate On Scroll) library
- Font Awesome for icons
- Google Fonts for typography

---

**Note**: This is a static website. For production deployment, consider using:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static site hosting service

