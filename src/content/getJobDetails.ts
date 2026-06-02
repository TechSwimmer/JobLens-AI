import type { JobDetails }
  from "../types/job";

export const getJobDetails =
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

        if (
          text &&
          text.length > 2
        ) {
          return text;
        }
      }

      return "";
    };

    return {
      title: getText([
        ".job-details-jobs-unified-top-card__job-title",
        "h1"
      ]),

      company: getText([
        ".job-details-jobs-unified-top-card__company-name",
        ".jobs-unified-top-card__company-name",
        "a[href*='/company/']"
      ]),

      location: getText([
        ".job-details-jobs-unified-top-card__bullet",
        ".jobs-unified-top-card__bullet"
      ]),

      description: getText([
        ".jobs-description-content__text",
        ".jobs-box__html-content",
        "#job-details",
        ".jobs-description",
        ".job-view-layout.jobs-details",
        "[class*='description']"
      ]),
    };
  };