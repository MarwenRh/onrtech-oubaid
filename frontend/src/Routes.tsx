import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./Index";
import Home from "./pages/guest/home/Home";
import Jobs from "./pages/guest/jobOpenings/Jobs";
import TeckInsights from "./pages/guest/techInsights/TeckInsights";
import About from "./pages/guest/getInTouch/About";
import Services from "./pages/guest/ourServices/Services";
import Login from "./pages/auth/Login";

import Profile from "./pages/profile/Profile";

import UserList from "./pages/admin/UserList/UserList";
import JobHome from "./pages/admin/Jobs/JobHome";
import CreateJob from "./pages/admin/Jobs/CreateJob";
import ShowJob from "./pages/admin/Jobs/ShowJob";
import EditJob from "./pages/admin/Jobs/EditJob";
import ApplyForm from "./pages/guest/jobOpenings/ApplyForm";
import CreateArticle from "./pages/admin/article/CreateArticle";
import ArticleHome from "./pages/admin/article/ArticleHome";
import ShowArticle from "./pages/admin/article/ShowArticle";
import EditArticle from "./pages/admin/article/EditArticle";
import SingleArticleForGeust from "./pages/guest/techInsights/SingleArticleForGeust";
import UnpublishedArticle from "./pages/admin/article/UnpublishedArticle";
import WorkInProgress from "./pages/guest/home/WorkInProgress";
import UnpublishedJob from "./pages/admin/Jobs/UnpublishedJob";
import Subscribers from "./pages/admin/subscribers/Subscribers";
import EditorArticles from "./pages/webeditor/EditorArticles";
import EditorJobs from "./pages/webeditor/EditorJobs";
import FormList from "./pages/admin/from/FormList";
import Applications from "./pages/admin/applications/Applications";
import ProfilePage from "./pages/profile/Profile";
import Clients from "./pages/webeditor/CreateClient";
import TestimonialsEdit from "./pages/webeditor/Testimonials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/offers",
        element: <Jobs />,
      },
      {
        path: "/techInsight",
        element: <TeckInsights />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/careers",
        element: <Jobs />,
      },
      {
        path: "/workInProgress",
        element: <WorkInProgress />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/ManageJobs",
        element: <JobHome />,
      },
      {
        path: "/createJob",
        element: <CreateJob />,
      },
      {
        path: "/jobInfoAdmin/:id",
        element: <ShowJob />,
      },
      {
        path: "/EditJobAdmin/:id",
        element: <EditJob />,
      },
      {
        path: "/ManageArticles",
        element: <ArticleHome />,
      },
      {
        path: "/createArticle",
        element: <CreateArticle />,
      },
      {
        path: "/ArticleInfoAdmin/:id",
        element: <ShowArticle />,
      },
      {
        path: "/EditArticleAdmin/:id",
        element: <EditArticle />,
      },
      {
        path: "/offerApplication/:id",
        element: <ApplyForm />,
      },
      {
        path: "/singleArticleForGeust/:id",
        element: <SingleArticleForGeust />,
      },
      {
        path: "/UnpublishedArticle",
        element: <UnpublishedArticle />,
      },
      {
        path: "/UnpublishedJob",
        element: <UnpublishedJob />,
      },
      {
        path: "/subscribers",
        element: <Subscribers />,
      },
      {
        path: "/editorArticles",
        element: <EditorArticles />,
      },
      {
        path: "/editorJobs",
        element: <EditorJobs />,
      },
      {
        path: "/ourClients",
        element: <Clients />,
      },
      {
        path: "/ourTestimonials",
        element: <TestimonialsEdit />,
      },
      {
        path: "/forms",
        element: <FormList />,
      },
      {
        path: "/applications",
        element: <Applications />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
