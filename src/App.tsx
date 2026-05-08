import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
import Index from "./pages/Index";
import Vacancies from "./pages/Vacancies";
import About from "./pages/About";
import Fund from "./pages/Fund";
import News from "./pages/News";
import Blog from "./pages/Blog";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/about" element={<About />} />
            <Route path="/fund" element={<Fund />} />
            <Route path="/news" element={<News />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
