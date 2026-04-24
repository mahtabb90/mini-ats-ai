import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import JobsPage from "./pages/JobsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { supabase } from "./lib/supabase";
import Layout from "./components/Layout";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
<Route
  path="/dashboard"
  element={
    <ProtectedRoute session={session}>
      <Layout session={session}>
        <DashboardPage session={session} />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/jobs"
  element={
    <ProtectedRoute session={session}>
      <Layout session={session}>
        <JobsPage session={session} />
      </Layout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;