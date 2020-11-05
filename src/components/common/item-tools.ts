import firebase from 'firebase';
import { format } from 'date-fns';

type HumanDateOptions = {
  slashes?: boolean;
  noYear?: boolean;
  noTime?: boolean;
};
const defaultHumanDateOptions: HumanDateOptions = {
  slashes: false,
  noYear: false,
  noTime: false,
};

export const getHumanDate = (
  timestamp: firebase.firestore.Timestamp | null,
  options?: HumanDateOptions,
) => {
  const opts = { ...defaultHumanDateOptions, ...options };
  let dateText = '';
  let formatText = 'yyyy年M月d日H時m分';

  if (!timestamp) return dateText;

  if (opts.noYear) {
    formatText = formatText.replace('yyyy年', '');
  }

  if (opts.noTime) {
    formatText = formatText.replace('h時m分', '');
  }

  dateText = format(timestamp.toDate(), formatText);

  if (opts.slashes) {
    dateText = dateText
      .replace('日', ' ')
      .replace(/[年月]/g, '/')
      .replace('時', ':')
      .replace(/\/$/, '')
      .replace(/\s$/, '');
  }

  return dateText;
};
