import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./components/Register";
import { Password } from "./components/Password";
import { ResetPassword } from "./components/ResetPassword";
import { Profile } from "./components/Profile";
import { Recovery } from "./components/Recovery";
import { PageNotFound } from "./components/PageNotFound";
import { Username } from "./components/Username/Username";

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

/** root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
