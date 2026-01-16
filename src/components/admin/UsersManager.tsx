import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Users, Search, Mail, Calendar, Shield } from 'lucide-react';

interface UserProfile {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
    is_admin?: boolean;
}

export default function UsersManager() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Fetch profiles
            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (profilesError) throw profilesError;

            // Fetch admin roles
            const { data: adminRoles, error: rolesError } = await supabase
                .from('user_roles')
                .select('user_id')
                .eq('role', 'admin');

            if (rolesError) throw rolesError;

            const adminUserIds = new Set(adminRoles?.map(r => r.user_id) || []);

            // Combine data
            const usersWithRoles = (profiles || []).map(profile => ({
                ...profile,
                is_admin: adminUserIds.has(profile.id),
            }));

            setUsers(usersWithRoles);
        } catch (error: any) {
            toast.error('Failed to fetch users');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();
        return (
            user.full_name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query)
        );
    });

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-display text-foreground">Registered Users</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        {users.length} user{users.length !== 1 ? 's' : ''} registered
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {filteredUsers.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                        {searchQuery ? 'No users found matching your search' : 'No registered users yet'}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                        >
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xl font-bold text-muted-foreground">
                                        {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-foreground truncate">
                                        {user.full_name || 'Unnamed User'}
                                    </span>
                                    {user.is_admin && (
                                        <Badge variant="default" className="flex items-center gap-1">
                                            <Shield className="w-3 h-3" />
                                            Admin
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    {user.email && (
                                        <span className="flex items-center gap-1 truncate">
                                            <Mail className="w-3 h-3" />
                                            {user.email}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 flex-shrink-0">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(user.created_at)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
