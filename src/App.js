import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './Player/Player'

class App extends Component {

  state = {
	resultSets: [],
	loaded: true
  }

  fetchData = () => {
	  this.setState({loaded: false});
	  fetch(`https://cors-anywhere.herokuapp.com/http://api.suredbits.com/nba/v0/stats/2544/2018`, {
      headers: {
		"Content-Type": 'application/json',
      }
    })
	.then(result => result.json())
	/** {"st":109,"fta":465,"bs":65,"off":88,"pf":122,"min":2747,"fgm":772,"to":317,"deff":546,"pts":2019,"tpa":359,"playerId":2544,"ftm":337,"fga":1421,"plusminus":50,"ast":674,"tpm":138,"tot":634} */
		  .then(resultSets => {
			  /**
			   * We map across all resultsSets, and return only fields we want to show. 
			   */
			  resultSets = resultSets.map(set => {
				  set.stats = {};
				  set.stats.freeThrows = set.fta;
				  set.stats.points = set.pts;
				  set.stats.assists = set.ast;
				  set.stats.name = 'Lebron'
				  set.stats.lastName = 'James'
				  return set.stats;
			  })
			  this.setState({resultSets, loaded: true})
		  });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
			<button className="cta-button__active" onClick={this.fetchData}>Retreive data</button>	
		{ this.state.loaded ?
			<div>
				{this.state.resultSets.map((set, index) => {
					return <Player set={set} index={index}/>
				})}
			</div>	
				:
			<p>LOADING...</p>
		}		
      </div>
    );
  }
}

export default App;
