# 🐾 PetHaven

**PetHaven** é um sistema de adoção de animais que conecta usuários a ONGs. O sistema permite que animais sejam cadastrados para adoção, usuários possam solicitar adoções e adicionar avaliações após a experiência de adoção.

Construído com **Django REST Framework** no backend e **React** no frontend, este projeto demonstra uma arquitetura limpa, comunicação baseada em API e modelagem de banco de dados relacional (1:N e N:N).

---

## 📚 Recursos

- ✅ Registro e login de usuários (estrutura pronta para autenticação)
- ✅ ONGs podem listar animais disponíveis para adoção
- ✅ Usuários podem solicitar adoção de pets
- ✅ Solicitações de adoção com status (pendente, aprovado, rejeitado)
- ✅ Avaliações de pets após adoção
- ✅ API RESTful usando views baseadas em classe (`ModelViewSet`)
- ✅ Suporte CRUD completo para todas as entidades
- ✅ Modelagem de banco de dados relacional:  
  - Um-para-Muitos: ONG → Animal, Usuário → Avaliação  
  - Muitos-para-Muitos: Usuário ↔ Animal (via tabela Adoção)

---

## 🏗️ Stack Tecnológica

| Camada     | Tecnologia                    |
|------------|-------------------------------|
| Backend    | Django, Django REST Framework |
| Frontend   | React (com Bootstrap e Axios) |
| Banco de Dados | SQLite (desenvolvimento) |
| Autenticação | Django User (preparado para JWT) |

---

## 📋 Modelo de Dados

**User** (Django default)
- Relacionamento 1:N com Review
- Relacionamento N:N com Animal através de Adoption

**NGO** (ONG)
- nome, cidade, email, telefone, etc.
- Relacionamento 1:N com Animal

**Animal** (Pet)
- nome, tipo (cachorro/gato), idade, raça, etc.
- Chave estrangeira para ONG
- Relacionamento N:N com User via Adoption

**Adoption** (Adoção)
- data_adoção, status (pendente, aprovada, negada)
- Chaves estrangeiras para User e Animal

**Review** (Avaliação)
- nota (1-5), comentário
- Chaves estrangeiras para User e Animal

---

## ⚙️ Instalação e Configuração

### Backend (Django)

1. Navegue até o diretório do backend:
```bash
cd backend
```

2. Crie e ative um ambiente virtual:
```bash
python -m venv env
.\env\Scripts\activate  # Windows
# ou
source env/bin/activate  # Linux/Mac
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Execute as migrações do banco de dados:
```bash
python manage.py migrate
```

5. Crie um superusuário para acessar o admin:
```bash
python manage.py createsuperuser
```

6. Inicie o servidor:
```bash
python manage.py runserver
```

O backend estará disponível em: http://127.0.0.1:8000/
Interface administrativa: http://127.0.0.1:8000/admin/
API: http://127.0.0.1:8000/api/

### Frontend (React)

1. Navegue até o diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O frontend estará disponível em: http://localhost:3000/

## 🚀 Funcionalidades Implementadas

### API Endpoints

- `/api/users/` - Gerenciamento de usuários
- `/api/ngos/` - Gerenciamento de ONGs
- `/api/animals/` - Gerenciamento de animais
- `/api/adoptions/` - Gerenciamento de adoções
- `/api/reviews/` - Gerenciamento de avaliações

### Credenciais de Acesso (após criação do superusuário)

- **Admin URL:** http://127.0.0.1:8000/admin/
- **Usuário:** admin (ou o que você definiu)
- **Senha:** (a senha que você definiu)
