import { useState } from 'react';
import { Donation } from '@/types';
import { mockDonations } from '@/data/mockData';
import DonationsList from './DonationsList';
import DonationForm from './DonationForm';

export default function Donations() {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [showForm, setShowForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

  const handleAddDonation = (donationData: Omit<Donation, 'id'>) => {
    const newDonation: Donation = {
      ...donationData,
      id: Date.now().toString(),
    };
    setDonations(prev => [newDonation, ...prev]);
    setShowForm(false);
  };

  const handleEditDonation = (donation: Donation) => {
    setEditingDonation(donation);
    setShowForm(true);
  };

  const handleDeleteDonation = (id: string) => {
    setDonations(prev => prev.filter(d => d.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingDonation(null);
  };

  if (showForm) {
    return (
      <DonationForm
        onSubmit={handleAddDonation}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <DonationsList
      donations={donations}
      onAddNew={() => setShowForm(true)}
      onEdit={handleEditDonation}
      onDelete={handleDeleteDonation}
    />
  );
}