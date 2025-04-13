import React, { useState } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

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
    }, () => {
      document.body.style.backgroundColor = this.state.color;
    });
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
      
    )
  }
};


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<QuoteBox />);
