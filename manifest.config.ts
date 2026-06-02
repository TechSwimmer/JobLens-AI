import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "JobLens AI",

  version: "1.0.0",

  description:
    "AI-powered ATS extension",

  action: {
    default_popup: "index.html",
  },

  permissions: [
    "storage",
    "activeTab",
    "scripting",
  ],

  host_permissions: [
    "https://www.linkedin.com/*",
  ],

  content_scripts: [
    {
      matches: [
        "https://www.linkedin.com/jobs/*",
      ],

      js: [
        "src/content/linkedinScraper.tsx",
      ],
    },
  ],
});