# Viral AI Content Creator Bundle - Landing Page

A modern, responsive landing page built with Vite and SCSS. Lightning-fast development with instant hot module replacement.

## Features

- **Vite** - Ultra-fast build tool with instant HMR
- **SCSS** - Organized styles with variables, mixins, and nested syntax
- **Responsive Design** - Mobile-first approach with responsive breakpoints
- **Form Handling** - Built-in form validation and submission
- **Modern JavaScript** - ES6+ modules
- **Production Ready** - Optimized build output

## Project Structure

```
/
├── index.html              # Main HTML file
├── src/
│   ├── styles/
│   │   ├── main.scss       # Main stylesheet
│   │   ├── _variables.scss # Design tokens (colors, fonts, spacing)
│   │   ├── _mixins.scss    # Reusable SCSS mixins
│   │   └── _form.scss      # Form-specific styles
│   └── js/
│       └── main.js         # JavaScript entry point
├── package.json
├── vite.config.js          # Vite configuration
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The site will open automatically at `http://localhost:3000`

### Development

- **Hot Reload**: Changes to HTML, SCSS, and JS files will instantly reflect in the browser
- **SCSS Compilation**: SCSS files are automatically compiled to CSS
- **Fast Refresh**: Near-instant updates without full page reload

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## Customization

### Design Tokens

Update design values in [src/styles/_variables.scss](src/styles/_variables.scss):

- **Colors**: Primary, secondary, text, background colors
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Breakpoints**: Responsive design breakpoints

### Styling

The project uses a modular SCSS architecture:

- `_variables.scss` - Design tokens
- `_mixins.scss` - Reusable mixins (responsive breakpoints, flex utilities)
- `_form.scss` - Form component styles
- `main.scss` - Main styles and layout

### Form Integration

The form in [src/js/main.js](src/js/main.js) currently uses a simulated API call. To integrate with your backend:

1. Replace `simulateAPICall()` with your actual API endpoint
2. Update the fetch URL and headers as needed
3. Handle success/error responses appropriately

Example:
```javascript
async function submitToAPI(data) {
  const response = await fetch('https://your-api.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}
```

## Deployment to GitHub Pages

### Option 1: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains your production files

3. Deploy to GitHub Pages:
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create gh-pages branch
git checkout -b gh-pages

# Copy dist contents to root
cp -r dist/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### Option 2: Automated Deployment

Add this to `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: dist
```

Then enable GitHub Pages in your repository settings to serve from the `gh-pages` branch.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Development**: Instant hot module replacement
- **Build Time**: < 1 second for production builds
- **Bundle Size**: Optimized and minified output

## License

ISC

## Support

For issues or questions, please check the Vite documentation at https://vitejs.dev
