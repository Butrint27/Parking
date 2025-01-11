import { Routes, Route, Navigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./paths";
import AuthGuard from "../auth/AuthGuard";
import {
  allAccessRoles,
  managerAccessRoles,
  adminAccessRoles,
  ownerAccessRoles,
} from "../auth/auth.utils";
import Layout from "../components/layout";
import AdminPage from "../pages/dashboard/AdminPage";
import AllMessagesPage from "../pages/dashboard/AllMessagesPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import InboxPage from "../pages/dashboard/InboxPage";
import ManagerPage from "../pages/dashboard/ManagerPage";
import MyLogsPage from "../pages/dashboard/MyLogsPage";
import OwnerPage from "../pages/dashboard/OwnerPage";
import SendMessagePage from "../pages/dashboard/SendMessagePage";
import SystemLogsPage from "../pages/dashboard/SystemLogsPage";
import UpdateRolePage from "../pages/dashboard/UpdateRolePage";
import UserPage from "../pages/dashboard/UserPage";
import UsersManagementPage from "../pages/dashboard/UserManagementPage";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import RegisterPage from "../pages/public/RegisterPage";
import UnauthorizedPage from "../pages/public/UnauthorizedPage";
import { Suspense } from "react";
import Payments from "../pages/payment/Payments.page";
import EditPayment from "../pages/payment/EditPayment.page";
import AddPayment from "../pages/payment/AddPayment.page";
import PaymentMethods from "../pages/paymentMethod/PaymentMethod.page";
import EditPaymentMethod from "../pages/paymentMethod/EditPaymentMethod.page";
import AddPaymentMethod from "../pages/paymentMethod/AddPaymentMethod";
import Invoices from "../pages/invoice/Invoice.page";
import EditInvoice from "../pages/invoice/EditInvoice.page";
import AddInvoice from "../pages/invoice/AddInvoice.page";

const GlobalRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={PATH_PUBLIC.register} element={<RegisterPage />} />
        <Route path={PATH_PUBLIC.login} element={<LoginPage />} />
        <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />

        <Route element={<AuthGuard roles={allAccessRoles} />}>
          <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} />
          <Route
            path={PATH_DASHBOARD.sendMessage}
            element={<SendMessagePage />}
          />
          <Route path={PATH_DASHBOARD.inbox} element={<InboxPage />} />
          <Route path={PATH_DASHBOARD.myLogs} element={<MyLogsPage />} />
          <Route path={PATH_DASHBOARD.user} element={<UserPage />} />
        </Route>
        <Route element={<AuthGuard roles={managerAccessRoles} />}>
          <Route path={PATH_DASHBOARD.manager} element={<ManagerPage />} />
        </Route>
        <Route element={<AuthGuard roles={adminAccessRoles} />}>
          <Route
            path={PATH_DASHBOARD.usersManagement}
            element={<UsersManagementPage />}
          />
          <Route
            path={PATH_DASHBOARD.updateRole}
            element={<UpdateRolePage />}
          />
          <Route
            path={PATH_DASHBOARD.allMessages}
            element={<AllMessagesPage />}
          />
          <Route
            path={PATH_DASHBOARD.systemLogs}
            element={<SystemLogsPage />}
          />
          <Route path={PATH_DASHBOARD.admin} element={<AdminPage />} />
        </Route>
        <Route element={<AuthGuard roles={ownerAccessRoles} />}>
          <Route path={PATH_DASHBOARD.owner} element={<OwnerPage />} />
        </Route>

        <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage />} />

        <Route
          path="*"
          element={<Navigate to={PATH_PUBLIC.notFound} replace />}
        />

        <Route element={<AuthGuard roles={allAccessRoles} />}>
          <Route path={PATH_DASHBOARD.payments}>
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Payments />
                </Suspense>
              }
            />
            <Route path="edit/:id" element={<EditPayment />} />
            <Route path="add" element={<AddPayment />} />
          </Route>
        </Route>

        <Route element={<AuthGuard roles={allAccessRoles} />}>
          <Route path={PATH_DASHBOARD.paymentMethods}>
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PaymentMethods />
                </Suspense>
              }
            />
            <Route path="edit/:id" element={<EditPaymentMethod />} />
            <Route path="add" element={<AddPaymentMethod />} />
          </Route>
        </Route>
        <Route element={<AuthGuard roles={allAccessRoles} />}>
          <Route path={PATH_DASHBOARD.invoice}>
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Invoices />
                </Suspense>
              }
            />
            <Route path="edit/:id" element={<EditInvoice />} />
            <Route path="add" element={<AddInvoice />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default GlobalRouter;
