# FinanceFlow

**A personal finance tracking system built with Django REST Framework and React.**

Most people track money in spreadsheets until they stop bothering. FinanceFlow gives you a proper backend — transactions, accounts, budgets, and categories as structured relational data — with a clean dashboard on top.

> 🚧 Active development — core API and dashboard UI in progress.

**[Live Demo](#)** · **[API Explorer](#)** · **[Portfolio](https://asadmurad.com)**

---

## Features

- Transaction recording — income and expenses with category and account linkage
- Financial account management — checking, savings, credit, cash
- Category system — tag and group transactions (Food, Transport, etc.)
- Budget tracking — set limits per category, monitor remaining balance
- Dashboard — cashflow over time, spending by category, net savings
- Reports — monthly summaries and spending trends *(in progress)*
- Settings and user preferences *(planned)*

---

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | Python, Django 5, Django REST Framework |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Database | SQLite (dev) → PostgreSQL (prod) |
| Charts | Recharts |
| Auth | JWT via SimpleJWT *(planned)* |

---

## Project Structure

```
Finance_Tracker_Django/
├── backend/
│   ├── core/           # Settings, root URL config
│   ├── config/         # Environment configuration
│   ├── accounts/       # Financial accounts (checking, savings, credit, etc.)
│   ├── transactions/   # Transaction model, serializers, views
│   ├── categories/     # Spending categories
│   ├── budgets/        # Budget limits and tracking per category
│   └── reports/        # Aggregation logic — summaries and trends
└── frontend/           # React + Vite dashboard
```

Each domain is a self-contained Django app. The transaction is the core entity — everything else (accounts, categories, budgets) is a relation that makes it queryable and meaningful.

---

## Data Model Decisions

**Transaction as the core entity**

Every financial event is a `Transaction`. Category, account, date, and type (income/expense) are first-class fields — not strings, not notes. This makes aggregations like "monthly spending by category" a single annotated queryset at the DB level rather than Python loops over flat data.

**`DecimalField` not `FloatField` for money**

All amount fields use `DecimalField(max_digits=10, decimal_places=2)`. Floating-point arithmetic isn't deterministic — rounding errors are invisible at small scale and a real problem when you're summing thousands of transactions.

**`on_delete=PROTECT` on categories and accounts**

Deleting a category shouldn't silently orphan transaction history. The DB rejects the deletion and forces an explicit decision. Same for accounts. Financial records need an audit trail — hard deletes are the wrong default here.

**Accounts as a first-class model**

Account name is not a string field on Transaction. Accounts are their own model so you can calculate running balances, filter by account, and later support transfers between accounts cleanly.

**Budgets reference categories, not transactions directly**

A budget sets a limit for a category. Spending against that budget is calculated by summing transactions in that category for the period — no denormalized counters to keep in sync.

---

## Running Locally

**Backend**

```bash
git clone https://github.com/asadlion1/Finance_Tracker_Django.git
cd Finance_Tracker_Django/backend

python -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API available at `http://localhost:8000/api/` with DRF's browsable interface.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET / POST | `/api/transactions/` | List or create transactions |
| GET / PATCH / DELETE | `/api/transactions/{id}/` | Transaction detail |
| GET / POST | `/api/accounts/` | List or create financial accounts |
| GET / POST | `/api/categories/` | List or create categories |
| GET / POST | `/api/budgets/` | List or create budgets |
| GET | `/api/reports/monthly/` | Monthly summary by category *(in progress)* |

---

## Roadmap

**In progress**
- [ ] Transaction filtering by date range, category, account, type
- [ ] Monthly summary endpoint — totals grouped by category
- [ ] Budget vs actual calculation per category

**Up next**
- [ ] Running balance per account
- [ ] Recurring transactions — subscriptions, rent, salary
- [ ] CSV import for existing transaction history
- [ ] JWT authentication — multi-user support

**Planned**
- [ ] Spending trend analysis
- [ ] Export to PDF / CSV
- [ ] PostgreSQL in production
- [ ] Deployment — Railway (API) + Netlify (frontend)

---

## Author

**Asad Murad**

[asadmurad.com](https://asadmurad.com) · [LinkedIn](https://linkedin.com/in/asadmurad) · [GitHub](https://github.com/asadlion1)****
