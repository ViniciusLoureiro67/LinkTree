import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Code } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
const syntaxHighlight = (code) => {
  // Simple syntax highlighting for common patterns
  let highlighted = code
    // Strings
    .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="text-emerald-400">$&</span>')
    // Keywords
    .replace(
      /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g,
      '<span class="text-purple-400">$&</span>'
    )
    // Numbers
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-400">$&</span>')
    // Comments
    .replace(/(\/\/.*$)/gm, '<span class="text-white/30 italic">$&</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-white/30 italic">$&</span>')
    // JSX tags
    .replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, '<span class="text-blue-400">$&</span>')
    // Props/attributes
    .replace(/\s([a-zA-Z-]+)=/g, ' <span class="text-cyan-400">$1</span>=')
    // Functions
    .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="text-yellow-400">$1</span>(');

  return highlighted;
};

const escapeHtml = (code) => {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export function CodeSnippet({
  code,
  language = 'javascript',
  title,
  showLineNumbers = true,
  className,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <GlassCard padding="none" hover={false} className={className}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-400" />
          {title && <span className="text-sm font-medium text-white">{title}</span>}
          <span className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-white/50">
            {language}
          </span>
        </div>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          <code className="flex flex-col">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none w-8 mr-4 text-right text-white/20">
                    {index + 1}
                  </span>
                )}
                <span
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(escapeHtml(line), language) || '&nbsp;',
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </GlassCard>
  );
}

// Demo wrapper component
export function CodeSnippetDemo() {
  const exampleCode = `import { useState } from 'react';
import { motion } from 'framer-motion';

// Custom hook for Kanban board
export function useKanban(initialCards) {
  const [cards, setCards] = useState(initialCards);

  const moveCard = (cardId, columnId) => {
    setCards(prev => prev.map(card =>
      card.id === cardId
        ? { ...card, column: columnId }
        : card
    ));
  };

  return { cards, moveCard };
}`;

  return (
    <GlassCard padding="lg" hover={false}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Visualizador de Código</h3>
          <p className="text-sm text-white/50">
            Syntax highlighting e botão de copiar
          </p>
        </div>

        <CodeSnippet
          code={exampleCode}
          language="typescript"
          title="useKanban.ts"
        />

        <div className="flex items-center gap-2 text-sm text-white/40 pt-2 border-t border-white/5">
          <span>💡</span>
          <span>
            <strong className="text-white/60">Funcionalidades:</strong> Syntax highlighting, Números de linha, Copiar código
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
