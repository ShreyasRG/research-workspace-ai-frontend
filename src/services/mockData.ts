import type { AISummary, Notification, Profile, Resource, User, Workspace } from '../types';

export const mockUser: User = {
  id: 'u1', name: 'Alex Morgan', email: 'alex.morgan@research.io',
  avatarUrl: 'https://images.pexels.com/photos/220817/pexels-photo-220817.jpeg?auto=compress&cs=tinysrgb&w=200',
  role: 'owner', joinedDate: '2024-01-15T08:00:00Z',
};

export const mockWorkspaces: Workspace[] = [
  { id: 'ws1', title: 'AI Safety Research', description: 'Tracking alignment, interpretability, and governance research across leading labs.', createdAt: '2024-02-10T09:30:00Z', owner: 'Alex Morgan', ownerId: 'u1', color: '#0969da', icon: 'ShieldCheck', resourceCount: 24, summaryCount: 18,
    members: [
      { id: 'u1', name: 'Alex Morgan', email: 'alex.morgan@research.io', avatarUrl: mockUser.avatarUrl, role: 'owner' },
      { id: 'u2', name: 'Priya Sharma', email: 'priya@research.io', avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200', role: 'member' },
      { id: 'u3', name: 'Daniel Kim', email: 'daniel@research.io', avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200', role: 'member' },
    ],
  },
  { id: 'ws2', title: 'Distributed Systems', description: 'Papers and talks on consensus, storage engines, and large-scale infrastructure.', createdAt: '2024-03-04T14:15:00Z', owner: 'Alex Morgan', ownerId: 'u1', color: '#1a7f37', icon: 'Server', resourceCount: 31, summaryCount: 22,
    members: [
      { id: 'u1', name: 'Alex Morgan', email: 'alex.morgan@research.io', avatarUrl: mockUser.avatarUrl, role: 'owner' },
      { id: 'u4', name: 'Sara Chen', email: 'sara@research.io', avatarUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200', role: 'member' },
    ],
  },
  { id: 'ws3', title: 'Product Strategy 2025', description: 'Market analysis, competitive teardowns, and roadmap thinking for next year.', createdAt: '2024-05-22T11:00:00Z', owner: 'Alex Morgan', ownerId: 'u1', color: '#8250df', icon: 'Target', resourceCount: 16, summaryCount: 9,
    members: [
      { id: 'u1', name: 'Alex Morgan', email: 'alex.morgan@research.io', avatarUrl: mockUser.avatarUrl, role: 'owner' },
      { id: 'u5', name: 'Marcus Lee', email: 'marcus@research.io', avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200', role: 'viewer' },
    ],
  },
  { id: 'ws4', title: 'NLP & Transformers', description: 'Foundational and frontier work on language models, retrieval, and agents.', createdAt: '2024-06-18T16:45:00Z', owner: 'Alex Morgan', ownerId: 'u1', color: '#bf8700', icon: 'BrainCircuit', resourceCount: 42, summaryCount: 35,
    members: [{ id: 'u1', name: 'Alex Morgan', email: 'alex.morgan@research.io', avatarUrl: mockUser.avatarUrl, role: 'owner' }],
  },
];

const makeTag = (name: string) => ({ id: name.toLowerCase(), name });

export const mockResources: Resource[] = [
  { id: 'r1', workspaceId: 'ws1', title: 'Constitutional AI: Harmlessness from AI Feedback', type: 'article', sourceUrl: 'https://anthropic.com/research/constitutional-ai', sourceName: 'anthropic.com', description: 'A method for training language models to be harmless and helpful using AI feedback rather than human labels.', tags: [makeTag('AI'), makeTag('Safety'), makeTag('Alignment')], dateAdded: '2024-07-08T10:00:00Z', status: 'completed', author: 'Anthropic', thumbnailUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', readTimeMinutes: 35 },
  { id: 'r2', workspaceId: 'ws1', title: 'Interpretability Beyond Attention', type: 'article', sourceUrl: 'https://distill.pub/interpretability-beyond-attention', sourceName: 'distill.pub', description: 'Exploring circuits and features for understanding what models compute inside their layers.', tags: [makeTag('Interpretability'), makeTag('AI')], dateAdded: '2024-07-10T14:30:00Z', status: 'reading', author: 'Distill', thumbnailUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', readTimeMinutes: 22 },
  { id: 'r3', workspaceId: 'ws1', title: 'AI Governance Frameworks — 2024 Roundup', type: 'video', sourceUrl: 'https://youtube.com/watch?v=aigov2024', sourceName: 'youtube.com', description: 'A panel discussion on emerging regulatory frameworks for AI across the EU, US, and Asia.', tags: [makeTag('Governance'), makeTag('AI')], dateAdded: '2024-07-12T09:15:00Z', status: 'unread', author: 'AI Safety Summit', thumbnailUrl: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800', durationSeconds: 3120 },
  { id: 'r4', workspaceId: 'ws2', title: 'The Raft Consensus Algorithm', type: 'article', sourceUrl: 'https://raft.github.io/raft.pdf', sourceName: 'raft.github.io', description: 'Understandable consensus algorithm designed as an alternative to Paxos.', tags: [makeTag('Consensus'), makeTag('Distributed')], dateAdded: '2024-06-20T11:00:00Z', status: 'completed', author: 'Diego Ongaro', readTimeMinutes: 45 },
  { id: 'r5', workspaceId: 'ws2', title: "Dynamo: Amazon's Highly Available Key-Value Store", type: 'article', sourceUrl: 'https://amazon.com/dynamo-paper', sourceName: 'amazon.com', description: 'Classic paper on eventually-consistent distributed storage at scale.', tags: [makeTag('Storage'), makeTag('Distributed')], dateAdded: '2024-06-25T13:45:00Z', status: 'reading', author: 'Amazon', readTimeMinutes: 30 },
  { id: 'r6', workspaceId: 'ws3', title: 'Q3 Competitive Teardown: Notion vs Coda vs Airtable', type: 'note', sourceUrl: '', sourceName: 'Local note', description: 'Internal analysis of feature gaps, pricing, and positioning.', tags: [makeTag('Strategy'), makeTag('Market')], dateAdded: '2024-07-01T16:20:00Z', status: 'completed', author: 'Alex Morgan' },
  { id: 'r7', workspaceId: 'ws4', title: 'Attention Is All You Need', type: 'article', sourceUrl: 'https://arxiv.org/abs/1706.03762', sourceName: 'arxiv.org', description: 'The foundational Transformer paper introducing self-attention.', tags: [makeTag('Transformers'), makeTag('NLP')], dateAdded: '2024-05-15T08:00:00Z', status: 'completed', author: 'Vaswani et al.', readTimeMinutes: 40 },
  { id: 'r8', workspaceId: 'ws4', title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP', type: 'article', sourceUrl: 'https://arxiv.org/abs/2005.11401', sourceName: 'arxiv.org', description: 'RAG: combining parametric and non-parametric memory for open-domain QA.', tags: [makeTag('Retrieval'), makeTag('NLP')], dateAdded: '2024-06-02T10:30:00Z', status: 'reading', author: 'Lewis et al.', readTimeMinutes: 28 },
];

export const mockSummaries: AISummary[] = [
  { id: 's1', resourceId: 'r1', resourceTitle: 'Constitutional AI: Harmlessness from AI Feedback', workspaceId: 'ws1', workspaceName: 'AI Safety Research', title: 'Summary: Constitutional AI',
    summary: 'Constitutional AI (CAI) is a training method where a language model critiques and revises its own responses based on a set of principles ("constitution") rather than relying solely on human feedback. The approach has two phases: supervised learning where the model self-improves its responses, and RL from AI feedback where a preference model trained on the revised responses replaces human raters. CAI produces models that are both helpful and harmless, reducing the need for large-scale human labeling.',
    keyTakeaways: [{ id: 'k1', text: 'CAI uses a set of principles to guide self-critique, reducing reliance on human labels.' }, { id: 'k2', text: 'The method has two phases: supervised self-improvement and RL from AI feedback.' }, { id: 'k3', text: 'Models trained with CAI are less harmful while maintaining helpfulness.' }],
    importantQuotes: [{ id: 'q1', text: "The key idea is to use a set of principles to guide the model's own critique of its responses." }],
    suggestedQuestions: ['How does CAI compare to RLHF in terms of label efficiency?', 'What are the limitations of AI-generated feedback?'],
    generatedDate: '2024-07-09T12:00:00Z', tags: [makeTag('AI'), makeTag('Safety')], model: 'Claude 3.5 Sonnet' },
  { id: 's2', resourceId: 'r4', resourceTitle: 'The Raft Consensus Algorithm', workspaceId: 'ws2', workspaceName: 'Distributed Systems', title: 'Summary: Raft Consensus',
    summary: 'Raft is a consensus algorithm designed for understandability and correctness, serving as an alternative to Paxos. It decomposes consensus into three sub-problems: leader election, log replication, and safety. A strong leader simplifies the design — all requests flow through the leader, which replicates to followers. Raft uses randomized timers for leader election, ensuring split votes are rare.',
    keyTakeaways: [{ id: 'k1', text: 'Raft prioritizes understandability over Paxos by using a strong leader model.' }, { id: 'k2', text: 'Three sub-problems: leader election, log replication, safety.' }, { id: 'k3', text: 'Randomized election timeouts prevent split votes.' }],
    importantQuotes: [{ id: 'q1', text: 'Raft uses a stronger form of leader election than Paxos to simplify the algorithm.' }],
    suggestedQuestions: ['How does Raft handle network partitions?', 'What is the role of the term number in Raft?'],
    generatedDate: '2024-06-21T14:00:00Z', tags: [makeTag('Consensus'), makeTag('Distributed')], model: 'Claude 3.5 Sonnet' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'summary_ready', title: 'Summary ready', message: 'Your AI summary for "Constitutional AI" is ready to read.', timestamp: '2024-07-09T12:01:00Z', read: false, actionUrl: '/summaries/s1' },
  { id: 'n2', type: 'reading_reminder', title: 'Reading reminder', message: 'You have 3 unread resources in AI Safety Research.', timestamp: '2024-07-10T09:00:00Z', read: false },
  { id: 'n3', type: 'workspace_invite', title: 'Workspace invite', message: 'Priya Sharma invited you to join "ML Interpretability".', timestamp: '2024-07-05T15:30:00Z', read: true },
];

export const mockProfile: Profile = {
  id: 'u1', name: 'Alex Morgan', email: 'alex.morgan@research.io', avatarUrl: mockUser.avatarUrl,
  bio: 'Research engineer focused on AI safety and distributed systems. I read a lot of papers and write summaries to retain what I learn.',
  location: 'San Francisco, CA', website: 'https://alexmorgan.dev', twitter: '@alexmorgan_dev', github: 'alexmorgan',
  interests: ['AI Safety', 'Distributed Systems', 'NLP', 'Product Strategy'],
  notificationPreferences: { emailNotifications: true, pushNotifications: false, weeklyDigest: true, productUpdates: true },
  readingGoals: { weeklyTarget: 5, currentWeek: 3, streak: 12 },
  stats: { resourcesRead: 87, summariesGenerated: 42, workspacesCreated: 4, totalReadingTimeMinutes: 5400 },
};

export const MOCK_SCAN_IMAGE = 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800';
export const MOCK_SCAN_TITLE = 'Scanned Research Paper';
export const MOCK_SCAN_DESCRIPTION = 'Extracted via optical character recognition (OCR) from a physical document scan. This mock content simulates the text that would be recognized from a printed page.';
export const MOCK_SCAN_EXTRACTED_TEXT = `Abstract

We present a novel approach to aligning large language models with human preferences using a constitution-based framework. Our method, Constitutional AI (CAI), replaces human feedback with AI-generated critiques guided by a set of principles.

1. Introduction

Reinforcement Learning from Human Feedback (RLHF) has emerged as the dominant paradigm for training helpful and harmless AI assistants. However, RLHF requires large-scale human labeling, which is expensive and difficult to scale. We propose an alternative approach where the model critiques and revises its own outputs.

2. Method

CAI operates in two phases. In the first phase, the model generates responses to harmful prompts, then critiques and revises them according to a constitution. In the second phase, a preference model is trained on the revised responses and used for RL.

3. Results

Models trained with CAI achieve comparable helpfulness to RLHF while significantly reducing harmful outputs. The approach also demonstrates improved scalability and reduced dependence on human labelers.

4. Conclusion

Constitutional AI offers a promising path toward scalable alignment of language models. Future work should explore the robustness of AI-generated feedback and the potential for adversarial manipulation of the constitution.

References
[1] Bai, Y. et al. (2022). Constitutional AI: Harmlessness from AI Feedback. arXiv:2212.08073.
[2] Ouyang, J. et al. (2022). Training language models to follow instructions with human feedback. arXiv:2203.02155.`;
