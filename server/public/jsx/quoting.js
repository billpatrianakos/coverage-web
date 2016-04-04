var React     = require('react'),
    ReactDom  = require('react-dom');


// QuotingContainer
// ----------------
// The container component
// for the entire page
var QuotingContainer = React.createClass({
  getInitialState: function() {
    return {
      plans: [],
      demographics: {}
    };
  },
  updateDemographics: function(event) {
    var state = this.state;
    if (event.target.name === 'tobacco_use') {
      this.state.demographics.tobacco_use = Boolean(+event.target.value);
    } else {
      this.state.demographics[event.target.name] = event.target.value;
    }
    this.setState(state);
    console.log(this.state);
  },
  render: function() {
    return (
      <div className="container">
        <div className="row-loose">
          <div className="col-3">
            <div className="form-sidebar">
              <h3 className="sans">Tell us about yourself</h3>
              <form method="post" action="/quotes/">
                <label><input type="text" 
                              name="zip_code" 
                              placeholder="Zip code" 
                              onChange={this.updateDemographics} />
                </label>
                <label><input type="text" 
                              name="age" 
                              placeholder="Your age" 
                              onChange={this.updateDemographics} />
                </label>
                <label><input type="text" 
                              name="household_income" 
                              placeholder="Household income" 
                              onChange={this.updateDemographics} />
                </label>
                <div className="checkbox-holder">
                  <span className="label">Do you smoke?</span>
                  <label className="inline">No <input type="radio" 
                                                      name="tobacco_use" 
                                                      value="0"
                                                      onChange={this.updateDemographics} />
                  </label>
                  <label className="inline">Yes <input  type="radio" 
                                                        name="tobacco_use" 
                                                        value="1"
                                                        onChange={this.updateDemographics} />
                  </label>
                </div>
                <a href="#" className="btn add-dependents">Add Dependents</a>
              </form>
            </div>
          </div>
          <QuoteResults results={this.state.plans} />
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
