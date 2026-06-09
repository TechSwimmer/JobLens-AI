import type { JobDetails }
  from "../types/job";


export const getJobDetails =
  (): JobDetails => {

    const getText = (
      selectors: string[]
    ) => {

      for (
        const selector
        of selectors
      ) {

        const element =
          document.querySelector(
            selector
          );

        const text =
          element
            ?.textContent
            ?.trim();

        if (
          text &&
          text.length > 2
        ) {
          return text;
        }
      }

      return "";
    };

    const title =
      getText([
        ".job-details-jobs-unified-top-card__job-title",
        ".t-24.job-details-jobs-unified-top-card__job-title",
        "h1"
      ]);

    const company =
      getText([
        ".job-details-jobs-unified-top-card__company-name",
        ".job-details-jobs-unified-top-card__company-name a",
        ".jobs-unified-top-card__company-name",
        ".job-details-jobs-unified-top-card__primary-description a",
        "a[href*='/company/']"
      ]);

    const location =
      getText([
        ".job-details-jobs-unified-top-card__bullet",
        ".jobs-unified-top-card__bullet",
        ".job-details-jobs-unified-top-card__primary-description-container span"
      ]);

    const description =
      getText([
        ".jobs-description-content__text",
        ".jobs-box__html-content",
        "#job-details",
        ".jobs-description",
        ".job-view-layout.jobs-details",
        "[class*='description']"
      ]);

    return {
      title:
        title ||
        "Unknown Role",

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