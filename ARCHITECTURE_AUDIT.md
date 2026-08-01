# Finance Tracker Django — Architecture Audit

Read-only audit. Repo: `asadlion1/finance_tracker_django`, branch `claude/django-architecture-audit-gy3u6q`, audited at commit `3172bb3` (2026-08-01).

---

## 1. Stack & Config

**Dependencies (`requirements.txt`, UTF-16 encoded file — unusual, most tooling expects UTF-8):**

| Package | Version |
|---|---|
| Django | 6.0 |
| djangorestframework | 3.16.1 |
| djangorestframework_simplejwt | 5.5.1 |
| django-cors-headers | 4.9.0 |
| PyJWT | 2.10.1 |
| asgiref | 3.11.0 |
| sqlparse | 0.5.5 |
| tzdata | 2025.3 |

**Database:** `django.db.backends.sqlite3`, file `BASE_DIR / db.sqlite3`. No env-based override; single hardcoded config in `config/settings.py`.

**INSTALLED_APPS** (`config/settings.py:36`):
```
django.contrib.admin
django.contrib.auth
django.contrib.contenttypes
django.contrib.sessions
django.contrib.messages
django.contrib.staticfiles
core
```
Only `core` is registered. `accounts` and `transactions` are directories on disk (with `apps.py`, `models.py`, etc.) but are **not** listed in `INSTALLED_APPS`.

**Auth setup:**
- `django.contrib.auth` is installed (default `auth.User`); no `AUTH_USER_MODEL` override.
- `REST_FRAMEWORK` (`settings.py:131`) sets `DEFAULT_AUTHENTICATION_CLASSES = rest_framework_simplejwt.authentication.JWTAuthentication` and `DEFAULT_PERMISSION_CLASSES = IsAuthenticated`.
- No token-obtain/refresh URLs are wired anywhere in `urls.py` — no login endpoint exists despite JWT being the default auth class.
- Standard Django auth middleware (`AuthenticationMiddleware`, `SessionMiddleware`) is present alongside the JWT config (mixed session + JWT setup).

**Dev-only settings, flagged as-is:**
- `DEBUG = True` (`settings.py:26`)
- `SECRET_KEY = 'django-insecure-$(%97)^g0&l%swudjkdy1o*tspg#+(=h!ds1du$v51gpsgs&s='` — hardcoded in the file, committed to the repo (`settings.py:23`)
- `ALLOWED_HOSTS = []` (empty list, two blank lines inside, `settings.py:28-31`)
- `CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]`, `CORS_ALLOW_CREDENTIALS = True` (`settings.py:125-128`)

**Middleware:** standard Django stack plus `corsheaders.middleware.CorsMiddleware` (placed first).

**Root URLconf** (`config/urls.py`): single entry, `path('admin/', admin.site.urls)`. No API routes, no app includes.

---

## 2. Data Models

**`accounts` app** (`accounts/models.py`): no models defined — file contains only the Django-generated placeholder comment. App is also excluded from `INSTALLED_APPS`.

**`core` app** (`core/models.py`): no models defined — placeholder comment only.

