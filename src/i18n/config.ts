import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Dashboard",
      "donations": "Donations",
      "collections": "Collections",
      "expenses": "Expenses",
      "flats": "Flats",
      "fixed_expenses": "Fixed Expenses",
      
      // Common
      "add": "Add",
      "edit": "Edit",
      "delete": "Delete",
      "save": "Save",
      "cancel": "Cancel",
      "search": "Search",
      "actions": "Actions",
      "date": "Date",
      "amount": "Amount",
      "total": "Total",
      "view": "View",
      "language": "Language",
      "logout": "Logout",
      
      // Login
      "login": "Login",
      "username": "Username",
      "password": "Password",
      "signin": "Sign In",
      "welcome": "Welcome to Temple Management",
      "login_subtitle": "Please sign in to continue",
      
      // Dashboard
      "total_donations": "Total Donations",
      "total_collections": "Total Collections",
      "total_expenses": "Total Expenses",
      "net_balance": "Net Balance",
      "monthly_donations": "Monthly Donations",
      "monthly_collections": "Monthly Collections",
      "monthly_expenses": "Monthly Expenses",
      "active_flats": "Active Flats",
      "recent_transactions": "Recent Transactions",
      
      // Donations
      "add_donation": "Add Donation",
      "donor_name": "Donor Name",
      "purpose": "Purpose",
      "payment_method": "Payment Method",
      "flat_number": "Flat Number",
      "phone": "Phone",
      "email": "Email",
      "notes": "Notes",
      "select_flat": "Select Flat",
      "cash": "Cash",
      "online": "Online",
      "cheque": "Cheque",
      
      // Flats
      "add_flat": "Add Flat",
      "flat_number_label": "Flat Number",
      "owner_name": "Owner Name",
      "membership_fee": "Membership Fee",
      "last_payment": "Last Payment",
      "status": "Status",
      "active": "Active",
      "inactive": "Inactive",
      "pending": "Pending",
      
      // Fixed Expenses
      "add_fixed_expense": "Add Fixed Expense",
      "title": "Title",
      "frequency": "Frequency",
      "category": "Category",
      "start_date": "Start Date",
      "end_date": "End Date",
      "monthly": "Monthly",
      "quarterly": "Quarterly",
      "yearly": "Yearly",
      
      // Date Filter
      "filter_by_date": "Filter by Date",
      "from_date": "From Date",
      "to_date": "To Date",
      "apply_filter": "Apply Filter",
      "clear_filter": "Clear Filter"
    }
  },
  hi: {
    translation: {
      // Navigation
      "dashboard": "डैशबोर्ड",
      "donations": "दान",
      "collections": "संग्रह",
      "expenses": "व्यय",
      "flats": "फ्लैट",
      "fixed_expenses": "निश्चित व्यय",
      
      // Common
      "add": "जोड़ें",
      "edit": "संपादित करें",
      "delete": "हटाएं",
      "save": "सेव करें",
      "cancel": "रद्द करें",
      "search": "खोजें",
      "actions": "कार्य",
      "date": "दिनांक",
      "amount": "राशि",
      "total": "कुल",
      "view": "देखें",
      "language": "भाषा",
      "logout": "लॉगआउट",
      
      // Login
      "login": "लॉगिन",
      "username": "उपयोगकर्ता नाम",
      "password": "पासवर्ड",
      "signin": "साइन इन",
      "welcome": "मंदिर प्रबंधन में आपका स्वागत है",
      "login_subtitle": "कृपया जारी रखने के लिए साइन इन करें",
      
      // Dashboard
      "total_donations": "कुल दान",
      "total_collections": "कुल संग्रह",
      "total_expenses": "कुल व्यय",
      "net_balance": "शुद्ध बैलेंस",
      "monthly_donations": "मासिक दान",
      "monthly_collections": "मासिक संग्रह",
      "monthly_expenses": "मासिक व्यय",
      "active_flats": "सक्रिय फ्लैट",
      "recent_transactions": "हाल के लेन-देन",
      
      // Donations
      "add_donation": "दान जोड़ें",
      "donor_name": "दाता का नाम",
      "purpose": "उद्देश्य",
      "payment_method": "भुगतान विधि",
      "flat_number": "फ्लैट नंबर",
      "phone": "फोन",
      "email": "ईमेल",
      "notes": "टिप्पणी",
      "select_flat": "फ्लैट चुनें",
      "cash": "नकद",
      "online": "ऑनलाइन",
      "cheque": "चेक",
      
      // Flats
      "add_flat": "फ्लैट जोड़ें",
      "flat_number_label": "फ्लैट नंबर",
      "owner_name": "मालिक का नाम",
      "membership_fee": "सदस्यता शुल्क",
      "last_payment": "अंतिम भुगतान",
      "status": "स्थिति",
      "active": "सक्रिय",
      "inactive": "निष्क्रिय",
      "pending": "लंबित",
      
      // Fixed Expenses
      "add_fixed_expense": "निश्चित व्यय जोड़ें",
      "title": "शीर्षक",
      "frequency": "आवृत्ति",
      "category": "श्रेणी",
      "start_date": "प्रारंभ दिनांक",
      "end_date": "समाप्ति दिनांक",
      "monthly": "मासिक",
      "quarterly": "त्रैमासिक",
      "yearly": "वार्षिक",
      
      // Date Filter
      "filter_by_date": "दिनांक के अनुसार फ़िल्टर करें",
      "from_date": "से दिनांक",
      "to_date": "तक दिनांक",
      "apply_filter": "फ़िल्टर लागू करें",
      "clear_filter": "फ़िल्टर साफ़ करें"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;