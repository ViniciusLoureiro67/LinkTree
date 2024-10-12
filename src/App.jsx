import { Link } from './Link'

const links = [
  { id: 1, url: 'https://www.linkedin.com/in/vsloureiro/', title: 'Linkedin' },
  { id: 2, url: 'https://www.youtube.com/@Theviniciusjourney', title: 'Youtube' },
  { id: 3, url: 'https://x.com', title: 'X' }
]

export function App() {
  return (
    <main>
      <h1>Olá, sou Vinicius 😁</h1>
      {links.map((item) => (
        <Link key={item.id} title={item.title} url={item.url} />
      ))}
    </main>
  )
}