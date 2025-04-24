import React, { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import PersistentLayout from "./components/Layout/PersistentLayout";
import { Toaster } from 'sonner';
// Lazy load pages
const HomePage = lazy(() => import("./pages/home/Home"));
import { Profile } from "./pages/Profile/Profile";
import { Signup } from "./pages/auth/signup/Signup"
import { LoginPage } from "./pages/auth/login/LoginPage"
import Search from "./pages/Search/Search";
import { ForgotPasswordPage } from "./pages/auth/forget-password/ForgotPassword";
import { Wallet } from "./pages/walllet/Wallet";
import { NotificationPage } from "./pages/notification/Notification";
import { Setting } from "./pages/settings/SettingsPage";
import { QuestPage } from "./pages/quest/QuestPage";
import QuestDetail from "./pages/quest/_components/questCard/QuestDetail";
import { CreateStory } from "./pages/Create/CreateStory";
import { AllApplicants } from "./pages/quest/_components/Applicants/AllApplicants";
import { MyQuestDetail } from "./pages/quest/_components/questCard/MyAllQuestDetail";
// import { Setting } from "./pages/settings/Settings";
const Test = lazy(() => import("./pages/test/Test"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PersistentLayout />, // Removed ThemeProvider from here
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/quests/:id",
        element: <QuestDetail/>
      },
      {
        path: "/myquests/:id",
        element: <MyQuestDetail/>
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/wallet",
        element: <Wallet/>,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/notifications",
        element: <NotificationPage/>,
      },
      {
        path: "/settings",
        element: <Setting/>,
      },
      {
        path: "/quests",
        element: <QuestPage />,
      },
      {
        path: "/create",
        element: <CreateStory/>,
      },
      {
        path: "/quests/:id/applicants",
        element: <AllApplicants/>
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>
  },
  
]);

const App: React.FC = () => {
  return (
    // Wrap the entire app with ThemeProvider
    <ThemeProvider>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;