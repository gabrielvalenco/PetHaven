# 🐾 PetHaven

**PetHaven** is a web application designed to manage pet adoption requests between users and NGOs. The system allows animals to be registered for adoption, users to apply for pets, and reviews to be added after adoption experiences.

Built with **Django REST Framework** on the backend and **React** on the frontend, this project is structured to demonstrate clean architecture, API-based communication, and relational database modeling (1:N and N:N).

---

## 📚 Features

- ✅ User registration and login (authentication-ready structure)
- ✅ NGOs can list animals available for adoption
- ✅ Users can apply to adopt pets
- ✅ Adoption requests with status (pending, approved, rejected)
- ✅ Pet reviews after adoption
- ✅ RESTful API using class-based views (`ModelViewSet`)
- ✅ Full CRUD support for all entities
- ✅ Relational database modeling:  
  - One-to-Many: NGO → Animal, User → Review  
  - Many-to-Many: User ↔ Animal (via Adoption table)

---

## 🏗️ Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Backend    | Django, Django REST Framework |
| Frontend   | React (with Axios)            |
| Database   | SQLite (easy dev) / PostgreSQL (prod ready) |
| Auth       | Django User (ready for JWT)   |

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/gabrielvalenco/pethaven.git
cd pethaven
