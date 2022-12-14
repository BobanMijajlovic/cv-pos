export const Translate = {
  /** ERRORS */
  TR_UNKNOWN_ERROR: 'Unknown Error',
  TR_VALIDATION_PIB_NOT_VALID: 'Pib nije dobar',
  TR_VALIDATION_RECEIPT_NUM_NOT_VALID: 'Broj nije dobar',
  TR_VALIDATION_JMBG_NOT_VALID: 'JMBG nije dobar',
  TR_VALIDATION_ID_NOT_VALID: 'Br. lične karte nije dobar',
  TR_VALIDATION_NOT_VALID: 'Podaci nisu ispravni',
  TR_VALIDATION_REQUIRED: 'Obavezno polje',
  TR_VALIDATION_ARTICLE_VATS: 'Obavezan odabir bar jedne takse',
  TR_VALIDATION_BARCODE_NOT_VALID: 'Bar code nije validan',
  TR_VALIDATION_PRICE_NOT_VALID: 'Cena nije validna',
  TR_VALIDATION_DESC_NOT_VALID: 'Naziv nije validan ( min 3 karaktera )',
  TR_VALIDATION_PIN_NOT_VALID: 'Pin nije odgovarajuće dužine',
  TR_VALIDATION_UNIQUE_COMPANY_NUMBER_NOT_VALID: 'MB nije odgovarajuće dužine',
  TR_VALIDATION_ZIP_CODE_NOT_VALID: 'Poštanski br. nije dobar',
  TR_VALIDATION_PORT_NOT_VALID: 'Port nije odgovarajuće dužine',
  TR_VALIDATION_SELECT_ONE_TYPE: 'IZABRATI JEDNU OPCIJU',

  TR_PLEASE_WAIT_TEXT: 'Sacekajte',

  /** ITEM */
  TR_INPUT_SEARCH_PLACEHOLDER: 'PRETRAGA',
  TR_LIST_ITEM_EMPTY_LABEL: 'NISMO PRONAŠLI REZULTATE PRETRAGE.',
  TR_ITEMS_PAGE_TITLE: 'ARTIKLI',
  TR_ITEM_DEFINE_PAGE_LABEL_NEW: 'NOVI ARTIKL',
  TR_ITEM_DEFINE_PAGE_LABEL_UPDATE: 'IZMENA ARTIKLA',
  TR_ITEM_LABEL_BAR_CODE: 'Bar code',
  TR_ITEM_LABEL_PRICE: 'Cena',
  TR_ITEM_LABEL_DESCRIPTION: 'Naziv',
  TR_ITEM_LABEL_VAT: 'P. Stopa',
  TR_ITEM_LABEL_MEASURE: 'J. Mere',
  TR_ITEM_LABEL_BUTTON_SAVE: 'Potvrdi',
  TR_ITEM_LABEL_BUTTON_ADD: 'Dodaj',
  TR_ITEM_LABEL_BUTTON_UPDATE: 'Izmeni',
  TR_DASHBOARD_PAGE_TITLE: 'HWT POS',
  TR_DASHBOARD_BUTTON_LABEL_RECEIPT: 'RAČUN',
  TR_DASHBOARD_BUTTON_LABEL_ARTICLES: 'ARTIKLI',
  TR_DASHBOARD_BUTTON_LABEL_SETTINGS: 'PODEŠAVANJA',
  TR_DASHBOARD_BUTTON_LABEL_DAILY_REPORT: 'DNEVNI IZVEŠTAJI',
  TR_DASHBOARD_BUTTON_LABEL_SALES_PANEL: 'PRODAJNI PANELI',
  TR_DASHBOARD_BUTTON_LABEL_CARD_LOCK: 'SIGURNOSNI ELEMENT',
  TR_DASHBOARD_PAGE_INIT_ESDC_TITLE: 'INICIJALIZACIJA',
  TR_DASHBOARD_BUTTON_LABEL_CLIENTS: 'KUPCI',
  TR_DASHBOARD_BUTTON_LABEL_JOURNAL_PREVIEW: 'PREGLED RAČUNA',
  TR_ITEM_DEFINITION_VATS: 'Poreske stope',
  TR_DASHBOARD_JOURNAL_PREVIEW_TITLE: 'Pregled računa',

  /**  TOAST */
  TR_TOAST_SUCCESS_TITLE: 'Uspešno',
  TR_TOAST_ERROR_TITLE: 'Greška',
  TR_TOAST_ERROR_CONFIRM_BUTTON: 'U redu',

  /** RECEIPT */
  TR_RECEIPT_REFUND_FORM_NAV_NAME: 'POVRAĆAJ',
  TR_RECEIPT_LIST_EMPTY_LABEL: 'RAČUN JE PRAZAN',
  TR_RECEIPT_PAGE_TITLE: 'RAČUN',
  TR_RECEIPT_TYPE_LABEL: 'TIP RAČUNA',
  TR_RECEIPT_TOTAL_LABEL: 'UKUPNO',
  TR_RECEIPT_PAYING_LABEL: 'PLAĆANJE',
  TR_RECEIPT_PAYING_PAGE_TITLE: 'PLAĆANJE',
  TR_RECEIPT_PAYING_FINISH_BUTTON_LABEL: 'ZAVRŠI',
  TR_RECEIPT_PAYING_TOTAL_LABEL: 'ZA UPLATU ',
  TR_RECEIPT_PAYING_PAYED_LABEL: 'PLAĆENO ',
  TR_RECEIPT_TYPE_REFUND_LABEL: 'POVRAĆAJ',
  TR_RECEIPT_TYPE_ADVANCE_LABEL: 'AVANS',
  TR_RECEIPT_TYPE_PROFORMA_LABEL: 'PROFAKTURA',
  TR_RECEIPT_TYPE_SALE_LABEL: 'PRODAJA',
  TR_RECEIPT_TYPE_SALE_TRAFFIC_LABEL: 'PROMET',
  TR_RECEIPT_CLIENT_TYPE_LABEL: 'TIP KLIJENTA',
  TR_RECEIPT_CLIENT_TYPE: 'Tip klijenta: ',
  TR_RECEIPT_CLIENT_DATA: 'PODACI O KLIJENTU',
  TR_RECEIPT_REFUND_DATA: 'PODACI O RAČUNU',
  TR_RECEIPT_CLIENT_OPTIONAL_DATA_LABEL: 'OPCIONI PODACI',
  TR_RECEIPT_CLIENT_OPTIONAL_DATA_VALUE_LABEL: 'OPCIONI PODACI VREDNOST',
  TR_RECEIPT_CLIENT_OPTIONAL_DATA_TYPE: 'Tip opcionih podataka',
  TR_RECEIPT_ACTION_SHEET_TITLE: 'AKCIJE',
  TR_RECEIPT_ACTION_SHEET_CHANGE_QTY_LABEL: 'IZMENI KOLICINU',
  TR_RECEIPT_ACTION_SHEET_DISCOUNT_LABEL: 'POPUST',
  TR_RECEIPT_ACTION_SHEET_CANCEL_LABEL: 'OTKAZI',
  TR_RECEIPT_SEARCH_SALE_PAGE_TITLE: 'PRETRAGA ARTIKALA',
  TR_RECEIPT_SEARCH_SALE_BUTTON_LABEL: 'PRODAJ',
  TR_RECEIPT_SEARCH_SALE_QTY_TITLE: 'DODAJ KOLICINU',
  TR_RECEIPT_CHANGE_QTY_BUTTON_LABEL: 'POTVRDI',
  TR_RECEIPT_NUMBER: 'BROJ RAČUNA',
  TR_RECEIPT_CLIENT_FORM: '',
  TR_RECEIPT_CLIENT_FORM_TYPE_LABEL: 'Tip',
  TR_RECEIPT_CLIENT_FORM_TIN_LABEL: 'PIB',
  TR_RECEIPT_CLIENT_FORM_MB_LABEL: 'MB',
  TR_RECEIPT_CLIENT_FORM_JMBG_LABEL: 'JMBG',
  TR_RECEIPT_CLIENT_FORM_ID_LABEL: 'BROJ LIČNE KARTE',
  TR_RECEIPT_CLIENT_FORM_OTHER_LABEL: 'OSTALO',
  TR_RECEIPT_HEADER_RECEIPT_DATA: 'PODACI O RAČUNU:',
  TR_RECEIPT_FOOTER_RECEIPT_TYPE: 'TIP RAČUNA:',
  TR_RECEIPT_POPOVER_HEADER: 'Izaberi tip',
  TR_RECEIPT_POPOVER_TRANSACTION_TYPE: 'Tip transakcije',
  TR_RECEIPT_POPOVER_INVOICE_TYPE: 'Tip računa',
  TR_RECEIPT_INFO_CLIENT_DATA: 'Podaci o klijentu',
  TR_RECEIPT_INFO_OPTIONAL_DATA: 'Opcioni podaci klijenta',
  TR_RECEIPT_INFO_REFUND_DATA: 'Podaci o povraćaju',
  TR_RECEIPT_INFO_RECEIPT_NUMBER: 'BROJ RAČUNA:',
  TR_RECEIPT_INFO_REFUND_DATE: 'DATUM I VREME:',
  TR_RECEIPT_INFO_ADVANCE_DATA: 'Podaci o avansu',
  TR_RECEIPT_INFO_ADVANCE_RECEIPT_DATA: 'Vezani avansni racun',
  TR_RECEIPT_INFO_ADVANCE_RECEIPT_FINANCE: 'IZNOS RAČUNA:',
  TR_RECEIPT_INFO_RECEIPT_AMOUNT: 'VREDNOST: ',
  TR_RECEIPT_REFUND_DATE_TIME_LABEL: 'DATUM I VREME',
  TR_RECEIPT_FORM_TITLE: 'PODACI O RAČUNU',
  TR_RECEIPT_INFO_TIN_LABEL: 'PIB: ',
  TR_RECEIPT_INFO_UNIQUE_COMPANY_NUMBER_LABEL: 'MB: ',
  TR_RECEIPT_INFO_ZIP_CODE_LABEL: 'Poštanski broj: ',
  TR_RECEIPT_NO_ITEMS: 'Nema izabranih artikala za račun',
  TR_RECEIPT_NO_PAYMENTS: 'Nema izabranih plaćnja za račun',
  TR_RECEIPT_DISCOUNT_PAGE_TITLE: 'Popust',

  /** user */
  TR_USER_PAGE_TITLE: 'KASIRI',
  TR_USER_DEFINE_PAGE_LABEL_NEW: 'NOVI KASIR',
  TR_USER_DEFINE_PAGE_LABEL_UPDATE: 'IZMENA KASIRA',
  TR_USER_LABEL_FULL_NAME: 'IME I PREZIME',
  TR_USER_LABEL_NICK_NAME: 'KORISNIČKO IME',
  TR_USER_LABEL_PIN: 'PIN',
  TR_USER_LABEL_PRIORITY: 'TIP PROFILA',
  TR_LOCK_PAGE_TITLE: 'HWT POS',
  TR_LOGOUT_PAGE_TITLE: 'ODJAVI SE',
  TR_USER_PRIORITY_CASHIER_LABEL: 'Kasir',
  TR_USER_PRIORITY_ADMIN_LABEL: 'Admin',
  TR_USER_PRIORITY_SUPER_ADMIN_LABEL: 'Super Admin',
  TR_USER_POPOVER_PREVIEW_DATA: 'Informacije o korisniku',
  TR_USER_POPOVER_PREVIEW_USER_NAME_LABEL: 'Korisničko ime',
  TR_USER_POPOVER_PREVIEW_NAME_AND_LAST_NAME_LABEL: 'Ime i prezime',
  TR_USER_POPOVER_PREVIEW_TYPE: 'Tip',

  /** lock screen */
  TR_LOCK_SCREEN_TITLE: 'Unesite Vaš PIN',

  /** security card */
  TR_CARD_LOCK_SCREEN_TITLE: 'Unesite PIN Vašeg sigurnosnog elementa',

  /** settings */
  TR_SETTINGS_TAB_VATS_LABEL: 'Stope',
  TR_SETTINGS_TAB_ABOUT_LABEL: 'O nama',
  TR_SETTINGS_TAB_ABOUT_SOFTWARE_PART_HEADER: 'O softveru',
  TR_SETTINGS_TAB_ABOUT_HARDWARE_PART_HEADER: 'O uređaju',
  TR_SETTINGS_TAB_ABOUT_IP_ADDRESS_LABEL: 'Ip adresa uređaja',
  TR_SETTINGS_TAB_ABOUT_MANUFACTURER_LABEL: 'Proizvođač',
  TR_SETTINGS_TAB_ABOUT_SERIAL_NUMBER_LABEL: 'Serijski broj',
  TR_SETTINGS_TAB_ABOUT_SOFTWARE_VERSION_LABEL: 'Verzija softvera',
  TR_SETTINGS_TAB_SERVER_LABEL: 'Server',
  TR_SETTINGS_TAB_CASHIERS_LABEL: 'Kasiri',
  TR_SETTINGS_VALID_TAX_LABEL: 'Validne poreske stope',
  TR_SETTINGS_SERVER_INPUT_PORT_LABEL: 'Port',
  TR_SETTINGS_SERVER_HEADER_LABEL: 'LPFR podešavanja',

  /** server */
  TR_SERVER_LABEL_ENV: 'Okruženje',
  TR_SERVER_LABEL_NAME: 'Ime LPFR-a',
  TR_SERVER_LABEL_PROTOCOL: 'Tip protokola',
  TR_SERVER_LABEL_IP_ADDRESS: 'Ip adresa',
  TR_SERVER_LABEL_PORT: 'Port',

  /** clients */
  TR_CLIENTS_DEFINE_PAGE_LABEL_NEW: 'NOVI KUPAC',
  TR_CLIENTS_DEFINE_PAGE_LABEL_UPDATE: 'IZMENA KUPAC',
  TR_CLIENTS_LABEL_NAME: 'Naziv',
  TR_CLIENTS_LABEL_PIB: 'PIB:',
  TR_CLIENTS_LABEL_UNIQUE_COMPANY_NUMBER: 'MB:',
  TR_CLIENTS_LABEL_CITY: 'Grad:',
  TR_CLIENTS_LABEL_STREET: 'Ulica i broj:',
  TR_CLIENTS_LABEL_ZIP_CODE: 'Poštanski broj:',
  TR_CLIENTS_SEARCH_SALE_PAGE_TITLE: 'Pretraga klijenata',

  /** modal */
  TR_HIDE_MODAL: 'ZATVORI',
  TR_SUBMIT_MODAL: 'ZAVRŠI',

  /** date time picker */
  TR_DATE_TITLE: 'Izaberite datum: ',
  TR_DATE_TIME_TITLE: 'Izaberite datum i vreme: ',
  TR_CONFIRM_TEXT: 'Potvrdi',
  TR_CANCEL_TEXT: 'Odustani',

  /** Daily Report */
  TR_CHOOSE_DATE: 'Izaberi datum za prikaz: ',
  TR_NO_REPORT: 'Nema izvestaja za izabrani dan',
  TR_TOTAL: 'Total #',
  TR_VATS_HEADER: 'Vats',
  TR_PAYMENTS_HEADER: 'Payments',
  TR_TRANSACTION_TYPE_HEADER: 'Tip transakcije: ',

  /** Payments footer */
  TR_INVOICE_TYPE_NORMAL: 'PROMET',
  TR_INVOICE_TYPE_PROFORMA: 'PREDRAČUN',
  TR_INVOICE_TYPE_COPY: 'KOPIJA',
  TR_INVOICE_TYPE_TRAINING: 'OBUKA',
  TR_INVOICE_TYPE_ADVANCE: 'AVANS',

  TR_TRANSACTION_TYPE_SALE: 'PRODAJA',
  TR_TRANSACTION_TYPE_REFUND: 'POVRAĆAJ',
  PAYMENTS_BUTTON_OTHER_LABEL: 'OSTALO',

  /** Finish Receipt */
  TR_FINISH_RECEIPT_TRANSACTION_TYPE: 'Tip transkacije: ',
  TR_FINISH_RECEIPT_INVOICE_TYPE: 'Tip računa: ',
  TR_FINISH_RECEIPT_PAYING_TOTAL_LABEL: 'UKUPNO',
  TR_FINISH_RECEIPT_PAYING_PAYED_LABEL: 'UPLAĆENO',
  TR_FINISH_RECEIPT_PAYING_CHANGE_LABEL: 'KUSUR',
  TR_FINISH_RECEIPT_PAYING_ADVANCE_LABEL: 'AVANS',
  TR_FINISH_RECEIPT_LABEL_BUTTON_SUBMIT: 'ZAVRŠI',
  TR_FINISH_RECEIPT_LABEL_BUTTON_CANCEL: 'PONIŠTI',
  TR_FINISH_RECEIPT_HEADER_CLIENT_PART: 'Podaci o klijentu',
  TR_FINISH_RECEIPT_LOADING_TEXT: 'Fiskalizacija...',

  /** Paying by type */
  TR_PAYING_BY_TYPE_LABEL_CASH_BUTTON: 'GOTOVINA',
  TR_PAYING_BY_TYPE_LABEL_CARD_BUTTON: 'KARTICA',
  TR_PAYING_BY_TYPE_LABEL_CHECK_BUTTON: 'ČEK',
  TR_PAYING_BY_TYPE_LABEL_VOUCHER_BUTTON: 'VAUČER',
  TR_PAYING_BY_TYPE_LABEL_WIRE_TRANSFER_BUTTON: 'PRENOS',
  TR_PAYING_BY_TYPE_LABEL_MOBILE_MONEY_BUTTON: 'INSTANT',
  TR_PAYING_BY_TYPE_LABEL_OTHER_BUTTON: 'DRUGO',

  /** Client type */
  TR_CLIENT_TYPE_LABEL_PIB: 'PIB',
  TR_CLIENT_TYPE_LABEL_JMBG: 'JMBG',
  TR_CLIENT_TYPE_LABEL_BRLK: 'BROJ LIČNE KARTE',
  TR_CLIENT_TYPE_LABEL_BRIL: 'BRIL',
  TR_CLIENT_TYPE_LABEL_EBS: 'EBS',
  TR_CLIENT_TYPE_LABEL_BRPD: 'BRPD',
  TR_CLIENT_TYPE_LABEL_BRDL: 'BRDL',
  TR_CLIENT_TYPE_LABEL_BRLKMKD: 'BRLKMKD',
  TR_CLIENT_TYPE_LABEL_BRLKMNE: 'BRLKMNE',
  TR_CLIENT_TYPE_LABEL_BRLKALB: 'BRLKALB',
  TR_CLIENT_TYPE_LABEL_BRLKBIH: 'BRLKBIH',
  TR_CLIENT_TYPE_LABEL_TIN: 'TIN',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_ZPPPDV: 'ZPPPDV',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_BROOR: 'BROOR',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_SNPDV: 'SNPDV',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_LNPDV: 'LNPDV',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_PPOPDV: 'PPOPDV',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_ZPPOPDV: 'ZPPOPDV',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_MPPOPDV: 'MPPOPDV',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_IPPOPDV: 'IPPOPDV',
  TR_CLIENT_OPTIONAL_DATA_TYPE_LABEL_BRV: 'BRV',

  /** REFUND part */
  TR_REFUND_PART_HEADER: 'Podaci o povraćaju',
  TR_REFUND_PART_LABEL_RECEIPT_NUMBER: 'Broj računa',
  TR_REFUND_PART_LABEL_RECEIPT_DATE: 'Vreme izdavanja računa',

  /** Advance part */
  TR_ADVANCE_PART_HEADER: 'Podaci o avansu',
  TR_ADVANCE_PART_LABEL_RECEIPT_NUMBER: 'Broj računa',

  /** JOURNAL PREVIEW */
  TR_JOURNAL_PREVIEW_ID_INPUT_LABEL: 'Broj računa',

  /** INIT ESDC */
  TR_INIT_ESDC_TEXT: 'Konfiguracija LPFR-a.',
  TR_INIT_ESDC_ERROR_TITLE:
    'Konfiguracija LPFR-a nije uspela. Pokušajte ponovo.',
  TR_INIT_ESDC_SUCCESS_TITLE: 'Konfiguracija LPFR-a završna.',
  TR_INIT_ESDC_BUTTON_LABEL: 'Konfigurisi',
} as any;
