export type TErrorsModel = {
  message?: string;
  modelState?: TError[];
};

export type TError = {
  property: string;
  errors: string[];
};

/** LPFR Errors */

export enum EXCEPTIONS_SECTIONS {
  SECURE_ELEMENT = 'SECURE_ELEMENT',
  INVOICE_ERRORS = 'INVOICE_ERRORS',
  WARNINGS_ERRORS = 'WARNINGS_ERRORS',
  INFO_ERRORS = 'INFO_ERRORS',
  LOCAL_ERRORS = 'LOCAL_ERRORS',
}

export const EXCEPTIONS = {
  infoErrors_0000_pinOk: {
    type: EXCEPTIONS_SECTIONS.INFO_ERRORS,
    number: '0000',
    label: 'Sve je OK',
    description: 'Komanda je izvršena bez upozorenja i grešaka',
  },

  infoErrors_0100_pinOk: {
    type: EXCEPTIONS_SECTIONS.INFO_ERRORS,
    number: '0100',
    label: 'Pin OK',
    description: 'Ovaj kod označava da je unešeni PIN kod ispravan',
  },

  infoErrors_0210_internetAvailable: {
    type: EXCEPTIONS_SECTIONS.INFO_ERRORS,
    number: '0210',
    label: 'Internet je dostupan',
    description: 'Internet veza je dostupna (opciono)',
  },

  infoErrors_0220_internetUnavailable: {
    type: EXCEPTIONS_SECTIONS.INFO_ERRORS,
    number: '0220',
    label: 'Internet nije dostupan',
    description: 'Internet konekcija nije dostupna (opciono)',
  },

  warningError_1100_storageNearFull: {
    type: EXCEPTIONS_SECTIONS.WARNINGS_ERRORS,
    number: 1100,
    label: 'Skladište je  90% popunjeno',
    description:
      'Skladište koje se  čuvanje paketa za iščitavanje je 90% popunjeno. Vreme je da se izvrši iščitavanje.',
  },

  warningError_1300_smartCardNotPresent: {
    type: EXCEPTIONS_SECTIONS.WARNINGS_ERRORS,
    number: 1300,
    label: 'Pametna kartica nije ubačena',
    description:
      'Kartica sa Bezbednosnim Elementom nije ubačena u čitač kartica.',
  },

  warningError_1400_auditRequired: {
    type: EXCEPTIONS_SECTIONS.WARNINGS_ERRORS,
    number: 1400,
    label: 'Potrebno Iščitavanje',
    description:
      'Ukupna iznos prodaje i refundacije je dostigao 75% limita Bezbednosnog Elementa. Vreme je da uradite iščitavanje  (Internet ili Lokalno).',
  },

  warningError_1500_pinCodeReq: {
    type: EXCEPTIONS_SECTIONS.WARNINGS_ERRORS,
    number: 1500,
    label: 'Unesite PIN kod',
    description: 'Označava da ESIR mora da unese / obezbedi PIN kod. ',
  },

  warningError_1999_undefinedWarning: {
    type: EXCEPTIONS_SECTIONS.WARNINGS_ERRORS,
    number: 1999,
    label: 'Nedefinisano upozorenje',
    description:
      'Nešto nije u redu, ali posebno upozorenje nije definisano za tu situaciju',
  },

  secureElem_2100: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2100,
    label: 'PIN nije OK',
    description: 'PIN kod poslat od strane ESIR-a nije validan. ',
  },

  secureElem_2110_cardLocked: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2110,
    label: 'Kartica je zaključana',
    description:
      'Broj dozvoljenih unosa PIN koda je premašen. Kartica je zaključena za korišćenje. ',
  },

  secureElem_failed_2150: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2150,
    label: 'Neuspešna komanda prema bezbednosnom elementu',
    description:
      'Komanda koju ste zadali nije mogla biti izvršena prema bezbednosnom elementu',
  },

  secureElem_audit_no_valid_2160: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2160,
    label: 'Audit Identification is not valid',
    description: 'Audit Identification is not valid',
  },

  audit_command_failed_2180: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2180,
    label: 'Neuspešno iščitavanje paketa',
    description: 'Komanda za iščitavanje paketa neuspešna',
  },

  audit_proof_command_failed_2180: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2190,
    label: 'Komanda za potvrdu iščitavanja neuspešna',
    description:
      'Nije dobijena potvrda o iščitavanju, iako je LP 20 poslao zahtev za dobijanje potvrde',
  },

  secureElem_2210_seLocked: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2210,
    label: 'Bezbednosni Element Zaključan',
    description:
      'Bezbednosni Element je zaključan. Ne mogu se potpisivati dodatni računi pre završetka iščitavanja. ',
  },

  secureElem_2220_seCommunicationFailed: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2220,
    label: 'Neuspešna komunikacija sa Bezbednosnim Elementom',
    description:
      'Bezbednosni Element ne podržava zahtevanu verziju protokola (rezervisano za kasniju upotrebu).',
  },

  secureElem_2230_seProtocolMismatch: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2230,
    label: 'Neuskladjen protokol Bezbednosnog Elementa ',
    description:
      'L-PFR ne može da se poveže sa apletom Bezbednosnog Elementa. ',
  },

  invoice_2310_invalidTaxLabels: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2310,
    label: 'Nevažeće poreske oznake ',
    description: 'Poreske oznake poslate od strane ESIR-a nisu definisane. ',
  },

  secureElem_2400_notConfig: {
    type: EXCEPTIONS_SECTIONS.SECURE_ELEMENT,
    number: 2400,
    label: 'Nije konfigurisano',
    description:
      'L-PFR nije potpuno konfigurisan za potpisivanje računa. (npr. nedostaju poreske stope ili verifikacioni URL i sl. )',
  },

  invoice_2800_field_required: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2800,
    label: 'Obavezno Polje',
    description: 'Polje je obavezno',
  },
  invoice_2801_valueToLong: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2801,
    label: 'FPredugačka vrednost polja',
    description: 'Predugačka vrednost polja',
  },
  invoice_2802_valueToShort: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2802,
    label: 'Prekratka vrednost polja',
    description: 'Dužina vrednosti polja je kraća od očekivane',
  },
  invoice_2803_invalidLength: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2803,
    label: 'Nevažeća dužina polja',
    description: 'Dužina vrednosti polja  je kraća ili duža od očekivane',
  },
  invoice_2804_outOfRange: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2804,
    label: 'Polje izvan očekivanog opsega',
    description: 'Vrednost polja izvan očekivanog opsega',
  },
  invoice_2805_invalidValue: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2805,
    label: 'Nevažeća vrednost polja',
    description: 'Polje sadrži nevažeću vrednost',
  },
  invoice_2806_invalidDataFormat: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2806,
    label: 'Nevažeći format podataka ',
    description: 'Format podataka je nevažeći',
  },
  invoice_2807_listToShort: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2807,
    label: 'Lista prekrakta',
    description:
      'Lista predmeta ili lista poreskih oznaka u zahtevu za izradu računa ne sadrži barem jedan element (predmet/oznaku).',
  },
  invoice_2808_listToLong: {
    type: EXCEPTIONS_SECTIONS.INVOICE_ERRORS,
    number: 2808,
    label: 'Lista predugačka',
    description:
      'Lista predmeta ili lista poreskih oznaka u zahtevu za izradu računa premašuje maksimalno dozvoljeni broj elemenata (predmeta/oznaka) ili veličinu. Maksimalne vrednosti zavise od kapaciteta PFR-a za procesuiranje zahteva za račun i može biti specifično od proizvodjača.',
  },
  localError_80100_taxNotDefined: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 80100,
    label: 'Tax not defined ',
    description: 'Poreske stope nisu definisane ',
  },
  localError_80200_itemTaxInvalid: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 80200,
    label: 'Poreska stopa nije definisana ',
    description: 'Za pojedine artikle nije validna taksa ',
  },
  localError_80300_pathIsNotValid: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 80300,
    label: 'Path is not valid ',
    description: 'Nevažeća putanja prilikom izvoza fajlova ',
  },
  localError_80400_LPFRNotFound: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 80400,
    label: 'LPFR nije pronadjen ',
    description:
      'Doslo je do uklanjanja .exe fajla ili drugih sistemskih fajlova ',
  },
  localError_12000_LPFRisNotAlive: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 12000,
    label: 'LPFR nije uključen',
    description: 'Nije pokrenut LPFR ',
  },
  localError_13000_LPFRUnknownError: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 13000,
    label: 'NEPOZNATA GREŠKA',
    description: 'Došlo je do nepoznate / nedefinisane greške ',
  },
  localError_90100_ntpFailedTimeDiff: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 90100,
    label: 'NTP razlika vremena prevelika',
    description:
      'Prevelika razlika izmedju lokalnog  vremena i vremena NTP servera  ',
  },
  localError_90200_prev_Receipt_Time: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 90200,
    label: 'Nedoslednost vremena računa',
    description:
      'Prethodni račun koji je izdat je stariji od računa koji pokušavate da izdate',
  },
  localError_90300_not_valid_license: {
    type: EXCEPTIONS_SECTIONS.LOCAL_ERRORS,
    number: 90300,
    label: 'Licenca nije validna',
    description: 'Postoji problem sa Vašom licencom, ili je licenca istekla',
  },
};
