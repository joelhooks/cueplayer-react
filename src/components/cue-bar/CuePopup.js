import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'

const propTypes = {
  cue: PropTypes.object,
  active: PropTypes.bool,
}

const defaultProps = {
  cue: {},
  active: false,
}

const CuePopup = ({cue, active}) => {
  console.log('cue: ', typeof cue)
  const note = JSON.parse(cue.text)
  return active ? (
    <div className="cueplayer-react-cue-popup">{note?.title}</div>
  ) : null
}

CuePopup.propTypes = propTypes
CuePopup.defaultProps = defaultProps
CuePopup.displayName = 'CuePopup'

export default CuePopup
