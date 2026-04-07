# Honda E-Catalog Specification

## 1. Project Overview
- **Project Name**: Honda E-Catalog
- **Type**: E-commerce catalog website with CMS
- **Core Functionality**: Display Honda motorcycle products with admin CMS to manage content
- **Target Users**: Motorcycle buyers, Honda dealers

## 2. UI/UX Specification

### Layout Structure
- **Header**: Logo (Honda), navigation (Home, Products, About), admin link
- **Hero Section**: Featured motorcycle with tagline
- **Product Grid**: 3-column responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- **Footer**: Contact info, social links, copyright
- **Admin Panel**: Separate route `/admin` for content management

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette
- **Primary**: `#D32F2F` (Honda Red)
- **Secondary**: `#1A1A1A` (Dark Black)
- **Accent**: `#FFC107` (Gold/Yellow)
- **Background**: `#FAFAFA` (Off-white)
- **Card Background**: `#FFFFFF`
- **Text Primary**: `#212121`
- **Text Secondary**: `#757575`

#### Typography
- **Font Family**: "Poppins" (headings), "Inter" (body)
- **Headings**: 
  - H1: 48px, bold
  - H2: 36px, semibold
  - H3: 24px, semibold
- **Body**: 16px, regular
- **Small**: 14px, regular

#### Spacing System
- Base unit: 8px
- Section padding: 64px vertical, 24px horizontal
- Card padding: 24px
- Component gap: 16px

#### Visual Effects
- Card shadow: `0 4px 20px rgba(0,0,0,0.08)`
- Card hover: translateY(-8px), shadow increase
- Button hover: brightness increase, scale 1.02
- Page transitions: fade in 0.3s

### Components

#### Header
- Fixed position, white background, subtle shadow
- Logo on left, nav links center, admin button right
- Mobile: hamburger menu

#### Product Card
- Image (16:9 ratio, object-cover)
- Model name (bold)
- Category badge
- Price
- Specs summary (engine, power)
- "View Details" button
- Hover: lift effect with enhanced shadow

#### Hero Section
- Full-width background image with overlay
- Large heading with tagline
- CTA button

#### Admin Panel (/admin)
- Dashboard with statistics
- Product management (CRUD)
- Banner/hero content management
- Simple authentication (password protected)

## 3. Functionality Specification

### Public Pages
1. **Home** (`/`):
   - Hero with featured motorcycle
   - Featured products section (6 products)
   - Category filter
   - Why choose us section

2. **Products** (`/products`):
   - All products grid
   - Category filter (Sport, Scooter, Matic, Bebek)
   - Search functionality

3. **Product Detail** (`/products/[id]`):
   - Full product details
   - Image gallery
   - Specifications table
   - Similar products

### CMS Features (/admin)
1. **Product Management**:
   - Add new product
   - Edit existing product
   - Delete product
   - Fields: name, category, price, image, specs, description

2. **Content Management**:
   - Edit hero section content
   - Edit footer content

3. **Data Storage**:
   - JSON file-based storage (`data/products.json`)
   - No database needed

### Edge Cases
- Empty product list: Show "No products" message
- Image not found: Show placeholder
- Invalid product ID: Redirect to products page

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Header displays correctly on all breakpoints
- [ ] Product cards show proper image, name, price
- [ ] Hero section displays with proper overlay
- [ ] Footer shows contact information
- [ ] Admin panel is accessible via /admin route

### Functionality Checkpoints
- [ ] Products display from JSON data
- [ ] Category filter works correctly
- [ ] Search functionality works
- [ ] Product detail page shows all information
- [ ] Admin can add/edit/delete products
- [ ] Changes persist in JSON file

### Technical Requirements
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS for styling
- No database (JSON file storage)
- Vercel deployment ready