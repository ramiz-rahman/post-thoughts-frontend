import React from 'react';
import PropTypes from 'prop-types';
import {
  MdThumbUp as UpVote,
  MdThumbDown as DownVote
} from 'react-icons/md';
import styles from './Voter.module.css';

function Voter(props) {
  const { onUpVote, onDownVote, voteScore, size, horizontal } = props;

  const Voter = _getVoterWithOrientation(horizontal);
  const iconSize = _getIconSize(size);
  const Voter__UpVote = `${styles.Voter__UpVote} ${iconSize}`;
  const Voter__DownVote = `${styles.Voter__DownVote} ${iconSize}`;

  return (
    <div className={Voter}>
      <UpVote className={Voter__UpVote} onClick={onUpVote} />
      <span>{voteScore}</span>
      <DownVote className={Voter__DownVote} onClick={onDownVote} />
    </div>
  );
}

function _getIconSize(size) {
  let iconSize;
  if (!size) {
    iconSize = styles.Voter_size_m;
  } else if (size === 's') {
    iconSize = styles.Voter_size_s;
  } else if (size === 'm') {
    iconSize = styles.Voter_size_m;
  } else if (size === 'l') {
    iconSize = styles.Voter_size_l;
  }
  return iconSize;
}

function _getVoterWithOrientation(horizontal) {
  let modifiedVoter = `${styles.Voter}`;
  if (horizontal)
    modifiedVoter = modifiedVoter.concat(` ${styles.Voter_horizontal}`);
  return modifiedVoter;
}

Voter.propTypes = {
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  voteScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(['s', 'm', 'l']),
  horizontal: PropTypes.bool
};

export default Voter;
