import { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data';

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // Storing data to firebase and only once !
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  // fetch the data from firestore
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoriesAndDocuments();
      setCategoriesMap(data);
    };

    fetchData();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
