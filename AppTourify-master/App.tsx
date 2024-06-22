import Router from "./routes/Router";
import { AuthProvider } from "./providers/AuthProvider";

export default function App() {
  return ( 
  <AuthProvider>
    <Router />
  </AuthProvider>
  )
}
