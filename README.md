**README — быстрый старт и деплой на Vercel**

## 1) Переменные окружения
Создай `.env` (локально) и в Vercel Project Settings → Environment Variables:
```
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@<supabase|neon-host>:6543/postgres?pgbouncer=true&connection_limit=1&connect_timeout=30&sslmode=require"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@<supabase|neon-host>:5432/postgres?connect_timeout=30&sslmode=require"
```
- Для Supabase: host вида `aws-1-...pooler.supabase.com`.
- Для Neon: возьми URI из Connection Details; порт 5432, добавь `sslmode=require`. Если есть pooling-URL — используйте его для `DATABASE_URL`.

## 2) Локальный запуск
```bash
npm install
npx prisma generate
npx prisma migrate dev      # создаст таблицы в указанной БД
npm run prisma:seed         # опционально, тестовые клиенты
npm run dev                 # http://localhost:3000
```

## 3) Структура важного
- Prisma schema: `prisma/schema.prisma`
- Seed: `prisma/seed.ts`
- Клиент Prisma: `src/lib/prisma.ts`
- API: `src/app/api/clients/...`, `contacts`, `tasks`
- UI/страницы: `src/app/...`

## 4) Деплой на Vercel (App Router)
1. Закоммить код и подключи репозиторий к Vercel.
2. В Vercel → Project → Settings → Environment Variables добавь `DATABASE_URL`, `DIRECT_URL`.
3. (Рекомендуется) Прогон миграций против прод-БД локально/CI:
   ```bash
   npx prisma migrate deploy
   ```
   или `prisma migrate deploy` как CI step перед build.
4. Deploy (Vercel сам сделает `npm install` → `next build`).
5. Открой прод-URL, создай клиента — обнови страницу: данные сохраняются (лежат во внешней БД).

## 5) Проверка после деплоя
- Создай клиента на проде (кнопка “+ Клиент”).
- Перезагрузи страницу / открой в инкогнито — запись остаётся.
- Выполни follow-up, snooze, смену статуса — изменения отражаются, т.к. хранятся в PostgreSQL.

## 6) Полезные команды
- Генерация клиента Prisma: `npx prisma generate`
- Миграции (dev): `npx prisma migrate dev`
- Миграции (prod/CI): `npx prisma migrate deploy`
- Seed: `npm run prisma:seed`

Готово: проект можно локально запускать и сразу деплоить на Vercel с постоянным хранением в Supabase/Neon PostgreSQL.