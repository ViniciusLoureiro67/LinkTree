import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../lib/utils';

const stats = [
  {
    id: 1,
    label: 'Total de Usuários',
    value: 1248,
    change: +12.5,
    icon: Users,
    color: 'blue',
  },
  {
    id: 2,
    label: 'Projetos Ativos',
    value: 24,
    change: +8.2,
    icon: FileText,
    color: 'purple',
  },
  {
    id: 3,
    label: 'Tarefas Concluídas',
    value: 456,
    change: +23.1,
    icon: CheckCircle,
    color: 'emerald',
  },
  {
    id: 4,
    label: 'Tempo Médio',
    value: '2.4h',
    change: -5.3,
    icon: Clock,
    color: 'amber',
  },
];

const colorMap = {
  blue: {
    bg: 'bg-blue-500/10',
    icon: 'text-blue-400',
    bar: 'bg-blue-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    icon: 'text-purple-400',
    bar: 'bg-purple-500',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-400',
    bar: 'bg-emerald-500',
  },
  amber: {
    bg: 'bg-amber-500/10',
    icon: 'text-amber-400',
    bar: 'bg-amber-500',
  },
  pink: {
    bg: 'bg-pink-500/10',
    icon: 'text-pink-400',
    bar: 'bg-pink-500',
  },
};

const chartData = [
  { label: 'Jan', value: 65 },
  { label: 'Fev', value: 78 },
  { label: 'Mar', value: 52 },
  { label: 'Abr', value: 91 },
  { label: 'Mai', value: 83 },
  { label: 'Jun', value: 95 },
];

const activities = [
  { id: 1, user: 'João Silva', action: 'criou um novo projeto', time: '2 min atrás', initials: 'JS', color: 'bg-[#6F1C80]' },
  { id: 2, user: 'Maria Santos', action: 'concluiu uma tarefa', time: '15 min atrás', initials: 'MS', color: 'bg-[#32446C]' },
  { id: 3, user: 'Pedro Costa', action: 'comentou no ticket #123', time: '1h atrás', initials: 'PC', color: 'bg-emerald-600' },
  { id: 4, user: 'Ana Oliveira', action: 'enviou um feedback', time: '2h atrás', initials: 'AO', color: 'bg-[#9333EA]' },
];

function StatCard({ stat, index }) {
  const Icon = stat.icon;
  const colors = colorMap[stat.color];
  const isPositive = stat.change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard padding="md" hover={false} className="h-full">
        <div className="flex items-start justify-between">
          <div className={cn('p-2 rounded-lg', colors.bg)}>
            <Icon className={cn('w-5 h-5', colors.icon)} />
          </div>
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium',
            isPositive ? 'text-emerald-400' : 'text-red-400'
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(stat.change)}%
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-sm text-white/50">{stat.label}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function MiniChart({ data }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex-1 flex flex-col items-center gap-2"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md"
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            style={{ minHeight: '8px' }}
          />
          <span className="text-xs text-white/40">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ActivityItem({ activity, index }) {
  return (
    <motion.div
      className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
    >
      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white', activity.color)}>
        {activity.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">
          <span className="font-medium">{activity.user}</span>{' '}
          <span className="text-white/70">{activity.action}</span>
        </p>
        <p className="text-xs text-white/60">{activity.time}</p>
      </div>
    </motion.div>
  );
}

export function DashboardDemo() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlassCard padding="lg" hover={false}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Dashboard</h3>
              <p className="text-xs text-white/50">Visão geral do sistema</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
              <Activity className="w-3 h-3" />
              Online
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Chart and Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart */}
          <GlassCard padding="md" hover={false}>
            <h4 className="text-sm font-medium text-white mb-4">
              Desempenho Mensal
            </h4>
            <MiniChart data={chartData} />
          </GlassCard>

          {/* Activity Feed */}
          <GlassCard padding="md" hover={false}>
            <h4 className="text-sm font-medium text-white mb-2">
              Atividade Recente
            </h4>
            <div className="space-y-0">
              {activities.map((activity, index) => (
                <ActivityItem key={activity.id} activity={activity} index={index} />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-white/40 pt-2 border-t border-white/5">
          <span>💡</span>
          <span>
            <strong className="text-white/60">Funcionalidades:</strong> Widgets, Gráficos, Métricas em tempo real, Feed de atividades
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
