# Database Backup Strategy

HerbAlly uses **Supabase (PostgreSQL)** as its database. This document outlines the backup and recovery strategy.

## Supabase Point-in-Time Recovery (PITR)

Supabase projects on the **Pro plan and above** include automated backups with point-in-time recovery.

### What's Backed Up

- Full database (all tables, indexes, functions, triggers)
- Auth schema (`auth.users`, etc.)
- Storage objects metadata

### Backup Schedule

| Plan | Backup Frequency | Retention |
|------|-----------------|-----------|
| Pro | Daily full backup + 2-minute WAL archival | 7 days of PITR |
| Team | Daily full backup + 2-minute WAL archival | 14 days of PITR |
| Enterprise | Daily full backup + 1-minute WAL archival | 30 days of PITR |

**HerbAlly is currently on the Pro plan** — 7-day PITR is active.

### How to Perform a Manual Backup

Via Supabase Dashboard:
1. Go to [Database > Backups](https://supabase.com/dashboard/project/pnvltmyixympgammxvoo/database/backups)
2. Click **"Trigger a new backup"** (pre-deployment, before schema changes)
3. Download the backup as a `.sql` file

Via Supabase CLI:
```bash
# Full database dump (excludes auth schema)
supabase db dump --linked --file ./backups/herbally-$(date +%Y-%m-%d).sql

# Include auth schema if needed
supabase db dump --linked --file ./backups/herbally-full-$(date +%Y-%m-%d).sql \
  --schema public,auth,storage
```

### Recovery Procedure

#### Restore from PITR (within 7 days)
1. Go to [Database > Backups](https://supabase.com/dashboard/project/pnvltmyixympgammxvoo/database/backups)
2. Click **"Restore"** on the target backup
3. Select a point in time (within 2-minute granularity)
4. Confirm restoration — a new database instance is created

#### Restore from SQL dump
```bash
# Restore to a new Supabase project
psql "$NEW_DATABASE_URL" < ./backups/herbally-2026-04-26.sql
```

### Schema Migrations

All schema changes are tracked in `supabase/migrations/` (22 migrations). To recreate the database from scratch:

```bash
# Create a new Supabase project, then:
supabase db push --linked
```

This applies all migrations in order, creating the full schema without data.

## Automated Backup Recommendations

### Pre-Deployment
- Run `supabase db dump` in CI before deploying schema changes
- Store the dump in a secure cloud storage bucket (e.g., S3, R2)

### Monitoring
- Set up a cron job or GitHub Action to email backup status weekly
- Verify backup integrity by restoring to a staging environment quarterly

## Migration File Safety

**IMPORTANT:** Never edit a migration file after it has been applied to production. Create a new migration file instead, following the `NNNNN_description.sql` numbering convention.
