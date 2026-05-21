import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ── PRODUCTS ──────────────────────────────────────────────
      {
        name: "product",
        label: "Products & Inventory",
        path: "content/products",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.name?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || "product",
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Product Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "era",
            label: "Era  (e.g.  XVIII Century)",
          },
          {
            type: "string",
            name: "country",
            label: "Country of Origin  (e.g.  France)",
          },
          {
            type: "string",
            name: "price",
            label: "Price  (e.g.  4 200 000 ₸  or  Price upon request)",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Furniture",
              "Porcelain",
              "Silverware",
              "Paintings",
              "Clocks",
              "Jewellery",
              "Other",
            ],
          },
          {
            type: "image",
            name: "image",
            label: "Product Photo",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "boolean",
            name: "featured",
            label: "⭐ Show on Homepage (Featured)",
          },
          {
            type: "boolean",
            name: "sold",
            label: "Mark as Sold",
          },
        ],
      },

      // ── HOMEPAGE CONTENT ───────────────────────────────────────
      {
        name: "homepage",
        label: "Homepage Text & Settings",
        path: "content",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "homepage" },
        fields: [
          // Hero
          {
            type: "string",
            name: "heroTitle",
            label: "Hero — Main Title  (e.g.  Rare &)",
          },
          {
            type: "string",
            name: "heroTitleItalic",
            label: "Hero — Gold Italic Word  (e.g.  Beautiful)",
          },
          {
            type: "string",
            name: "heroTitleEnd",
            label: "Hero — Title End  (e.g.  Antiques)",
          },
          {
            type: "string",
            name: "heroDescription",
            label: "Hero — Description paragraph",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "foundedYear",
            label: "Founded Year  (shown in hero eyebrow)",
          },
          {
            type: "string",
            name: "location",
            label: "City & Country  (shown in hero eyebrow)",
          },
          // About
          {
            type: "string",
            name: "aboutTitle",
            label: "About — Title",
          },
          {
            type: "string",
            name: "aboutTitleItalic",
            label: "About — Gold Italic Part",
          },
          {
            type: "string",
            name: "aboutBody",
            label: "About — Body Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "yearsExperience",
            label: "Stat — Years of Experience",
          },
          {
            type: "string",
            name: "piecesCurated",
            label: "Stat — Pieces Curated",
          },
          {
            type: "string",
            name: "countriesSourced",
            label: "Stat — Countries Sourced",
          },
          // Testimonial
          {
            type: "string",
            name: "testimonialText",
            label: "Testimonial — Quote",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "testimonialAuthor",
            label: "Testimonial — Author",
          },
          // Contact
          {
            type: "string",
            name: "address",
            label: "Salon Address",
          },
          {
            type: "string",
            name: "city",
            label: "City",
          },
          {
            type: "string",
            name: "hours",
            label: "Opening Hours  (e.g.  Tue – Sat · 11–19h)",
          },
          {
            type: "string",
            name: "email",
            label: "Email Address",
          },
          {
            type: "string",
            name: "phone",
            label: "Phone Number",
          },
        ],
      },
    ],
  },
});
