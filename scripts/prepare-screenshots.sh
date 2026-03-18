#!/bin/bash

# Script para preparar as screenshots do Nexus
# Execute este script na pasta raiz do projeto

SCREENSHOTS_DIR="public/screenshots"

echo "📸 Preparando estrutura para screenshots do Nexus..."
echo ""

# Criar diretório se não existir
mkdir -p "$SCREENSHOTS_DIR"

echo "✅ Estrutura criada em: $SCREENSHOTS_DIR"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Salve as 8 imagens que você enviou na pasta: $SCREENSHOTS_DIR"
echo ""
echo "2. Renomeie as imagens com estes nomes exatos:"
echo "   - nexus-kanban-1.jpg (ou .png)"
echo "   - nexus-kanban-2.jpg (ou .png)"
echo "   - nexus-colaboradores.jpg (ou .png)"
echo "   - nexus-chamados-1.jpg (ou .png)"
echo "   - nexus-chamados-2.jpg (ou .png)"
echo "   - nexus-feedback-1.jpg (ou .png)"
echo "   - nexus-feedback-2.jpg (ou .png)"
echo "   - nexus-dashboard.jpg (ou .png)"
echo ""
echo "3. As imagens aparecerão automaticamente na galeria do portfólio!"
echo ""
