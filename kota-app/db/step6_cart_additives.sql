-- Create additives table
create table public.additives (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  stock_quantity integer not null default 0,
  created_at timestamptz default now()
);

-- Create cart items table
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  menu_Items_id bigint references public."Menu_Items"(id) on delete cascade not null,
  additive_ids uuid[] default '{}',
  total_price numeric(10,2) not null,
  quantity integer not null default 1,
  created_at timestamptz default now()
);

-- Enable RLS for the new tables
alter table public.additives enable row level security;
alter table public.cart_items enable row level security;

-- Policies
create policy "Public read additives" on public.additives for select using (true);
create policy "Users manage own cart" on public.cart_items for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Seed data for additives
insert into public.additives (name, price, stock_quantity) values
  ('Egg', 0.50, 100),
  ('Mahotwana + Artchaar', 1.00, 80),
  ('Artchaar + Mince', 0.50, 80),
  ('Polony', 0.50, 90),
  ('Russian sausage', 1.00, 100),
  ('Vienna', 1.00, 100);