import ReactDOM from "react-dom/client";
import FloatingPanel from "./FloatingPanel";

    

console.log(
  "JobLens LinkedIn scraper loaded"
);  



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


  ReactDOM.createRoot(
    container
  ).render(
    <FloatingPanel
      
    />
  );
}