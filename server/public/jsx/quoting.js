var React     = require('react'),
    ReactDom  = require('react-dom');


// QuotingContainer
// ----------------
// The container component
// for the entire page
var QuotingContainer = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row-loose">
          <div className="col-4">
            Sidebar
          </div>
          <QuoteResults results={[]} />
        </div>
      </div>
    );
  }
});


// QuoteResults
// ------------
// Render instruction message
// or quote results once search
// has been run.
var QuoteResults = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.results.length > 0 ? <div>Hello</div> : <InstructionComponent />}
      </div>
    );
  }
});


// InstructionComponent
// --------------------
// Provides a callout with instructions on
// how to run a quote
var InstructionComponent = React.createClass({
  render: function() {
    return (
      <div className="col-8">
        Follow the instructions to get quotes
      </div>
    );
  }
})


ReactDom.render(React.createElement(QuotingContainer), document.getElementById('quoting-component'));
