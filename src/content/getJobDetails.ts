
import type { JobDetails }
  from "../types/job";

export const getJobDetails =
  async (): Promise<JobDetails> => {


    const isJobDetailsPage =
      window.location.hostname.includes(
        "linkedin.com"
      ) &&
      /^\/jobs\/view\/\d+/.test(
        window.location.pathname
      )

    if (
      !isJobDetailsPage
    ) {
      console.log(
        "Not on LinkedIn job details page"
      );

      return {
        title: "",
        company: "",
        location: "",
        description: "",
      };
    };


    const waitForElement =
      async (
        selectors:
          string[],
        timeout = 5000
      ) => {

        const start =
          Date.now();

        while (
          Date.now() -
          start <
          timeout
        ) {

          for (
            const selector
            of selectors
          ) {

            const element =
              document.querySelector(
                selector
              );

            if (
              element
            ) {
              return element;
            }
          }

          await new Promise(
            (
              resolve
            ) =>
              setTimeout(
                resolve,
                300
              )
          );
        }

        return null;
      };

   

    // Wait for LinkedIn
    // job content

    await waitForElement([
      ".job-details-jobs-unified-top-card__job-title",
      ".jobs-search__job-details--container",
      "h1"
    ]);
// Wait for page content
await waitForElement([
  "h1",
  "section",
  "div"
]);

// Get all visible text
const texts =
  [...document.querySelectorAll(
    "h1, h2, h3, p, span, a"
  )]
    .map(el =>
      el.textContent?.trim()
    )
    .filter(Boolean) as string[];

// Find likely title
const titleIndex =
  texts.findIndex(
    text =>
      text.length > 3 &&
      (
        text.includes(
          "Developer"
        ) ||
        text.includes(
          "Engineer"
        ) ||
        text.includes(
          "Designer"
        ) ||
        text.includes(
          "Manager"
        )
      ) &&
      !text.includes(
        "Premium"
      ) &&
      !text.includes(
        "notifications"
      )
  );

const title =
  titleIndex !== -1
    ? texts[
        titleIndex
      ]
    : "";

const company =
  titleIndex > 0
    ? texts[
        titleIndex - 1
      ]
    : "";

const location =
  titleIndex !== -1
    ? texts[
        titleIndex + 1
      ]
        ?.split("·")[0]
        .trim()
    : "";

// Get description
const elements =
  [...document.querySelectorAll(
    "section, div"
  )] as HTMLElement[];


  const descriptionContainer = 
    elements
    .filter(el =>
      el.innerText?.includes(
        "About the job"
      )
    )
    .find(el =>
      el.innerText.length >
        1000 &&
      el.innerText.length <
        4000
    );

const description =
  descriptionContainer
    ?.innerText
    .replace(
      "About the job",
      ""
    )
    .trim() || "";

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

