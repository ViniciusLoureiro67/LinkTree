/* eslint-disable react/prop-types */

export function Link({ url, title }) {
    return (
      <a href={url} target="_blank" className="link">
        {title}
      </a>
    )
  }
  