/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Link({ url, title, icon, download }) {
  return (
    <a href={url} target={download ? '_self' : '_blank'} rel={download ? '' : 'noopener noreferrer'} download={download} className="link">
      <FontAwesomeIcon icon={icon} style={{ marginRight: '8px' }} />
      {title}
    </a>
  );
}


