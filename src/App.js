import React, { useState, useEffect, Fragment } from 'react'
import Form from './components/Form';
import Song from './components/Song';
import Info from './components/Info';
import Spinner from './components/Spinner';
import Alert from './components/Alert';
import NotSong from './components/NotSong';

export default function () {
  const [artist, setArtist] = useState('')
  const [lyric, setLyric] = useState([])
  const [info, setInfo] = useState({})
  const [lyricSp, setLyricSp] = useState(false)
  const [infoSp, setInfoSp] = useState(false)
  const [lost, setLost] = useState(false)
  const [notLyric, setNotLyric] = useState(false)

  useEffect(() => {
    _getArtist()
  }, [artist])

  const getLirics = async search => {
    setLyricSp(true)
    setNotLyric(false)
    const { artist, song } = search
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
    setArtist(artist)

    try {
      let resp = await fetch(url)
      let data = await resp.json()

      setLyricSp(false)
      setLyric(data.lyrics)
    } catch (err) {
      console.log(err)
      setNotLyric(true)
      setLyricSp(false)
      setLyric([])
    }

  }

  const _getArtist = async () => {
    if (artist) {
      setInfoSp(true)
      setLost(false)
      const url = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`

      let resp = await fetch(url)
      let data = await resp.json()

      if (data.artists !== null) {
        setInfoSp(false)
        setInfo(data.artists[0])
      } else {
        setInfoSp(false)
        setLost(true)
      }
    }
  }

  return (
    <Fragment>
      <Form getLirics={getLirics} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {infoSp ? <Spinner /> : null}
            {lost ? <Alert /> : <Info info={info} />}
          </div>
          <div className="col-md-6">
            {lyricSp ? <Spinner /> : null}
            {lyric.length !== 0 ? <Song lyric={lyric} /> : ''}
            {notLyric ? <NotSong /> : ''}
          </div>
        </div>
      </div>
    </Fragment>
  )
}