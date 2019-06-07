import React, {Fragment} from 'react';

export default function({lyric}) {
    return(
        <Fragment>
            <h2>Lyrics</h2>
            <p className='letra'>{lyric}</p>
        </Fragment>
    )
}