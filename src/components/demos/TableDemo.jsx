import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../lib/utils';

const initialData = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Admin', status: 'Ativo', createdAt: '2024-01-15' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'Editor', status: 'Ativo', createdAt: '2024-02-20' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Viewer', status: 'Inativo', createdAt: '2024-03-10' },
  { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', role: 'Editor', status: 'Ativo', createdAt: '2024-01-25' },
  { id: 5, name: 'Carlos Lima', email: 'carlos@email.com', role: 'Admin', status: 'Ativo', createdAt: '2024-04-05' },
  { id: 6, name: 'Lucia Ferreira', email: 'lucia@email.com', role: 'Viewer', status: 'Pendente', createdAt: '2024-05-12' },
  { id: 7, name: 'Roberto Alves', email: 'roberto@email.com', role: 'Editor', status: 'Ativo', createdAt: '2024-02-28' },
  { id: 8, name: 'Fernanda Rocha', email: 'fernanda@email.com', role: 'Admin', status: 'Ativo', createdAt: '2024-03-18' },
];

const statusColors = {
  Ativo: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Inativo: 'bg-red-500/20 text-red-400 border-red-500/30',
  Pendente: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

const roleColors = {
  Admin: 'bg-purple-500/20 text-purple-400',
  Editor: 'bg-blue-500/20 text-blue-400',
  Viewer: 'bg-gray-500/20 text-gray-400',
};

const ITEMS_PER_PAGE = 5;

function ActionMenu({ onView, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-white/40" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-1 z-20 w-32 py-1 rounded-lg bg-gray-800/90 backdrop-blur-lg border border-white/10 shadow-xl"
            >
              <button
                onClick={() => { onView(); setIsOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Eye className="w-4 h-4" />
                Ver
              </button>
              <button
                onClick={() => { onEdit(); setIsOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => { onDelete(); setIsOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TableDemo() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtrar e ordenar dados
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filtro de busca
    if (search) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro de status
    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Ordenação
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [data, search, sortConfig, statusFilter]);

  // Paginação
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((row) => row.id));
    }
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <GlassCard padding="lg" hover={false}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Tabela Interativa</h3>
            <p className="text-sm text-white/50">
              Ordenação, filtros e paginação
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50"
              />
            </div>
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="all">Todos</option>
              <option value="Ativo">Ativos</option>
              <option value="Inativo">Inativos</option>
              <option value="Pendente">Pendentes</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="rounded bg-white/5 border-white/20"
                  />
                </th>
                {['name', 'email', 'role', 'status', 'createdAt'].map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="p-3 text-left text-sm font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {column === 'name' && 'Nome'}
                      {column === 'email' && 'Email'}
                      {column === 'role' && 'Role'}
                      {column === 'status' && 'Status'}
                      {column === 'createdAt' && 'Criado em'}
                      <SortIcon column={column} />
                    </div>
                  </th>
                ))}
                <th className="p-3 text-left text-sm font-medium text-white/60">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedData.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'border-b border-white/5 hover:bg-white/5 transition-colors',
                      selectedRows.includes(row.id) && 'bg-blue-500/10'
                    )}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="rounded bg-white/5 border-white/20"
                      />
                    </td>
                    <td className="p-3 text-sm text-white font-medium">
                      {row.name}
                    </td>
                    <td className="p-3 text-sm text-white/70">{row.email}</td>
                    <td className="p-3">
                      <span className={cn(
                        'px-2 py-0.5 text-xs rounded-md',
                        roleColors[row.role]
                      )}>
                        {row.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={cn(
                        'px-2 py-0.5 text-xs rounded-full border',
                        statusColors[row.status]
                      )}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-white/50">
                      {new Date(row.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3">
                      <ActionMenu
                        onView={() => {}}
                        onEdit={() => {}}
                        onDelete={() => handleDelete(row.id)}
                      />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <p className="text-sm text-white/50">
            Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} a{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedData.length)} de{' '}
            {filteredAndSortedData.length} resultados
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-white/40 pt-2 border-t border-white/5">
          <span>💡</span>
          <span>
            <strong className="text-white/60">Funcionalidades:</strong> Ordenação, Busca, Filtros, Paginação, Seleção múltipla, Ações
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
