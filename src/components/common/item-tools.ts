import firebase from 'firebase';
import { format } from 'date-fns';

type HumanDateOptions = {
  slashes?: boolean;
  noYear?: boolean;
};
const defaultHumanDateOptions: HumanDateOptions = {
  slashes: false,
  noYear: false,
};

export const getHumanDate = (
  timestamp: firebase.firestore.Timestamp | null,
  options?: HumanDateOptions,
) => {
  const opts = { ...defaultHumanDateOptions, ...options };
  let dateText = '';

  if (!timestamp) return dateText;
  if (opts.noYear) {
    dateText = format(timestamp.toDate(), 'M月d日');
  } else {
    dateText = format(timestamp.toDate(), 'yyyy年M月d日');
  }
  if (opts.slashes) {
    dateText = dateText.replace(/[年月日]/g, '/').replace(/\/$/, '');
  }

  return dateText;
};
