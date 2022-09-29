import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {TJournalPreviewContext} from 'src/screens/journalPreview/d';

export const JournalPreviewContext = createContext(
  {} as TJournalPreviewContext,
);

const JournalPreviewContextContainer = ({children}: {children: ReactNode}) => {
  const [invoiceId, setInvoiceId] = useState();

  const data = useMemo(
    () => ({invoiceId, setInvoiceId}),
    [invoiceId, setInvoiceId],
  );

  useEffect(() => {
    console.log(invoiceId);
  }, [invoiceId]);

  return (
    <JournalPreviewContext.Provider value={data}>
      {children}
    </JournalPreviewContext.Provider>
  );
};

export default JournalPreviewContextContainer;
