import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassPanel, Button, Card } from "@/components/ui";
import { landingFeatures, flowSteps } from "@/data/mock";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col aurora-bg overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        {/* Background Orbs - Frutiger Aero style */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-orb bg-orb-aqua animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orb bg-orb-gold animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-orb bg-orb-rose animate-pulse-soft" />

        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Inteligência Criativa Viva
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm">
            Mergulhe no <br />
            <span className="text-gradient-aqua">
              Oceano de Ideias
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
            Nexus Artifex: Onde a inteligência criativa flui, conecta e evolui
            em um ecossistema vivo. Descubra conexões invisíveis em suas ideias.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Link href="/dashboard">
              <Button variant="glossy" size="lg" className="w-full sm:w-auto min-w-[200px]">
                Explorar o Nexus
                <span className="material-symbols-outlined">arrow_forward</span>
              </Button>
            </Link>
            <Link href="/explorar">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                <span className="material-symbols-outlined">play_circle</span>
                Ver Demonstração
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="mt-16 w-full max-w-5xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent-aqua)] via-[var(--color-primary)] to-[var(--color-accent-teal)] rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000" />
            <GlassPanel className="rounded-[2rem] p-4 relative overflow-hidden aspect-[16/9] md:aspect-[21/9]">
              <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-sky-100 via-cyan-50 to-teal-100 flex items-center justify-center">
                <div className="glass-panel px-6 py-4 rounded-xl flex items-center gap-3 animate-float shadow-xl">
                  <span className="material-symbols-outlined text-[var(--color-accent-gold)]">
                    auto_awesome
                  </span>
                  <span className="font-bold text-slate-800">
                    Sua ideia conectada
                  </span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fragmentação Criativa
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em um mar de ferramentas desconectadas, suas melhores ideias
              acabam se perdendo como ilhas isoladas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landingFeatures.map((feature) => (
              <Card key={feature.title} padding="lg" hoverable>
                <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl text-cyan-600">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id="solucao"
        className="py-24 px-6 relative bg-gradient-to-b from-transparent to-white/40"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-8">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wide">
              Ecossistema Unificado
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Conecte pensamentos como um{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                grafo vivo
              </span>
              .
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Nossa interface de vidro líquido permite visualizar conexões
              invisíveis. Cada ideia é um nó que respira, cresce e se conecta
              automaticamente com conceitos relacionados.
            </p>
            <ul className="space-y-4">
              {[
                "Visualização espacial de dados",
                "Sugestões de conexão por IA",
                "Interface fluida e sem atrito",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--color-accent-yellow)] bg-black/5 rounded-full p-1 text-sm">
                    check
                  </span>
                  <span className="text-slate-500 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Saiba como funciona a tecnologia
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="flex-1 w-full">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300 to-[var(--color-accent-yellow)] opacity-20 blur-[60px] rounded-full animate-pulse" />
              <GlassPanel className="w-full h-full rounded-[2.5rem] relative flex items-center justify-center overflow-hidden shadow-2xl border border-white/60">
                <div className="absolute top-[20%] left-[10%] glass-panel p-3 rounded-xl animate-bounce shadow-lg" style={{ animationDelay: "0s", animationDuration: "4s" }}>
                  <span className="material-symbols-outlined text-cyan-700">
                    lightbulb
                  </span>
                </div>
                <div className="absolute bottom-[25%] right-[15%] glass-panel p-3 rounded-xl animate-bounce shadow-lg" style={{ animationDelay: "1s", animationDuration: "5s" }}>
                  <span className="material-symbols-outlined text-[var(--color-accent-yellow)]">
                    hub
                  </span>
                </div>
                <div className="bg-[var(--color-accent-yellow)]/90 p-4 rounded-2xl animate-pulse shadow-[var(--shadow-glow)] z-10">
                  <span className="material-symbols-outlined text-slate-900">
                    auto_graph
                  </span>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section id="fluxo" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
            Seu Fluxo Criativo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {flowSteps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 z-10 relative group-hover:-translate-y-2 transition-transform duration-300">
                  <div
                    className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${step.highlight
                      ? "bg-[var(--color-accent-yellow)]/50"
                      : "bg-cyan-100"
                      }`}
                  />
                  <span
                    className={`material-symbols-outlined text-3xl relative z-10 ${step.highlight ? "text-slate-900" : "text-cyan-600"
                      }`}
                  >
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-20 px-6">
        <GlassPanel className="max-w-4xl mx-auto p-10 rounded-[2.5rem] text-center shadow-xl border border-white/70 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-accent-yellow)]/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-[60px]" />
          <span className="material-symbols-outlined text-4xl text-cyan-600 mb-6">
            memory
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Tecnologia Invisível
          </h2>
          <p className="text-lg text-slate-600 mb-0 leading-relaxed max-w-2xl mx-auto">
            Por trás da interface cristalina, algoritmos avançados trabalham
            silenciosamente. Não é apenas organização, é{" "}
            <span className="font-bold text-slate-900">ressonância cognitiva</span>.
            Nossa IA aprende como você pensa e adapta o fluxo para maximizar sua
            criatividade.
          </p>
        </GlassPanel>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-0" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Pronto para mergulhar?
          </h2>
          <p className="text-xl text-slate-500 mb-10">
            Junte-se a milhares de mentes criativas que já encontraram seu fluxo
            no Nexus.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link href="/dashboard">
              <Button variant="glossy" size="lg" className="text-xl px-10 py-5">
                Começar Gratuitamente
              </Button>
            </Link>
            <p className="text-sm text-slate-400 mt-2">
              Sem cartão de crédito necessário. 14 dias de teste grátis.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
