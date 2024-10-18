  export function Footer({ url, title }) {
    return (
      <footer className="footer">
        <a href={url} target="_blank">
          {title}
        </a>
      </footer>
    );
}

  