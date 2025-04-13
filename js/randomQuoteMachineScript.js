import React, { useState } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

/*
const quotes = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now",
    author: "Chinese Proverb"
  },
  {
    text: "You do not realize now what I am doing, but later you will understand",
    author: "Jesus"
  },
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life",
    author: "Saint John "
  },
  {
  text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well",
    author: "Saint Matthew" 
  }
]

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: 0,
      color: "#14df12"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    const randomNum = Math.floor(Math.random() * quotes.length);
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16)
    this.setState({
      quoteIndex: randomNum,
      color: randomColor
    })
  }
  render() {
    
    const currQuote = quotes[this.state.quoteIndex]
    
    const boxColor = {
      backgroundColor: this.state.color
    }
    
    if (currQuote.text.length < 50) {
      <br />
    }
    
    return (
      <body style={boxColor}>
      <div id="quote-box">
      <p id="text">"{currQuote.text}"</p>
      <p id="author">— {currQuote.author}</p>
        <div id="button-container"> 
      <button id="new-quote" onClick={this.handleClick} style={boxColor}>New Quote</button>
      <a id="tweet-quote" style={boxColor} href="twitter.com/intent/tweet" target="_blank">
        <i class="fas fa-brands fa-x-twitter"></i>
        </a> 
      </div>
        
    </div>
      </body>
    )
  }
};


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<QuoteBox />);

*/


let quotesUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quoteIndex: 0,
      color: "#14df12",
      isLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  async componentDidMount() {
  try {
    const res = await fetch(quotesUrl);
    const data = await res.json();
    this.setState({
      quotes: data.quotes,
      isLoading: false,
    })
  } catch (err) {
    console.log(err)
  }
}
  
  handleClick() {
    const randomNum = Math.floor(Math.random() * this.state.quotes.length);
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16)
    this.setState({
      quoteIndex: randomNum,
      color: randomColor
    })
  }
  render() {
  if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    const currQuote = this.state.quotes[this.state.quoteIndex];
    
    const boxColor = {
      backgroundColor: this.state.color
    };
    
    
    return (
      <body style={boxColor}>
      <div id="quote-box">
      <p id="text">{currQuote.quote}</p>
      <p id="author">— {currQuote.author}</p>
        <div id="button-container"> 
      <button id="new-quote" onClick={this.handleClick} style={boxColor}>New Quote</button>
      <a id="tweet-quote" style={boxColor} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('“' + currQuote.quote + '”')}%20—%20${encodeURIComponent(currQuote.author)}`} target="_blank">
        <i className="fas fa-brands fa-x-twitter"></i>
        </a> 
      </div>
        
    </div>
      </body>
    )
  }
};


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<QuoteBox />);