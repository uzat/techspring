// ===== README.MD =====
# TechSpring Website

A modern, AI-focused corporate website built with Node.js, Express, and EJS templating.

## Features

- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Mode**: Theme toggle with localStorage persistence  
- **Blog System**: Full CRUD functionality for blog posts
- **Real-time Features**: IP-based time and weather display
- **Particle Animation**: Particles.js background on homepage
- **Rotating Banners**: AI-themed image rotation
- **SQLite Database**: Lightweight database for blog posts
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: EJS templating engine
- **Database**: SQLite3
- **Styling**: CSS with CSS custom properties (variables)
- **JavaScript**: Vanilla JS with Particles.js
- **Deployment**: Render.com ready

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd techspring
```

2. Install dependencies:
```bash
npm install
```

3. Create required directories:
```bash
mkdir -p public/images public/css public/js
mkdir -p views/blog views/partials
mkdir -p routes utils
```

4. Add banner images to `public/images/`:
   - ai-banner-1.jpg
   - ai-banner-2.jpg  
   - ai-banner-3.jpg
   - ai-banner-4.jpg
   - ai-banner-5.jpg

5. Set up environment variables (optional):
```bash
export OPENWEATHER_API_KEY=your_api_key_here
```

6. Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

## Project Structure

```
techspring/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── particles-config.js
│   └── images/
│       ├── ai-banner-1.jpg
│       ├── ai-banner-2.jpg
│       ├── ai-banner-3.jpg
│       ├── ai-banner-4.jpg
│       └── ai-banner-5.jpg
├── routes/
│   ├── index.js
│   └── blog.js
├── utils/
│   ├── getTime.js
│   └── getWeather.js
├── views/
│   ├── blog/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── acknowledgment.ejs
├── server.js
├── package.json
├── render.yaml
└── README.md
```

## Pages

- **Home** (`/`): Landing page with particles animation, rotating banners, time/weather
- **About** (`/about`): Company information and mission
- **Blog** (`/blog`): Blog listing and management
  - `/blog/new`: Create new post
  - `/blog/:id`: View individual post
  - `/blog/:id/edit`: Edit post
- **Contact** (`/contact`): Contact information (phone only: 0481 261 015)
- **Acknowledgment** (`/acknowledgment`): Acknowledgment of Country

## Features Detail

### Blog System
- Create, read, update, delete blog posts
- SQLite database storage
- Rich text content support
- Date tracking (created/updated)

### Theme Toggle
- Light/dark mode switching
- Persistent theme storage in localStorage
- Smooth transitions between themes

### Real-time Data
- IP-based location detection
- Local time display with timezone support
- Weather information (requires API key)
- Fallback to Melbourne, Australia

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly navigation
- Optimized for all screen sizes

## Deployment

### Render.com
The project includes a `render.yaml` file for easy deployment:

1. Connect your GitHub repository to Render
2. The service will automatically deploy using the configuration
3. Set environment variables in Render dashboard if needed

### Manual Deployment
1. Ensure all dependencies are installed
2. Set `NODE_ENV=production`
3. Run `npm start`
4. Ensure port is configured correctly (uses `process.env.PORT`)

## Customization

### Adding Banner Images
Replace the images in `public/images/` with your own AI-themed banners. Ensure they are:
- Named: `ai-banner-1.jpg` through `ai-banner-5.jpg`
- Optimized for web (recommended: 800x600px, <200KB each)
- High quality and relevant to AI/technology themes

### Styling
Modify `public/css/style.css` to customize:
- Color scheme (CSS custom properties in `:root`)
- Typography (currently using Inter font)
- Layout and spacing
- Animation timings

### Adding New Pages
1. Create new EJS template in `views/`
2. Add route in `routes/index.js`
3. Update navigation in `views/partials/header.ejs`

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Performance
- Minified particles.js from CDN
- Optimized images and CSS
- Efficient database queries
- Minimal JavaScript footprint

## Security
- Input validation on forms
- SQL injection protection via parameterized queries
- XSS protection through EJS escaping
- Environment variable configuration

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
Copyright 2025 TechSpring Pty Ltd. All rights reserved.

## Contact
**TechSpring Pty Ltd**  
Phone: 0481 261 015  
Location: Mornington Peninsula, Victoria, Australia

---

Built with ❤️ by the TechSpring team using modern web technologies.
                    <% }); %>
                </div>
            <% } else { %>
                <div class="empty-state">
                    <div class="empty-content">
                        <h3>No posts yet</h3>
                        <p>Be the first to share insights and innovations!</p>
                        <a href="/blog/new" class="btn btn-primary">Create First Post</a>
                    </div>
                </div>
            <% } %>
        </section>
    </div>
</main>

<%- include('../partials/footer') %>