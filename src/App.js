import React, { useState } from 'react';
import illustration from './illustration2.png';
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
  '1KJdkYJmYWE',
  'gcZ1gzFSSNE',
  'PHigKldeXTw'
]

function App() {

  const [isGenerated, setGenerated] = useState(false);
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
  const renderResult = isGenerated &&
    (<iframe width="100%" height="100%" src={'https://www.youtube.com/embed/' + isGenerated} title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen/>);
  return (
    <div className="App">
      <header className="App-header">
        <img src={illustration} alt="illustration" className={'illustration'} />
        <h1>While You Wait</h1>
        {/*<h2>Quarantine Edition</h2>*/}
        <a href="#home" onClick={go}>Go</a>
      </header>
      <main id="home">
        <article>
          <p>During the COVID-19 pandemic, we all experienced the challenges of quarantine.</p>
          <p>Even though some restrictions have been lifted, many people continue to struggle with their mental health.</p>
          <p>In an effort to bring some positivity and happiness into our lives, I have compiled a list of videos as a source of positive energy.</p>
          <p>If you have a recommendation for a video to add, please let me know <a href="https://forms.gle/k8ubcCDU5rVKX4jz5" target="_blank">here</a>.</p>
        </article>
        {renderLoading}
        {!isGenerated && <button onClick={generate}>{generateHappinessText}</button>}
        <div className="result">
          {renderResult}
        </div>
        {renderNotHappy}
        {isGenerated && <button onClick={generate}>{generateHappinessText}</button>}
      </main>
    </div>
  );
}

export default App;
