import React, {useState} from 'react'

export default function({getLirics}) {
    const [search, setSearch] = useState({
        artist: '',
        song: ''
    })

    const updateState = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const _handleSubmit = e => {
        e.preventDefault()
        getLirics(search)
    }

    return(
        <div className="bg-info">
          <div className="container">
              <div className="row">
                  <form
                    onSubmit={_handleSubmit}
                    className="col card text-white bg-transparent  mb-5 pt-5 pb-2">
                      <fieldset>
                          <legend className="text-center">Buscador Letras Canciones</legend>
                          <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                    <label>Artist</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        onChange={updateState}
                                        name="artist" 
                                        placeholder="Nombre Artista" 
                                        required
                                    />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                    <label>Song</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        onChange={updateState}
                                        name="song" 
                                        placeholder="Nombre Canción" 
                                        required
                                    />
                                </div>
                              </div>
                          </div>
                          <button type="submit" className="btn btn-primary float-right">Search</button>
                      </fieldset>
                  </form>
              </div>
          </div>
      </div>
    )
}