import { differenceInDays, format, formatDistance, parseISO } from "date-fns";

import { zonedTimeToUtc } from "date-fns-tz";

function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });

  return formatter.format(amount);
}

function formatYYYYMMDD(date) {
  if (!date) {
    return null;
  }
  return format(toISO(date), "yyy-MM-dd");
}

function formatMonthDD(date) {
  return format(toISO(date), "MMMM d");
}

function distanceInWordsFromNow(dateString) {
  const utcDate = zonedTimeToUtc(dateString, "UTC");

  return formatDistance(utcDate, new Date(), {
    addSuffix: true,
    includeSeconds: true
  });
}

function totalNights(from, to) {
  return differenceInDays(toISO(to), toISO(from));
}

function toISO(date) {
  if (typeof date === "string") {
    return parseISO(date);
  }
  return date;
}

const CompanyLogoPlaceholder = ({ companyName }) => {
  const initials = companyName.split(' ').slice(0, 2).map(word => word[0]).join('');
  return (
    <div style={{ width: '60px', height: '60px', backgroundColor: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
      {initials}
    </div>
  );
};


export {
  formatCurrency,
  formatYYYYMMDD,
  formatMonthDD,
  distanceInWordsFromNow,
  totalNights,
  CompanyLogoPlaceholder
};

