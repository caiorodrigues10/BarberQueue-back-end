-- Row Level Security (RLS) policies for v1.1 and v1.2 tables.
-- Follows the same pattern as 20260826150000_add_rls_policies.

-- ============================================================
-- 1. Habilitar RLS nas tabelas novas
-- ============================================================

ALTER TABLE cash_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_goals ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. Policies para tabelas com barbershopId NOT NULL
-- ============================================================

-- cash_movements
CREATE POLICY tenant_isolation ON cash_movements
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);

-- loyalty_programs
CREATE POLICY tenant_isolation ON loyalty_programs
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);

-- loyalty_accounts
CREATE POLICY tenant_isolation ON loyalty_accounts
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);

-- loyalty_ledger_entries
CREATE POLICY tenant_isolation ON loyalty_ledger_entries
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);

-- professional_goals
CREATE POLICY tenant_isolation ON professional_goals
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);

-- ============================================================
-- 3. Habilitar RLS forçado
-- ============================================================

ALTER TABLE cash_movements FORCE ROW LEVEL SECURITY;
ALTER TABLE loyalty_programs FORCE ROW LEVEL SECURITY;
ALTER TABLE loyalty_accounts FORCE ROW LEVEL SECURITY;
ALTER TABLE loyalty_ledger_entries FORCE ROW LEVEL SECURITY;
ALTER TABLE professional_goals FORCE ROW LEVEL SECURITY;
