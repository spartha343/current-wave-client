import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./authProvider/AuthProvider";
import SearchNewsProvider from "./searchNewsProvider/SearchNewsProvider";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SearchNewsProvider>
            <RouterProvider router={router} />
          </SearchNewsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
