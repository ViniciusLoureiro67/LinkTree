  export function Footer({ url, title }) {
    return (
      <footer className="footer">
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </footer>
    );
}

  