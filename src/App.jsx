import { faLinkedin, faInstagram, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';



import { Link } from './Link'

const links = [
  { id: 1, url: 'https://www.linkedin.com/in/vsloureiro/', title: 'Linkedin', icon: faLinkedin },
  { id: 2, url: 'https://www.youtube.com/@Theviniciusjourney', title: 'Youtube', icon: faYoutube },
  { id: 3, url: 'https://instagram.com/vini.cyber', title: 'Instagram', icon: faInstagram },
  { id: 4, url: '/public/Vinicius_resume.pdf', title: 'Get My Professional CV', icon: faFileDownload, download: true },
  { id: 5, url: 'https://wa.me/971558039150', title: 'Reach Me on WhatsApp', icon: faWhatsapp }
];


import { Footer } from './Footer'

const footers = [
  {id: 1, url: 'https://www.linkedin.com/in/vsloureiro/', title: 'Click Here to see my Linkedin Profile' }
]



export function App() {
  return (
    <main>
      <div className="profile">
        <img src="/eudeternorosto.jfif" alt="Vinicius" className="profile-photo" />
        <p className="bio">Hi, I'm Vinicius. I'm passionate about technology, cybersecurity, and programming. Welcome to my page! </p>
      </div>
      
      <h1>Connect with Me</h1>
      {links.map((item) => (
        <Link key={item.id} title={item.title} url={item.url} icon={item.icon} download={item.download} />
      ))}

      {footers.map((footer) => (
        <Footer key={footer.id} url={footer.url} title={footer.title} />
      ))}
    </main>
  );
}

