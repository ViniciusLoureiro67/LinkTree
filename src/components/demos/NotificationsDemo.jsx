import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Ticket, MessageSquare, Bell } from 'lucide-react';
import './NotificationsDemo.css';

const initialNotifications = [
  {
    id: 1,
    type: 'kanban',
    title: 'Card atribuído a você',
    message: 'Você foi atribuído ao card "Implementar sistema de notificações"',
    time: 'há 5 minutos',
    read: false,
  },
  {
    id: 2,
    type: 'ticket',
    title: 'Novo comentário no ticket',
    message: 'João comentou no ticket #123',
    time: 'há 15 minutos',
    read: false,
  },
  {
    id: 3,
    type: 'feedback',
    title: 'Novo feedback recebido',
    message: 'Um novo feedback foi criado no projeto Nexus',
    time: 'há 1 hora',
    read: true,
  },
  {
    id: 4,
    type: 'kanban',
    title: 'Card movido',
    message: 'Card "Dashboard interativo" foi movido para "Em Progresso"',
    time: 'há 2 horas',
    read: true,
  },
];

const typeIcons = {
  kanban: LayoutDashboard,
  ticket: Ticket,
  feedback: MessageSquare,
};

export function NotificationsDemo() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      const target = event.target;
      
      // Verificar se o clique foi fora do dropdown e do botão
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    // Usar setTimeout para evitar que o evento de abertura seja capturado
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="notifications-demo-container">
      <motion.div
        className="notifications-demo-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="demo-title">Sistema de Notificações</h2>
        <p className="demo-subtitle">Notificações em tempo real com diferentes tipos</p>
      </motion.div>

      <div className="notifications-demo-content">
        <motion.button
          ref={buttonRef}
          className="notifications-button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" aria-hidden="true" />
          Notificações
          {unreadCount > 0 && (
            <motion.span
              className="notification-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {unreadCount}
            </motion.span>
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay invisível para fechar ao clicar fora */}
              <motion.div
                className="notifications-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                ref={dropdownRef}
                className="notifications-dropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
              <div className="notifications-header">
                <h3>Notificações</h3>
                {unreadCount > 0 && (
                  <button
                    className="mark-all-read"
                    onClick={handleMarkAllAsRead}
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>

              <div className="notifications-list">
                <AnimatePresence>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={() => handleMarkAsRead(notification.id)}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="notification-icon">
                        {(() => {
                          const IconComponent = typeIcons[notification.type];
                          return IconComponent ? <IconComponent className="w-5 h-5" aria-hidden="true" /> : null;
                        })()}
                      </div>
                      <div className="notification-content">
                        <h4 className="notification-title">{notification.title}</h4>
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      {!notification.read && <div className="unread-dot" />}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="notifications-demo-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="demo-info-text">
          💡 <strong>Funcionalidades:</strong> Notificações em tempo real, Múltiplos tipos, Marcar como lida, Badges de contagem
        </p>
      </motion.div>
    </div>
  );
}
