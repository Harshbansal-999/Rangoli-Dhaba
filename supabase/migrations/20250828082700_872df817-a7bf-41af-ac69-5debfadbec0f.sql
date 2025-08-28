-- Remove slug and display_order columns from categories table
ALTER TABLE public.categories DROP COLUMN IF EXISTS slug;
ALTER TABLE public.categories DROP COLUMN IF EXISTS display_order;