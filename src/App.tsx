import React, { useReducer, useEffect } from 'react';
import { AppReducer, initState } from './reducer'
import { AppReducerContext } from './hooks/useAppReducer'
import { initPage, LoadPages } from './actions'
import ListView from './Components/ListView/ListView'
import PageControl from './Components/PageControl/PageControl'
import Search from './Components/Search/Search';
import styles from './App.module.css'

function App() {
  const reducer = useReducer(AppReducer, initState());
  const [state, dispatch] = reducer;

  useEffect( () => {
    dispatch(initPage());
  }, [])

  useEffect( () => {
    if (state.needLoadPageNums && state.needLoadPageNums.length > 0) {
      LoadPages(state.needLoadPageNums, dispatch);
    }
  }, [state.needLoadPageNums])

  return (
    <AppReducerContext.Provider value={reducer}>
      <div className={styles.Control}>
        <PageControl/>
        <Search/>
      </div>
      
      <div className={styles.Items}>
        <ListView/>
      </div>
    </AppReducerContext.Provider>
  );
}

export default App;
