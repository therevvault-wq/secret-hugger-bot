-- Add admin role to therevvault@gmail.com
-- This will set the admin role for the specified email address

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'therevvault@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
