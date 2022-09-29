export type TJournalPreviewContext = {
  invoiceId: string | undefined;
  setInvoiceId: (invoiceID: string) => void;
};

export type TJournalPreviewForm = {
  invoiceId: string;
};
