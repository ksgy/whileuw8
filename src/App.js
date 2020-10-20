import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {filter as _f, debounce as _d} from 'lodash'

const MAX_RETRIES = 5;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', timewehave: 5};

    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = _d(this.handleSubmit.bind(this), 300);
  }

  handleChange(event) {
    this.setState({value: event.target.value, loading: true});
    this.handleSubmit();
  }

  handleTimeChange(event) {
    this.setState({timewehave: event.target.value});
  }

  handleSubmit(event) {

    const convert_time = (duration) => {
        var a = duration.match(/\d+/g);

        if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
            a = [0, a[0], 0];
        }

        if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
            a = [a[0], 0, a[1]];
        }
        if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
            a = [a[0], 0, 0];
        }

        duration = 0;

        if (a.length === 3) {
            duration = duration + parseInt(a[0], 10) * 3600;
            duration = duration + parseInt(a[1], 10) * 60;
            duration = duration + parseInt(a[2], 10);
        }

        if (a.length === 2) {
            duration = duration + parseInt(a[0], 10) * 60;
            duration = duration + parseInt(a[1], 10);
        }

        if (a.length === 1) {
            duration = duration + parseInt(a[0], 10);
        }
        // var h = Math.floor(duration / 3600);
        // var m = Math.floor(duration % 3600 / 60);
        // var s = Math.floor(duration % 3600 % 60);
        return duration;
    }

    const apikey = 'no :P';

    let retries = 0;

    const getResults = () => {
      retries++;
      this.setState({loading: true, retries: retries, error: false});
      console.log('Retry', retries);

      if (retries > MAX_RETRIES) {
        this.setState({loading: false});
        return;
      }

      axios.get(
          'https://www.googleapis.com/youtube/v3/search', {
            params: {
              part: 'snippet,id',
              q: this.state.value,
              maxResults: 50,
              type: 'video',
              key: apikey
            }
          }).then((data) => {

            if (data.data.items.length > 0) {
              let calls = [];
              for (var i = 0; i < data.data.items.length; i++) {
                  var url1 = "https://www.googleapis.com/youtube/v3/videos?id=" + data.data.items[i].id.videoId + "&key=AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw&part=snippet,contentDetails";
                  calls.push(axios.get(url1));
              }
              axios.all(calls).then((data) => {
                let results = _f(data, (item) => {
                  if (item.data.items[0]) {
                    const time = convert_time(item.data.items[0].contentDetails.duration);
                    const timewehave = this.state.timewehave * 60;
                    return timewehave-180 < time && time < timewehave+180;
                  }
                  return false
                });

                results = results.map((item) => {
                  return (
                    <div>
                      <p className="title"><a href={`https://youtube.com/embed/${item.data.items[0].id}?rel=0`}>{item.data.items[0].snippet.title}</a></p>
                      <p><a href={`https://youtube.com/embed/${item.data.items[0].id}?rel=0`}><img src={
                        (item.data.items[0].snippet.thumbnails.standard && item.data.items[0].snippet.thumbnails.standard.url) ||
                        (item.data.items[0].snippet.thumbnails.high && item.data.items[0].snippet.thumbnails.high.url) ||
                        (item.data.items[0].snippet.thumbnails.medium && item.data.items[0].snippet.thumbnails.medium.url) ||
                        (item.data.items[0].snippet.thumbnails.default && item.data.items[0].snippet.thumbnails.default.url)
                      } alt={item.data.items[0].snippet.title} /></a></p>
                    </div>
                  );
                });

                this.setState({ loading: false, results: results });
                var elmnt = document.querySelector('.results')
                setTimeout(function () {
                  elmnt.scrollIntoView();
                }, 300);

                if(results.length === 0) {
                  getResults();
                }
              });
            } else {
              getResults();
            }
          }).catch(e => {
          this.setState({loading: false, error: true});
          const elmnt = document.getElementById("video");
          elmnt.scrollIntoView();
      });
    }

    getResults();
  }



  render() {
    return (
      <div>
        <h1>while you wait...</h1>
        <form>
          <aside className="description">
            For a build,
            for your girlfriend to finish her makeup,
            for food to be delivered,
            for your wife,
            for the vet,
            for the next train while at work...
          </aside>
          <p className="freeminutes">...and you have about <span>
            <input className="slider" type="range" min="1" max="60" value={this.state.timewehave} onChange={this.handleTimeChange} step="1" />
          </span><br /><span className="timewehave">{this.state.timewehave}</span> <br />free minutes for...</p>
          {/*<input type="text" value={this.state.value} onChange={this.handleChange} />*/}

          {!this.state.loading && !this.state.error ? (<ul className="type">
            <li><input id="typeCheckBox1" type="checkbox" value="funny videos" onChange={this.handleChange} /> <label htmlFor="typeCheckBox1">fun</label></li>
            <li><input id="typeCheckBox2" type="checkbox" value="geek news" onChange={this.handleChange} /> <label htmlFor="typeCheckBox2">geek</label></li>
            <li><input id="typeCheckBox3" type="checkbox" value="random music" onChange={this.handleChange} /> <label htmlFor="typeCheckBox3">music</label></li>
            <li><input id="typeCheckBox4" type="checkbox" value="tech news" onChange={this.handleChange} /> <label htmlFor="typeCheckBox4">tech</label></li>
            <li><input id="typeCheckBox5" type="checkbox" value="physics lessons" onChange={this.handleChange} /> <label htmlFor="typeCheckBox5">physics</label></li>
            <li><input id="typeCheckBox6" type="checkbox" value="math lessons" onChange={this.handleChange} /> <label htmlFor="typeCheckBox6">math</label></li>
            <li><input id="typeCheckBox7" type="checkbox" value="live streaming" onChange={this.handleChange} /> <label htmlFor="typeCheckBox7">game</label></li>
          </ul>) : ''}
          {this.state.loading ? <div className="loader"><div className="ball-scale-ripple"><div></div></div></div> : ''}

          <ul className="results">
            {this.state.results && this.state.results.map(function(listValue, index){
              return <li key={index}>{listValue}</li>;
            })}

            {this.state.results && this.state.results.length === 0 && this.state.retries > MAX_RETRIES ? <li className="noluck">Sorry, no luck <span>😢</span> &nbsp;Please, try again <span>👆</span></li>: ''}
              {this.state.error && <li id="video">
                  <iframe width="100%" height="400" src="https://www.youtube.com/embed/oHg5SJYRHA0?controls=0&autoplay=1"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen></iframe>
              </li>}
          </ul>

        </form>
      </div>
    );
  }
}

export default App;
