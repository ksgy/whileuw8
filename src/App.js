import React, { useState } from 'react';
import illustration from './illustration.png';
import './App.css';

const videos = [
  'R0em00wQ9jw',
  'ydAyvvDQrgY',
  '1veWbLpGa78',
  'wgzdb0txR_c',
  '-BIDA_6t3VA',
  'BrY7YQ7Vm2I',
  'aW8BDgLpZkI',
  'jhMG6rvmU0c',
  'A9AbYAFfiVA',
  'cMkP59QHm1Y',
  'XvuREbgYurM',
  'JpgEtYUsdE4',
]

function App() {

  const [isGenerated, setGenerated] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      setGenerated(randomVideo);
      setLoading(false);
    }, 800);

  }
  const go = (e) => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  };
  const generateHappinessText = isGenerated ? 'Generate again!' : 'Generate Happiness!';
  const renderNotHappy = !isLoading && isGenerated && <h3>Not happy yet?</h3>
  const renderLoading = isLoading && <div className="lds-ripple"><div></div><div></div></div>;
  const renderResult = isGenerated ?
    (<iframe width="100%" height="100%" src={'https://www.youtube.com/embed/' + isGenerated} title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen/>) : <img src={illustration} alt="illustration" className={'illustration-small'} />;
  return (
    <div className="App">
      <header className="App-header">
        <img src={illustration} alt="illustration" className={'illustration'} />
        <h1>While You Wait</h1>
        <h2>Quarantine Edition</h2>
        <a href="#home" onClick={go}>Go</a>
      </header>
      <main id="home">
        <article>
          <p>We all know how it feels to be in quarantine because of COVID-19. Even restrictions are getting lifted, many people still have to quarantine, because of their immune system, or any other medical condition.</p>
          <p>Realising how badly quarantine can affect people's mental health, I made this small page to bring some joy, happiness - some source of positive energy into their/our lives</p>
          <p>The videos are coming from a curated list, so if you'd like to recommend one, you can do it <a href="https://forms.gle/k8ubcCDU5rVKX4jz5" target="_blank">here</a>.</p>
        </article>
        {renderNotHappy}
        {renderLoading}
        <button onClick={generate}>{generateHappinessText}</button>
        <div className="result">
          {renderResult}
        </div>
      </main>
    </div>
  );
}

export default App;
