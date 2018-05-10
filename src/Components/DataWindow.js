import React from 'react'

class DataWindow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const targetUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    const colors = ["#A7BED3", "#C6E2E9", "#F1FFC4", "#FFCAAF", "#DAB894", "#DCEDB9", "#CBD081", "#918868", "#3A405A", "#F9DEC9", "#99B2DD", "#E9AFA3", "#685044", "#474A2C", "#636940", "#59A96A", "#B4E7CE", "#A0ECD0", "#94DDBC", "#714955", "#B4E7CE"];
    const fonts = ["#000", "#000", "#000", "#000", "#000", "#000", "#000", "#fff", "#fff", "#000", "#000", "#000", "#fff", "#fff", "#fff", "#fff", "#000", "#000", "#000", "#fff", "#000"];
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            quoteAuthor: result.quoteAuthor,
            quoteText: result.quoteText,
            colors,
            fonts
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
    const { error, isLoaded, quoteAuthor, quoteText } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading API Data...</div>;
    } else {
      return (
        <div className="container">
          <ul>
            <li>
              {quoteText}
            </li>
            <li>
              {quoteAuthor}
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default DataWindow