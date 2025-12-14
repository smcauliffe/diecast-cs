# Diecast Collection Project

## Project Overview
A comparison of two headless CMS approaches for a vintage diecast car blog:
1. **Contentstack + Next.js + Vercel** (building first)
2. **Adobe Document Authoring + Edge Delivery Services** (building second)

Goal: Compare Lighthouse scores and developer experience between the two approaches.

## Key Constraints
- **Vanilla CSS only** - No Tailwind or CSS frameworks (fair Lighthouse comparison with Adobe EDS)
- **Minimal scope** - Basic blog functionality only

---

## Contentstack Notes

### Content Type JSON Import Format
When importing content types via the Contentstack UI (Content Models → Import), the JSON must be **unwrapped** - no outer `content_type` key.

**Correct format:**
```json
{
  "title": "Car",
  "uid": "car",
  "schema": [...],
  "options": {...}
}
```

**Incorrect format (will error with "schema is not iterable"):**
```json
{
  "content_type": {
    "title": "Car",
    "uid": "car",
    "schema": [...],
    "options": {...}
  }
}
```

### Select Field (Dropdown) Schema
Select fields require `display_type` property:
```json
{
  "display_name": "Brand",
  "uid": "brand",
  "data_type": "text",
  "display_type": "dropdown",
  "enum": {
    "advanced": false,
    "choices": [
      { "value": "Option 1" },
      { "value": "Option 2" }
    ]
  }
}
```

### Explorer Account Limitations
- Free Explorer accounts may have CLI login issues
- UI-based import/export works as fallback
- Full API access is available

### Region Configuration
This project uses **EU region** (eu-app.contentstack.com). The SDK must be configured with:
```typescript
import Contentstack, { Region } from '@contentstack/delivery-sdk';

const stack = Contentstack.stack({
  apiKey: process.env.CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
  region: Region.EU,  // Required for EU region
});
```

### Publishing Required
Entries must be **published** before they appear via the Delivery API. Unpublished entries won't show up.

### Content Type: Car
Fields:
- `title` (text, required) - Car name
- `slug` (text, required, unique) - URL identifier
- `main_image` (file, required) - Photo
- `description` (rich text, required) - Details
- `year` (number, optional) - Year manufactured
- `brand` (select, required) - Hot Wheels / Matchbox / Other

---

## Project Structure

```
diecast/
├── CLAUDE.md                          # This file
├── contentstack-seed/
│   └── content_types/
│       └── car.json                   # Content type definition
└── diecast-blog/                      # Next.js app (to be created)
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── cars/[slug]/page.tsx
    └── lib/
        └── contentstack.ts
```

---

## Environment Variables (for Next.js app)
```
CONTENTSTACK_API_KEY=
CONTENTSTACK_DELIVERY_TOKEN=
CONTENTSTACK_ENVIRONMENT=
```
