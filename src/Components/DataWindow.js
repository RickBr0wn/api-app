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
    fetch("https://randomuser.me/api/?nat=gb")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            results: result.results[0]
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
    const { error, isLoaded, results } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading API Data...</div>;
    } else {
      console.log(results)
      return (
        <ul>
          {results.map(person => (
            <li key={person.id.name}>
              {person.id.name} 
              {/* {item.price} */}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default DataWindow