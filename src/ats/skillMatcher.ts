



const SKILL_ALIASES:
  Record<string, string> = {

  // ====================
  // Frontend
  // ====================

  js: "javascript",
  javascript: "javascript",
  ecmascript: "javascript",

  ts: "typescript",
  typescript: "typescript",

  reactjs: "react",
  "react.js": "react",
  react: "react",

  next: "next.js",
  nextjs: "next.js",
  "next.js": "next.js",

  vuejs: "vue",
  "vue.js": "vue",
  vue: "vue",

  angularjs: "angular",
  angular: "angular",

  tailwind:
    "tailwind css",

  tailwindcss:
    "tailwind css",

  "tailwind css":
    "tailwind css",

  mui:
    "material ui",

  "material-ui":
    "material ui",

  "material ui":
    "material ui",

  framer:
    "framer motion",

  // ====================
  // Backend
  // ====================

  node: "node.js",
  nodejs: "node.js",
  "node.js": "node.js",

  expressjs: "express",
  express: "express",

  nest: "nestjs",
  nestjs: "nestjs",

  fastapi: "fastapi",

  spring:
    "spring boot",

  django:
    "django",

  flask:
    "flask",

  // ====================
  // Databases
  // ====================

  mongo: "mongodb",
  mongodb: "mongodb",

  postgres:
    "postgresql",

  postgresql:
    "postgresql",

  mysql:
    "mysql",

  sqlserver:
    "sql server",

  mssql:
    "sql server",

  redis:
    "redis",

  firebase:
    "firebase",

  // ====================
  // APIs & Auth
  // ====================

  rest:
    "rest api",

  "restful api":
    "rest api",

  "rest api":
    "rest api",

  graphql:
    "graphql",

  websockets:
    "websockets",

  websocket:
    "websockets",

  auth:
    "authentication",

  oauth:
    "oauth",

  jwt:
    "jwt",

  jsonwebtoken:
    "jwt",

  // ====================
  // Cloud / DevOps
  // ====================

  aws:
    "amazon web services",

  "amazon web services":
    "amazon web services",

  gcp:
    "google cloud platform",

  "google cloud":
    "google cloud platform",

  azure:
    "microsoft azure",

  docker:
    "docker",

  k8s:
    "kubernetes",

  kubernetes:
    "kubernetes",

  cicd:
    "ci/cd",

  "ci/cd":
    "ci/cd",

  vercel:
    "vercel",

  netlify:
    "netlify",

  // ====================
  // Programming Languages
  // ====================

  py:
    "python",

  python:
    "python",

  cpp:
    "c++",

  "c++":
    "c++",

  csharp:
    "c#",

  "c#":
    "c#",

  golang:
    "go",

  go:
    "go",

  java:
    "java",

  rust:
    "rust",

  // ====================
  // Testing
  // ====================

  jest:
    "jest",

  cypress:
    "cypress",

  mocha:
    "mocha",

  // ====================
  // Tools
  // ====================

  git:
    "git",

  github:
    "github",

  webpack:
    "webpack",

  vite:
    "vite",

  axios:
    "axios",

  // ====================
  // Mobile
  // ====================

  rn:
    "react native",

  "react-native":
    "react native",

  flutter:
    "flutter",

  // ====================
  // AI / ML
  // ====================

  ai:
    "artificial intelligence",

  ml:
    "machine learning",

  llm:
    "large language models",

  openai:
    "openai",
};



const normalizeSkill = (skill : string) => {
  const cleanedSkill = 
    skill.toLowerCase().trim();

    return (
      SKILL_ALIASES[
        cleanedSkill 
      ] || cleanedSkill
    );
};

export const compareSkill = 
  (
    resumeSkills : string[],
    jobSkills: string[],

  ) => {
    const normalizedResume = resumeSkills.map(normalizeSkill);
    const normalizedJob = jobSkills.map(normalizeSkill);

    const matching = jobSkills.filter((_,index) => {
      return normalizedResume.includes(normalizedJob[index])
    });

    const missing = jobSkills.filter((_, index) => !normalizedResume.includes(normalizedJob[index]));

    const score = 
      Math.round((matching.length / Math.max(jobSkills.length,1)) * 100)

      return {matching, missing, score}
  }