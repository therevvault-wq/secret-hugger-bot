create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  amount decimal(10, 2) not null,
  currency text not null default 'INR',
  status text not null default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.payments enable row level security;

-- Policies
create policy "Users can view their own payments"
  on public.payments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own payments"
  on public.payments for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all payments"
  on public.payments for select
  using (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
create trigger update_payments_updated_at
  before update on public.payments
  for each row
  execute function public.update_updated_at_column();
