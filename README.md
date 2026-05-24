# Salão Club - Aplicativo de Agendamento & Cartão Fidelidade Digital 🚀

Este é um aplicativo mobile focado no setor de beleza e estética, desenvolvido para simplificar a confirmação de agendamentos e aumentar a retenção de clientes por meio de um sistema gamificado de fidelidade. 

O projeto foi construído pensando em uma arquitetura de **custo zero de software**, utilizando ferramentas gratuitas e de alta performance para o desenvolvimento.

## 🎯 Escopo do MVP (Mínimo Produto Viável)

O aplicativo divide-se em duas visões principais:
1. **Visão do Cliente:** Uma interface simples onde ele pode visualizar seu progresso no Cartão Fidelidade (acumular até 10 carimbos para liberar uma recompensa).
2. **Visão do Salão (Administrador):** Painel para buscar clientes pelo número de telefone e validar/adicionar carimbos após a confirmação da sessão.

## 👥 Regras de Negócio (Fluxo de Fidelidade)
- Cada sessão confirmada e realizada garante **+1 carimbo** ao cliente.
- Ao atingir **10 carimbos**, o aplicativo exibe um alerta de recompensa disponível (ex: um corte ou hidratação grátis).
- O administrador do salão valida a retirada do prêmio e o contador do cliente retorna a zero.

## 🛠️ Stack Tecnológica (100% Custo Zero)

- **Front-end Mobile:** React Native com Expo (Framework híbrido para Android e iOS)
- **Ambiente de Desenvolvimento:** Linux (Ubuntu/Debian) & VS Code
- **Controle de Versão:** Git & GitHub (Hospedagem de código pública)
- **Banco de Dados (Nuvem):** Firebase Firestore (Plano Spark - Gratuito)
- **Estratégia de Integração WhatsApp:** Links dinâmicos de redirecionamento ou automação via Webhook local (sem custos com a API oficial).
- **Gestão do Projeto:** Jira Software (Acompanhamento ágil das tarefas).