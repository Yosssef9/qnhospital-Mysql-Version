import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../pages/Home"));
const QnhHistory = lazy(() => import("../pages/QnhHistory"));
const MssionVision = lazy(() => import("../pages/MssionVision"));
const PatientsRights = lazy(() => import("../pages/PatientsRights"));
const HospitalAccreditations = lazy(
  () => import("../pages/HospitalAccreditations"),
);
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const JoinUs = lazy(() => import("../pages/JoinUs"));
const MedicalDepartments = lazy(() => import("../pages/MedicalDepartments"));
const ClinicDetailsPage = lazy(
  () => import("../pages/MedicalDepartmentsSections/ClinicDetailsPage"),
);
const UnitDetailsPage = lazy(
  () => import("../pages/MedicalDepartmentsSections/UnitDetailsPage"),
);
const CenterDetailsPage = lazy(
  () => import("../pages/MedicalDepartmentsSections/CenterDetailsPage"),
);
const MedicalServiceDetailsPage = lazy(
  () => import("../pages/MedicalDepartmentsSections/MedicalServiceDetailsPage"),
);
const NewsPage = lazy(() => import("../pages/NewsPage"));
const AppointmentsAppPage = lazy(() => import("../pages/AppointmentsAppPage"));
const OurDoctorsPage = lazy(() => import("../pages/OurDoctorsPage"));
const DoctorProfilePage = lazy(() => import("../pages/DoctorProfilePage"));
const NewsAchievementsPage = lazy(
  () => import("../pages/NewsAchievementsPage"),
);
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "qnh-history", element: <QnhHistory /> },
      { path: "mission-vision", element: <MssionVision /> },
      { path: "patients-rights", element: <PatientsRights /> },
      {
        path: "hospital-accreditations/:certificateKey?",
        element: <HospitalAccreditations />,
      },
      {
        path: "medical-departments",
        element: <MedicalDepartments />,
      },
      { path: "join-us", element: <JoinUs /> },
      { path: "clinics/:slug", element: <ClinicDetailsPage /> },
      { path: "units/:slug", element: <UnitDetailsPage /> },
      { path: "centers/:slug", element: <CenterDetailsPage /> },
      {
        path: "medical-services/:slug",
        element: <MedicalServiceDetailsPage />,
      },
      {
        path: "/our-doctors",
        element: <OurDoctorsPage />,
      },
      {
        path: "/appointments-App",
        element: <AppointmentsAppPage />,
      },
      {
        path: "/our-doctors/:slug",
        element: <DoctorProfilePage />,
      },
      { path: "latest-news", element: <NewsPage /> },
      { path: "News&Achievements", element: <NewsAchievementsPage /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
