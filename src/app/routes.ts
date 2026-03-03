import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { ResultsPage } from "./components/ResultsPage";
import { HowItWorksPage } from "./components/HowItWorksPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "results", Component: ResultsPage },
      { path: "how-it-works", Component: HowItWorksPage },
      { path: "*", Component: HomePage },
    ],
  },
]);
