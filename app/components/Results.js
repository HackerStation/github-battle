import React from 'react';

class Results extends React.Component {
  render() {
    return (
      <div>
        RESULTS...
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export default Results;
