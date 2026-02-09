import { useState, useEffect } from 'react';
import { useAddAccount, useUpdateAccount } from '../hooks/useAdminMutations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { ManagedAccount } from '@/backend';

interface AccountFormDialogProps {
  account: ManagedAccount | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AccountFormDialog({
  account,
  open,
  onOpenChange,
}: AccountFormDialogProps) {
  const addAccount = useAddAccount();
  const updateAccount = useUpdateAccount();
  const isEditing = !!account;

  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    riskProfile: '',
  });

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name,
        balance: account.balance.toString(),
        riskProfile: account.riskProfile,
      });
    } else {
      setFormData({
        name: '',
        balance: '',
        riskProfile: '',
      });
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accountData: ManagedAccount = {
      id: account?.id || BigInt(0),
      name: formData.name,
      balance: parseFloat(formData.balance),
      riskProfile: formData.riskProfile,
    };

    try {
      if (isEditing) {
        await updateAccount.mutateAsync({ id: account.id, account: accountData });
        toast.success('Account updated successfully');
      } else {
        await addAccount.mutateAsync(accountData);
        toast.success('Account added successfully');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(isEditing ? 'Failed to update account' : 'Failed to add account');
      console.error(error);
    }
  };

  const isPending = addAccount.isPending || updateAccount.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Account' : 'Add New Account'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the account details below.' : 'Enter the account details below.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Account Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Client Account 001"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="balance">Balance</Label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="riskProfile">Risk Profile</Label>
              <Input
                id="riskProfile"
                value={formData.riskProfile}
                onChange={(e) => setFormData({ ...formData, riskProfile: e.target.value })}
                placeholder="e.g., Conservative, Moderate, Aggressive"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update' : 'Add'} Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
