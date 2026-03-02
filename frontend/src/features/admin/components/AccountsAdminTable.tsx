import { useState } from 'react';
import { useGetAllAccounts } from '@/features/data/queries';
import { useDeleteAccount } from '../hooks/useAdminMutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AccountFormDialog from './AccountFormDialog';
import type { ManagedAccount } from '@/backend';
import { toast } from 'sonner';

export default function AccountsAdminTable() {
  const { data: accounts, isLoading } = useGetAllAccounts();
  const deleteAccount = useDeleteAccount();
  const [editingAccount, setEditingAccount] = useState<ManagedAccount | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this account?')) return;

    try {
      await deleteAccount.mutateAsync(id);
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error('Failed to delete account');
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Accounts</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : accounts && accounts.length > 0 ? (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Risk Profile</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={Number(account.id)}>
                      <TableCell className="font-semibold">{account.name}</TableCell>
                      <TableCell className="text-right">${account.balance.toFixed(2)}</TableCell>
                      <TableCell>{account.riskProfile}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingAccount(account)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(account.id)}
                            disabled={deleteAccount.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No accounts yet. Add your first account to get started.
            </div>
          )}
        </CardContent>
      </Card>

      <AccountFormDialog
        account={editingAccount}
        open={!!editingAccount || isAddDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditingAccount(null);
            setIsAddDialogOpen(false);
          }
        }}
      />
    </>
  );
}
