import ReactDOM from "react-dom/client";
import FloatingPanel from "./FloatingPanel";

import type { JobDetails }
  from "../types/job";

console.log(
  "JobLens LinkedIn scraper loaded"
);

const getJobDetails =
  (): JobDetails => {
    const getText = (
      selectors: string[]
    ) => {
      for (const selector of selectors) {
        const element =
          document.querySelector(
            selector
          );

        const text =
          element?.textContent?.trim();

        if (text) {
          return text;
        }
      }

      return "";
    };

    const title = getText([
      ".job-details-jobs-unified-top-card__job-title",
      ".t-24.job-details-jobs-unified-top-card__job-title",
      "h1"
    ]);

    const company = getText([
      ".job-details-jobs-unified-top-card__company-name",
      ".job-details-jobs-unified-top-card__company-name a",
      ".jobs-unified-top-card__company-name",
      ".job-details-jobs-unified-top-card__primary-description a"
    ]);

    const location = getText([
      ".job-details-jobs-unified-top-card__bullet",
      ".jobs-unified-top-card__bullet",
      ".job-details-jobs-unified-top-card__primary-description-container span"
    ]);

    const description = getText([
      ".jobs-description-content__text",
      ".jobs-box__html-content",
      "#job-details"
    ]);

    return {
      title:
        title || "Unknown Role",

      company:
        company ||
        "Unknown Company",

      location:
        location ||
        "Unknown Location",

      description:
        description ||
        "No description found",
    };
  };

const existingPanel =
  document.getElementById(
    "joblens-root"
  );

if (!existingPanel) {
  const container =
    document.createElement("div");

  container.id =
    "joblens-root";

  document.body.appendChild(
    container
  );

  const jobData =
    getJobDetails();

  console.log(
    "Detected Job:",
    jobData
  );

  ReactDOM.createRoot(
    container
  ).render(
    <FloatingPanel
      
    />
  );
}