import React, { useRef} from "react";
import { useAppReducer } from '../../hooks/useAppReducer'
import { LoadSearch } from '../../actions'
import searchIcon from './search.png'
import styles from './Search.module.css'

const Search = () => {
    const [ state, dispatch] = useAppReducer();

    const searchRef = useRef(null);

    return (
        <div className={styles.Search}>
            <input ref={searchRef} type="text" style={{ width: 300}}/>
            <button onClick={ () => LoadSearch((searchRef.current as any).value, dispatch)}>
                <img src={searchIcon} width={20} height={20}/>
            </button>
        </div>
    )
}

export default Search;