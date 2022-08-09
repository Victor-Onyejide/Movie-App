import React from "react";

export default function List({ list, loading, setShouldShowModal, setID, setCurrent }) {
    if (loading) {
        return <p>loading....</p>
    }
    return (
        <div className='show-list'>
            {list && list.map((item, index) =>
                <div className='list' key={item.imdbID} onClick={() => { setShouldShowModal(true); setID(item.imdbID); setCurrent(index) }}
                    id={`i${index}`}
                >
                    <span><img src={item.Poster} alt={`${item.Title}`} /></span>
                    <span className='title' id={`${item.imdbID}`}>{item.Title}</span>
                </div>)}
        </div>
    )
}