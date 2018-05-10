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
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            quoteAuthor: result.quoteAuthor,
            quoteText: result.quoteText
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
            <li style={}>
              {quoteAuthor}
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default DataWindow