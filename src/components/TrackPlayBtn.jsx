import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { myContext } from '../App';
function TrackPlayBtn() {
    const { setShowPlayModal } = useContext(myContext)
    function playHandler () {
        setShowPlayModal(true)
    }
  return (
    <button className="w-[50px] aspect-square  rounded-full flex items-center justify-center bg-[#1ed760]" onClick={playHandler}>
      <FontAwesomeIcon icon={faPlay} className="text-primary" />
    </button>
  );
}

export default TrackPlayBtn
