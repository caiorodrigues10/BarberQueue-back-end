-- RLS for v1.3 tables
ALTER TABLE appointment_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_waitlist_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE salon_membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_usages ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON appointment_deposits
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);
CREATE POLICY tenant_isolation ON appointment_waitlist_entries
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);
CREATE POLICY tenant_isolation ON appointment_waitlist_offers
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);
CREATE POLICY tenant_isolation ON salon_membership_plans
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);
CREATE POLICY tenant_isolation ON membership_benefits
  USING (current_setting('app.current_barbershop_id', true) = '' OR EXISTS (SELECT 1 FROM salon_membership_plans WHERE id = "planId" AND "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid));
CREATE POLICY tenant_isolation ON client_memberships
  USING (current_setting('app.current_barbershop_id', true) = '' OR "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid);
CREATE POLICY tenant_isolation ON membership_cycles
  USING (current_setting('app.current_barbershop_id', true) = '' OR EXISTS (SELECT 1 FROM client_memberships WHERE id = "membershipId" AND "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid));
CREATE POLICY tenant_isolation ON membership_usages
  USING (current_setting('app.current_barbershop_id', true) = '' OR EXISTS (SELECT 1 FROM client_memberships WHERE id = "membershipId" AND "barbershopId" = current_setting('app.current_barbershop_id', true)::uuid));

ALTER TABLE appointment_deposits FORCE ROW LEVEL SECURITY;
ALTER TABLE appointment_waitlist_entries FORCE ROW LEVEL SECURITY;
ALTER TABLE appointment_waitlist_offers FORCE ROW LEVEL SECURITY;
ALTER TABLE salon_membership_plans FORCE ROW LEVEL SECURITY;
ALTER TABLE membership_benefits FORCE ROW LEVEL SECURITY;
ALTER TABLE client_memberships FORCE ROW LEVEL SECURITY;
ALTER TABLE membership_cycles FORCE ROW LEVEL SECURITY;
ALTER TABLE membership_usages FORCE ROW LEVEL SECURITY;
