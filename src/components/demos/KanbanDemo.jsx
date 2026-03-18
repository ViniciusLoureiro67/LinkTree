import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './KanbanDemo.css';

const initialColumns = [
  { id: 'todo', name: 'Para Fazer', color: '#3b82f6' },
  { id: 'in-progress', name: 'Em Progresso', color: '#f59e0b' },
  { id: 'done', name: 'Concluído', color: '#10b981' },
];

const initialCards = [
  { id: '1', title: 'Implementar sistema de notificações', column: 'todo', priority: 'high' },
  { id: '2', title: 'Criar dashboard interativo', column: 'todo', priority: 'medium' },
  { id: '3', title: 'Adicionar filtros ao Kanban', column: 'in-progress', priority: 'high' },
  { id: '4', title: 'Sistema de upload de arquivos', column: 'in-progress', priority: 'low' },
  { id: '5', title: 'Autenticação de dois fatores', column: 'done', priority: 'high' },
  { id: '6', title: 'Sistema de permissões', column: 'done', priority: 'medium' },
];

function Card({ id, title, priority, isDragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="kanban-card"
    >
      <div className="card-priority" style={{ backgroundColor: priorityColors[priority] }} />
      <p className="card-title">{title}</p>
      <span className="card-priority-badge" style={{ color: priorityColors[priority] }}>
        {priority === 'high' ? '🔴 Alta' : priority === 'medium' ? '🟡 Média' : '🟢 Baixa'}
      </span>
    </div>
  );
}

function Column({ column, cards, activeId }) {
  const cardsInColumn = cards.filter(card => card.column === column.id);
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <motion.div
      ref={setNodeRef}
      className={`kanban-column ${isOver ? 'drag-over' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="column-header" style={{ borderTopColor: column.color }}>
        <h3 className="column-title">{column.name}</h3>
        <span className="column-count">{cardsInColumn.length}</span>
      </div>
      <SortableContext items={cardsInColumn.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="column-cards">
          {cardsInColumn.map(card => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              priority={card.priority}
              isDragging={activeId === card.id}
            />
          ))}
        </div>
      </SortableContext>
    </motion.div>
  );
}

export function KanbanDemo() {
  const [cards, setCards] = useState(initialCards);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeCard = activeId ? cards.find(card => card.id === activeId) : null;

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    setActiveId(null);

    if (!over) {
      return;
    }

    const activeCard = cards.find(card => card.id === active.id);
    if (!activeCard) return;

    const overId = over.id;

    // Verificar se está sobre uma coluna
    const isColumn = initialColumns.some(col => col.id === overId);
    
    if (isColumn && activeCard.column !== overId) {
      setCards(prevCards => {
        return prevCards.map(card =>
          card.id === active.id ? { ...card, column: overId } : card
        );
      });
      return;
    }

    // Se está sobre outro card, mover para a coluna desse card
    const overCard = cards.find(card => card.id === overId);
    if (overCard && activeCard.column !== overCard.column) {
      setCards(prevCards => {
        return prevCards.map(card =>
          card.id === active.id ? { ...card, column: overCard.column } : card
        );
      });
    }
  }

  return (
    <div className="kanban-demo-container">
      <motion.div
        className="kanban-demo-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="demo-title">Kanban Interativo</h2>
        <p className="demo-subtitle">Arraste os cards entre as colunas para testar!</p>
      </motion.div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {initialColumns.map(column => (
            <Column
              key={column.id}
              column={column}
              cards={cards}
              activeId={activeId}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="kanban-card dragging">
              <div className="card-priority" style={{ backgroundColor: '#ef4444' }} />
              <p className="card-title">{activeCard.title}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <motion.div
        className="kanban-demo-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="demo-info-text">
          💡 <strong>Funcionalidades:</strong> Drag & Drop, Múltiplas Colunas, Prioridades, Filtros Avançados
        </p>
      </motion.div>
    </div>
  );
}
