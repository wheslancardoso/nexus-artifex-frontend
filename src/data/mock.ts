import { NodeData, ConnectionData } from "@/components/graph";

// Mock nodes for dashboard
export const mockNodes: NodeData[] = [
    {
        id: "1",
        x: 400,
        y: 300,
        label: "Campanha",
        sublabel: "Marketing Q3",
        icon: "lightbulb",
        size: "lg",
        variant: "primary",
    },
    {
        id: "2",
        x: 600,
        y: 150,
        label: "Design Visual",
        sublabel: "3 sub-itens",
        size: "md",
        variant: "default",
    },
    {
        id: "3",
        x: 600,
        y: 450,
        label: "Orçamento",
        sublabel: "Pendente",
        size: "md",
        variant: "default",
    },
    {
        id: "4",
        x: 800,
        y: 250,
        label: "Freelancers",
        size: "sm",
        variant: "default",
    },
];

// Mock connections for dashboard
export const mockConnections: ConnectionData[] = [
    {
        id: "c1",
        fromX: 400,
        fromY: 300,
        toX: 600,
        toY: 150,
        type: "solid",
        animated: true,
    },
    {
        id: "c2",
        fromX: 400,
        fromY: 300,
        toX: 600,
        toY: 450,
        type: "solid",
    },
    {
        id: "c3",
        fromX: 600,
        fromY: 150,
        toX: 800,
        toY: 250,
        type: "dashed",
    },
];

// Mock project data
export const mockProject = {
    id: "project-alpha",
    name: "Projeto Alpha",
    status: "online" as const,
    collaborators: [
        { id: "1", name: "Ana Silva", avatar: null },
        { id: "2", name: "Carlos Mendes", avatar: null },
        { id: "3", name: "Beatriz Santos", avatar: null },
    ],
};

// Landing page features
export const landingFeatures = [
    {
        icon: "travel_explore",
        title: "Ilhas Isoladas",
        description:
            "Ferramentas que não conversam criam silos de pensamento, impedindo a sinergia natural.",
    },
    {
        icon: "cloud_off",
        title: "Perda de Contexto",
        description:
            "A falta de conexão dilui o impacto das suas inovações e torna difícil recuperar a origem das ideias.",
    },
    {
        icon: "hourglass_disabled",
        title: "Ideias Estagnadas",
        description:
            "Sem fluxo contínuo, a evolução criativa é interrompida antes mesmo de amadurecer.",
    },
];

// Creative flow steps
export const flowSteps = [
    {
        icon: "neurology",
        title: "Ideação",
        description: "Onde tudo começa. Capture o pensamento bruto.",
    },
    {
        icon: "water_drop",
        title: "Evolução",
        description: "Nutra suas ideias e veja-as ganhar forma.",
    },
    {
        icon: "share_reviews",
        title: "Conexão",
        description: "O sistema encontra padrões e une conceitos.",
    },
    {
        icon: "rocket_launch",
        title: "Exploração",
        description: "Navegue pelo seu novo universo de conhecimento.",
        highlight: true,
    },
];
