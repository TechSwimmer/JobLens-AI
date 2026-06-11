



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




const SKILL_WEIGHTS:
  Record<string, number> = {

  // Core frontend
  react: 5,
  "next.js": 5,
  typescript: 5,
  javascript: 5,

  // Backend
  "node.js": 5,
  mongodb: 5,
  postgresql: 5,
  mysql: 5,
  docker: 5,
  kubernetes: 5,
  "amazon web services": 5,

  // Medium importance
  express: 3,
  nestjs: 3,
  redux: 3,
  graphql: 3,
  jwt: 3,
  "tailwind css": 3,
  redis: 3,
  firebase: 3,

  // Lower importance
  html: 1,
  css: 1,
  git: 1,
  github: 1,
  vite: 1,
  webpack: 1,
};

const getSkillWeight =
  (skill: string) =>
    SKILL_WEIGHTS[
    skill
    ] || 2;





const normalizeSkill = (skill: string) => {
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
    resumeSkills: string[],
    jobSkills: string[],

  ) => {
    const normalizedResume = resumeSkills.map(normalizeSkill);
    const normalizedJob = jobSkills.map(normalizeSkill);

    const matching = jobSkills.filter((_, index) => {
      return normalizedResume.includes(normalizedJob[index])
    });

    const missing = jobSkills.filter((_, index) => !normalizedResume.includes(normalizedJob[index]));

    const totalWeight =
      normalizedJob.reduce(
        (
          total,
          skill
        ) =>
          total +
          getSkillWeight(
            skill
          ),
        0
      );

    const matchedWeight =
      matching.reduce(
        (
          total,
          skill
        ) =>
          total +
          getSkillWeight(
            normalizeSkill(
              skill
            )
          ),
        0
      );

    const score =
      Math.round(
        (
          matchedWeight /
          Math.max(
            totalWeight,
            1
          )
        ) * 100
      );


    console.log(
      "Resume Skills:",
      resumeSkills
    );

    console.log(
      "Job Skills:",
      jobSkills
    );

    console.log(
      "Normalized Resume:",
      resumeSkills.map(
        normalizeSkill
      )
    );

    console.log(
      "Normalized Job:",
      jobSkills.map(
        normalizeSkill
      )
    );

    return { matching, missing, score }
  }