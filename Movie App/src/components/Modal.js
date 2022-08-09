import React, { useEffect, useState } from "react";
import useFetch from 'use-http';

const KEY = "&apikey=a1c05d99";
const HOST = 'http://www.omdbapi.com'
export default function Modal({ shouldShow, onRequestClose, id, position, setPosition, list_len, newId }) {

  const { loading, response, get } = useFetch(HOST)
  const [details, setDetails] = useState({})


  let search_title = `?i=${id}&ploy=full`
  async function getMovieDetail() {
    try {
      const details = await get(`/${search_title}${KEY}`)
      if (response.ok) {
        setDetails(details)
        console.log(details)

      }

    } catch (error) {

      console.log(error)

    }
  }


  const next = () => {
    let next
    if (position < (list_len - 1)) {
      next = position + 1;
      setPosition(next)
      let id = (document.getElementById(`i${next}`)).querySelectorAll('span[id^="tt"]')[0].id
      newId(id)
    }
    else {
      setPosition(0)
      next = 0
      let id = (document.getElementById(`i${next}`)).querySelectorAll('span[id^="tt"]')[0].id
      newId(id)
    }


  }
  const pre = () => {
    let pre
    if (position > 0) {
      pre = position - 1;
      setPosition(pre)
      let id = (document.getElementById(`i${pre}`)).querySelectorAll('span[id^="tt"]')[0].id
      newId(id)

    } else {
      pre = list_len - 1
      setPosition(list_len - 1)
      let id = (document.getElementById(`i${pre}`)).querySelectorAll('span[id^="tt"]')[0].id
      newId(id)


    }

  }
  useEffect(() => {
    if (shouldShow) {
      getMovieDetail()
    }
  }, [id])
  if (loading) {

    return <p>loading ...</p>
  }
  return (
    shouldShow &&
    <div className="modal-bg" onClick={onRequestClose}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <div className="wrapper">
          <button onClick={onRequestClose}>x</button>

          <button className="pre-btn" onClick={pre}>&#8249;</button>
          <button className="next-btn" onClick={next}>&#8250; </button>


          <div className="modal-content">
            <div>
              <img src={details.Poster} />
            </div>

            <div className="modal-details">
              <span className="year">Year: {details.Year}</span>
              <span className="runtime">Runtime: {details.Runtime}</span>

              <div className="plot">
                {details.Plot}

              </div>

              <div>
                Genre: {details.Genre}
              </div>

            </div>
          </div>

        </div>
      </div>


    </div>
  )
}