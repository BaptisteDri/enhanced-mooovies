-- RLS sur public.films : colonne user_id = auth.users.id (type uuid recommandé).
-- Appliquer avec : supabase db push (CLI) ou exécuter ce script dans le SQL Editor du dashboard.

alter table public.films enable row level security;

drop policy if exists "Users can select own films" on public.films;
drop policy if exists "Users can insert own films" on public.films;
drop policy if exists "Users can update own films" on public.films;
drop policy if exists "Users can delete own films" on public.films;

create policy "Users can select own films"
	on public.films
	for select
	to authenticated
	using (auth.uid() = user_id);

create policy "Users can insert own films"
	on public.films
	for insert
	to authenticated
	with check (auth.uid() = user_id);

create policy "Users can update own films"
	on public.films
	for update
	to authenticated
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);

create policy "Users can delete own films"
	on public.films
	for delete
	to authenticated
	using (auth.uid() = user_id);
