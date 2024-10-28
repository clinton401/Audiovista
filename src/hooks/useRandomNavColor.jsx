import {useEffect, useState, useContext} from 'react';
import {myContext} from '../App'

function useRandomNavColor(id = "1") {
  
  const [chosenNavColor, setChosenNavColor] = useState([]);
  
  const {navColors} = useContext(myContext);

    useEffect(()=> {
        const randomNavColorNumber = Math.floor(Math.random() * navColors.length)
    setChosenNavColor(navColors[randomNavColorNumber]);
      }, [id]);
  return chosenNavColor
}

export default useRandomNavColor
