export type ShowcaseScreen = {
  id: string;
  title: string;
  description: string;
  status: 'ready' | 'mock' | 'pending';
  route: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  tone: 'primary' | 'success' | 'warning';
};

export const showcaseScreens: ShowcaseScreen[] = [
  {
    id: 'welcome-flow',
    title: 'Fluxo inicial',
    description: 'Entrada do app, primeira impressão e chamada para ação principal.',
    status: 'ready',
    route: '/onboarding'
  },
  {
    id: 'home-dashboard',
    title: 'Dashboard',
    description: 'Resumo do dia, próximos passos e atalhos para áreas importantes.',
    status: 'mock',
    route: '/(tabs)/home'
  },
  {
    id: 'assistant-chat',
    title: 'Assistente Aidan',
    description: 'Tela de conversa simulada para demonstrar interação com o Aidan.',
    status: 'mock',
    route: '/(tabs)/assistant'
  },
  {
    id: 'profile-area',
    title: 'Perfil',
    description: 'Dados do usuário, preferências e progresso visual.',
    status: 'pending',
    route: '/(tabs)/profile'
  }
];

export const activityItems: ActivityItem[] = [
  {
    id: '1',
    title: 'Plano de hoje pronto',
    description: 'Aidan preparou um resumo visual para a demonstração.',
    time: '09:10',
    tone: 'primary'
  },
  {
    id: '2',
    title: 'Navegação mockada',
    description: 'Todas as telas funcionam sem conexão com backend.',
    time: '10:30',
    tone: 'success'
  },
  {
    id: '3',
    title: 'APK de apresentação',
    description: 'Build preview configurado para instalar em Android real.',
    time: 'Hoje',
    tone: 'warning'
  }
];

export const chatMessages = [
  {
    id: '1',
    from: 'aidan',
    text: 'Bom dia, Lucas. Preparei uma visão rápida do que vamos demonstrar hoje.'
  },
  {
    id: '2',
    from: 'user',
    text: 'Quero mostrar apenas as telas no Android real.'
  },
  {
    id: '3',
    from: 'aidan',
    text: 'Perfeito. A navegação está mockada e responsiva para a apresentação.'
  }
];
