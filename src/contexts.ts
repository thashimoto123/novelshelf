import firebase from 'firebase/app';
import { createContext } from 'react';
import novelshelfTheme from './theme';

type FirebaseContextValue = {
  db: firebase.firestore.Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextValue>({
  db: null,
});

export const ThemeContext = createContext(
  (null as unknown) as typeof novelshelfTheme,
);
