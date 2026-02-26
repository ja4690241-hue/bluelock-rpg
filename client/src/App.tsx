import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Criacao from "./pages/Criacao";
import Classes from "./pages/Classes";
import Mecanicas from "./pages/Mecanicas";
import Treinamentos from "./pages/Treinamentos";
import Ego from "./pages/Ego";

import Ficha from "./pages/Ficha";
import AcoesEconomia from "./pages/AcoesEconomia";
import Fluxo from "./pages/Fluxo";
import Itens from "./pages/Itens";
import Mestres from "./pages/Mestres";
import ExemploPartida from "./pages/ExemploPartida";
import Pericias from "./pages/Pericias";
import Atributos from "./pages/Atributos";
import MecanicasAvancadas from "./pages/MecanicasAvancadas";
import Calculadora from "./pages/Calculadora";
import FluxoDetalhado from "./pages/FluxoDetalhado";
import ItensCondicoes from "./pages/ItensCondicoes";
import GuiaNarrador from "./pages/GuiaNarrador";
import Regras from "./pages/Regras";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/criacao" component={Criacao} />
        <Route path="/classes" component={Classes} />
        <Route path="/mecanicas" component={Mecanicas} />
        <Route path="/treinamentos" component={Treinamentos} />
        <Route path="/ego" component={Ego} />
        <Route path="/ficha" component={Ficha} />
        <Route path="/acoes" component={AcoesEconomia} />
        <Route path="/fluxo" component={Fluxo} />
        <Route path="/itens" component={Itens} />
        <Route path="/mestres" component={Mestres} />
        <Route path="/exemplo" component={ExemploPartida} />
        <Route path="/pericias" component={Pericias} />
        <Route path="/atributos" component={Atributos} />
        <Route path="/mecanicas-avancadas" component={MecanicasAvancadas} />
        <Route path="/calculadora" component={Calculadora} />
        <Route path="/fluxo-detalhado" component={FluxoDetalhado} />
        <Route path="/itens-condicoes" component={ItensCondicoes} />
        <Route path="/guia-narrador" component={GuiaNarrador} />
        <Route path="/regras" component={Regras} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