**`transactions` app** (`transactions/models.py`):
```python
class Transaction(models.Model):
    pass
```
One model, zero fields (not even the implicit fields beyond Django's auto `id`). No relationships, no `Meta`, no custom methods/properties. App is excluded from `INSTALLED_APPS`, so this model is not part of the active app registry and has no migrations.

**Migrations:** No app has a generated migration beyond the empty `migrations/__init__.py`. No `0001_initial.py` exists for `accounts`, `core`, or `transactions`. `core/migrations/__pycache__/` contains a compiled `__init__.pyc` but no source migration ever existed to produce it.

Net state: there are no functioning data models in this codebase yet.

---

## 3. API Surface

No app defines a `urls.py`. The only `urls.py` in the project is `config/urls.py`, which contains a single route to the Django admin.

**Views:** `accounts/views.py`, `core/views.py`, `transactions/views.py` each contain only:
```python
from django.shortcuts import render
# Create your views here.
```
No functions, no classes, no `ViewSet`/`APIView` anywhere in the backend.

**Serializers:** `transactions/serializations.py` exists but is a 0-byte empty file. Note the filename itself deviates from DRF convention (`serializers.py`). No serializer classes exist in the project.

**Net result:** the only reachable HTTP endpoint in the entire backend is `/admin/`. None of the endpoints documented in the project's own `README.md` (`/api/transactions/`, `/api/accounts/`, `/api/categories/`, `/api/budgets/`, `/api/reports/monthly/`) exist in code.

---

## 4. Business Logic Location

There is no business logic anywhere in the backend at this point:
- No views (function- or class-based) contain any code.
- No model has custom methods, properties, or a custom manager.
- No serializer validation exists.
- The one model that exists (`transactions.Transaction`) has no fields to hold logic around.

This is a bare Django project skeleton (auth/admin/sessions scaffolding + CORS + DRF/JWT settings wired) with no CRUD and no domain logic implemented yet.

---

## 5. Tests

`accounts/tests.py`, `core/tests.py`, `transactions/tests.py` each contain only:
```python
from django.test import TestCase
# Create your tests here.
```
No test cases exist in any app. Zero backend test coverage.

---

## 6. Frontend

`frontend/` is a real, fully scaffolded React application, not boilerplate stubs:
- Vite + React 18 + TypeScript + Tailwind CSS + `react-router-dom` (`package.json` name: `"magic-patterns-vite-template"`, suggesting it was generated via the Magic Patterns AI UI tool rather than hand-scaffolded).
- Working routed pages: `Dashboard`, `Transactions`, `Budgets`, `Categories`, `Reports`, `Settings` (`src/App.tsx`), each with real component trees (KPI cards, Recharts-based cashflow/spending charts, tables, filters, modals, layout with sidebar + top navbar).
- A full UI component library under `src/components/ui/` (Button, Card, Modal, Drawer, Select, Switch, ProgressBar, Input, Badge).

**What it actually does right now:** everything runs against a fake API layer. `frontend/src/src/api/finance.ts` (note the doubled `src/src/` path) exports `financeApi`, whose methods (`getDashboardSummary`, `listTransactions`, `createTransaction`, `listBudgets`, etc.) each just `await delay(ms)` and return static objects from `src/lib/mockData.ts`. There are no `fetch`/`axios` calls to the Django backend anywhere in the frontend — it is completely decoupled from `backend/` at present, despite `CORS_ALLOWED_ORIGINS` in Django settings being configured for the frontend's dev port (5173).

---

## 7. Observations

- `accounts` and `transactions` are not in `INSTALLED_APPS` — their models (even the empty `Transaction` stub) are outside Django's app registry, so `makemigrations`/`migrate`/admin will never see them until they're registered.
- README documents a materially different, larger architecture (separate `categories/`, `budgets/`, `reports/` apps, a documented `/api/...` surface, JWT auth "planned") than what exists on disk — only `accounts`, `core`, `transactions` directories exist, and none of the documented endpoints are implemented.
- `transactions.Transaction` model is defined with `pass` only — no fields at all, including no amount/date/type/category/account fields that the README's "Data Model Decisions" section describes in detail (`DecimalField`, `PROTECT` on delete, etc.). None of that is reflected in code yet.
- DRF is configured to require JWT authentication by default (`IsAuthenticated` + `JWTAuthentication`) but no login/token endpoint is wired in any `urls.py` — the configured auth mechanism has no way to actually be exercised.
- `transactions/serializations.py` is an empty file with a non-standard name (conventionally `serializers.py` in DRF projects).
- No app has a `urls.py`; all routing lives in `config/urls.py`, which only exposes `/admin/`.
- Zero automated tests exist in the backend despite `tests.py` being present (boilerplate only) in every app.
- `backend/db.sqlite3` is committed to git, along with several `__pycache__/*.pyc` files (`config/__pycache__/`, `core/__pycache__/`) — compiled bytecode and a local dev database are tracked in version control.
- `requirements.txt` is UTF-16-encoded with CRLF line endings, unlike typical UTF-8 requirements files; some tooling/environments may mis-parse it depending on default locale/encoding assumptions.
- `SECRET_KEY` is the Django-generated default, hardcoded directly in `settings.py` and committed to the repo, with no environment-variable indirection.
- `ALLOWED_HOSTS` is an empty list (with stray blank lines), and there is no `.env`/environment-based configuration anywhere in the project — `DEBUG`, `SECRET_KEY`, and DB settings are all literal values in `settings.py`.
- The frontend is entirely mock-data driven (`src/lib/mockData.ts` via `src/src/api/finance.ts`) and makes no network calls to the Django backend at all — the two halves of the project are currently unconnected.
- `frontend/src/src/api/` is a doubled/nested directory (`src/src/`), inconsistent with the rest of the frontend's `src/<category>/` layout.
- The `accounts` app's intended purpose is ambiguous: the README describes "accounts" as financial accounts (checking/savings/credit), but the app name and its co-location with `django.contrib.auth` in a typical Django project layout could equally suggest user-account/auth logic; the app is currently empty either way, so this is unresolved rather than decided.
