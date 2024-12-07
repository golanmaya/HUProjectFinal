import { Container } from "react-bootstrap"
import "./About.css"

export default function About() {
  return (
    <Container className="About">
      <div>
        <h2>Our Mission</h2>
        <p>Welcome to our movie review haven! We're passionate cinephiles dedicated to providing insightful and entertaining reviews of the latest films. Our mission is to be your go-to source for honest, unbiased opinions on everything from blockbuster hits to indie gems. We believe that every movie deserves a fair shake, and we're committed to sharing our thoughts with a community of fellow film lovers.</p>
      </div>
      <div>
        <h2> What We Offer</h2>
        <p>On our site, you'll find a diverse range of reviews covering various genres, from thrilling action flicks to heartwarming dramas. Our reviews are written in a clear and concise style, providing a balanced perspective on each film's strengths and weaknesses. We also delve into the technical aspects of filmmaking, such as cinematography, sound design, and editing, to offer a comprehensive analysis.</p>
      </div>
      <div>
        <h2> Join Our Community</h2>
        <p>Beyond reviews, we strive to foster a vibrant community of movie enthusiasts. Our platform encourages lively discussions and debates about films, allowing you to connect with like-minded individuals who share your passion. Whether you're a seasoned critic or a casual viewer, we invite you to explore our site, share your thoughts, and become part of our growing community.</p>
      </div>

    </Container>
  )
}

