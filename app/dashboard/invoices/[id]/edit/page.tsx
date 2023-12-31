import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { InvoiceForm } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

interface EditInvoicePageProps {
  params: {
    id: string;
  }
}

export default async function Page({params}: EditInvoicePageProps) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice as InvoiceForm} customers={customers} />
    </main>
  );
}