import { GlassPanel, Button, Card } from "@/components/ui";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

export default function ExplorarPage() {
    return (
        <div className="relative min-h-screen flex flex-col bg-[var(--color-bg-light)] overflow-x-hidden">
            {/* Ambient Background Orbs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="bg-orb bg-blue-300/30 w-[600px] h-[600px] -top-20 -left-20 animate-float" />
                <div className="bg-orb bg-purple-200/30 w-[500px] h-[500px] top-40 right-0 animate-float-delayed" />
                <div className="bg-orb bg-cyan-200/20 w-[800px] h-[800px] -bottom-40 left-1/2 transform -translate-x-1/2" />
            </div>

            <div className="relative z-10 flex min-h-screen w-full flex-col">
                {/* Navbar */}
                <header className="sticky top-0 z-50 w-full glass-panel border-b-0 rounded-none">
                    <div className="flex justify-center w-full">
                        <div className="w-full max-w-[1280px] px-4 md:px-10 py-3 flex items-center justify-between">
                            <Logo size="md" />

                            <nav className="hidden md:flex items-center gap-8">
                                <Link
                                    href="/explorar"
                                    className="text-slate-600 hover:text-[var(--color-primary)] text-sm font-medium transition-colors"
                                >
                                    Explorar
                                </Link>
                                <Link
                                    href="#"
                                    className="text-slate-600 hover:text-[var(--color-primary)] text-sm font-medium transition-colors"
                                >
                                    Sobre
                                </Link>
                                <Link
                                    href="#"
                                    className="text-slate-600 hover:text-[var(--color-primary)] text-sm font-medium transition-colors"
                                >
                                    Comunidade
                                </Link>
                            </nav>

                            <div className="flex items-center gap-4">
                                <Link
                                    href="#"
                                    className="hidden sm:block text-slate-600 hover:text-[var(--color-primary)] text-sm font-medium"
                                >
                                    Entrar
                                </Link>
                                <Link href="/dashboard">
                                    <Button variant="primary" size="sm">
                                        Começar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center w-full px-4 md:px-10 pb-20">
                    {/* Hero / Intro Section */}
                    <section className="max-w-4xl w-full pt-16 pb-8 text-center flex flex-col items-center gap-6">
                        <GlassPanel className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm">
                                auto_awesome
                            </span>
                            Fluxo Criativo
                        </GlassPanel>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-sm">
                            Explore como ideias <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-cyan)]">
                                se conectam
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                            Mergulhe em um oceano de criatividade onde pensamentos fluem e
                            evoluem. O Nexus Artifex visualiza o intangível.
                        </p>
                    </section>

                    {/* Visual Graph Section */}
                    <section className="w-full max-w-5xl my-10 relative">
                        <GlassPanel className="w-full aspect-[16/9] md:aspect-[21/9] min-h-[300px] rounded-3xl relative overflow-hidden flex items-center justify-center shadow-2xl shadow-blue-200/40 border border-white/60">
                            {/* Decorative Background inside graph */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-blue-50/20 to-white/40 pointer-events-none" />

                            {/* Graph Visualization */}
                            <div className="relative w-full h-full max-w-3xl mx-auto flex items-center justify-center">
                                {/* Connecting Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0} />
                                            <stop offset="50%" stopColor="var(--color-primary)" stopOpacity={1} />
                                            <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        className="opacity-40 animate-pulse"
                                        d="M 200 150 Q 300 50 400 120 T 600 180"
                                        fill="none"
                                        stroke="url(#lineGradient)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        className="opacity-30"
                                        d="M 200 150 Q 250 250 350 220 T 600 180"
                                        fill="none"
                                        stroke="url(#lineGradient)"
                                        strokeWidth="2"
                                    />
                                    <path
                                        className="opacity-30"
                                        d="M 350 220 L 400 120"
                                        fill="none"
                                        stroke="url(#lineGradient)"
                                        strokeDasharray="5,5"
                                        strokeWidth="1.5"
                                    />
                                </svg>

                                {/* Node 1 (Ideia) */}
                                <div className="absolute left-[15%] top-[40%] flex flex-col items-center gap-2 z-10 animate-float">
                                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-[var(--shadow-node)] border border-blue-100 group-hover:scale-110 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-[var(--color-primary)] text-[28px]">
                                            lightbulb
                                        </span>
                                        <div className="absolute inset-0 rounded-full animate-pulse-slow border-2 border-[var(--color-primary)]/30" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                        Ideia
                                    </span>
                                </div>

                                {/* Node 2 (Conexão) */}
                                <div className="absolute left-[45%] top-[25%] flex flex-col items-center gap-2 z-10 animate-float-delayed">
                                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-[var(--shadow-node)] border border-blue-100 group-hover:scale-110 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-[var(--color-accent-cyan)] text-[32px]">
                                            hub
                                        </span>
                                        <div className="absolute inset-0 rounded-full animate-pulse-slow border-2 border-[var(--color-accent-cyan)]/30" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                        Conexão
                                    </span>
                                </div>

                                {/* Node 3 (Interseção) */}
                                <div className="absolute left-[35%] top-[60%] flex flex-col items-center gap-2 z-10 animate-float">
                                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-blue-100">
                                        <div className="w-3 h-3 rounded-full bg-blue-300" />
                                    </div>
                                </div>

                                {/* Node 4 (Evolução/Final) */}
                                <div className="absolute right-[15%] top-[50%] flex flex-col items-center gap-2 z-10 animate-float">
                                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-cyan)] shadow-[0_8px_30px_rgba(37,140,244,0.5)] border border-white/50 group-hover:scale-105 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-white text-[36px]">
                                            rocket_launch
                                        </span>
                                        <div className="absolute -inset-2 rounded-full border border-white/30 animate-ping opacity-20" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                        Evolução
                                    </span>
                                </div>
                            </div>
                        </GlassPanel>
                    </section>

                    {/* Explanation Cards Section */}
                    <section className="max-w-5xl w-full py-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card padding="lg" hoverable>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)] mb-2 shadow-inner border border-blue-100">
                                    <span className="material-symbols-outlined fill-1">
                                        water_drop
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Ideias</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Gotas individuais de inspiração que surgem do nada. Capture
                                    cada pensamento antes que ele evapore.
                                </p>
                            </Card>

                            <Card padding="lg" hoverable>
                                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-[var(--color-accent-cyan)] mb-2 shadow-inner border border-cyan-100">
                                    <span className="material-symbols-outlined fill-1">share</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Conexões</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Correntes de pensamento que unem conceitos distintos. Descubra
                                    padrões invisíveis em sua rede de conhecimento.
                                </p>
                            </Card>

                            <Card padding="lg" hoverable>
                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-2 shadow-inner border border-purple-100">
                                    <span className="material-symbols-outlined fill-1">
                                        trending_up
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Evolução</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    O crescimento natural de pensamentos em projetos complexos.
                                    Veja suas ideias amadurecerem e se transformarem.
                                </p>
                            </Card>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section className="max-w-4xl w-full py-12 md:py-20 text-center">
                        <GlassPanel className="rounded-3xl p-10 md:p-16 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 via-blue-50/30 to-blue-100/50 pointer-events-none" />
                            <div className="relative z-10 flex flex-col items-center gap-8">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                    Pronto para conectar suas ideias?
                                </h2>
                                <p className="text-slate-600 max-w-lg mx-auto">
                                    Comece hoje mesmo a construir seu próprio oceano de
                                    conhecimento no Nexus Artifex.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mt-4">
                                    <Link href="/dashboard">
                                        <Button variant="primary" size="lg" className="w-full sm:w-auto">
                                            Criar Projeto
                                        </Button>
                                    </Link>
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                        Entrar
                                    </Button>
                                </div>
                            </div>
                        </GlassPanel>
                    </section>
                </main>

                <Footer className="rounded-none" />
            </div>
        </div>
    );
}
