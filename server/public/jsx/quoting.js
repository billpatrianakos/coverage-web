// Quoting
// =======
// React components responsible for
// getting quotes from form input.

'use strict';

var React     = require('react'),
    ReactDom  = require('react-dom'),
    request   = require('superagent'),
    _         = require('lodash');


// QuotingContainer
// ----------------
// The container component
// for the entire page
var QuotingContainer = React.createClass({
  getInitialState: function() {
    return {
      plans: [],
      subsidy: null,
      demographics: {
        dependents: {}
      },
      spouse: false,
      children: []
    };
  },
  // QuotingContainer#updateDemographics
  // -----------------------------------
  // Updates each property of the demographics 
  // object `onChange`. The demo
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
  addSpouse: function(e) {
    e.preventDefault();
    var state = this.state;
    state.spouse = true;
    this.setState(state);
  },
  updateSpouseAge: function(e) {
    var state = this.state;
    if (!state.demographics.dependents.spouse) state.demographics.dependents.spouse = {};
    state.demographics.dependents.spouse.age = e.target.value;
    this.setState(state);
  },
  updateSpouseTobacco: function(e) {
    var state = this.state;
    var smoker = +e.target.value ? true : false;
    if (!state.demographics.dependents.spouse) state.demographics.dependents.spouse = {};
    state.demographics.dependents.spouse.tobacco_use = smoker;
    this.setState(state);
  },
  getQuotes: function(e) {
    e.preventDefault();
    var self      = this,
        csrfToken = document.getElementById('csrf-field').value,
        state     = this.state;

    // Update demographics if needed
    // if (state.spouse) {
    //   state.demographics.dependents.spouse = state.spouse;
    // }

    // Are there children?
    if (state.children.length) {
      state.children = state.children.filter(function(child) { return child.age !== null; });     // Filter out children with `null` ages
      state.demographics.dependents.children = state.children; // Add away if demo.deps exists
    }

    console.log(state.demographics)

    request.post('/quotes/?_csrf=' + csrfToken)
      .send(state.demographics)
      .end(function(err, res) {
        if (err || res.body.status !== 'ok') {
          console.log(err, '<--- Quoting.js 66'); // TODO: Handle this error properly
        } else {
          console.log(res); // TODO: Remove all console.log statements
          state.plans   = res.body.quotes;
          state.subsidy = res.body.subsidy;
          self.setState(state);
        }
      });
  },
  addDependent: function(e) {
    e.preventDefault();
    var state = this.state;
    state.children.push({age: null});
    this.setState(state);
    console.log('addDependent ran', this.state.children);
  },
  updateChildAge: function(age, index) {
    var state = this.state;
    this.state.dependents || {};
    this.state.children[+index] = {age: age};
    this.setState(state);
    console.log('updateChildAge ran', this.state.children);
  },
  render: function() {
    return (
      <div className="container">
        <div className="row-loose">
          <div className="col-3">
            {_.isNull(this.state.subsidy) ? null : <SubsidyDisplay subsidy={this.state.subsidy} />}
            <div className="form-sidebar">
              <h3 className="sans">Tell us about yourself</h3>
              <form method="post" action="/quotes/" onSubmit={this.getQuotes}>
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

                {this.state.spouse ? 
                  <label>
                    <input  type="text" 
                            placeholder="Spouse's age" 
                            onChange={this.updateSpouseAge} />
                  </label> : null}
                {this.state.spouse ? 
                  <div className="checkbox-holder">
                    <span className="label">Does your spouse smoke?</span>
                    <label className="inline">
                      No <input type="radio" 
                                name="spouse_tobacco_use" 
                                value="0" 
                                onChange={this.updateSpouseTobacco} />
                    </label>
                    <label className="inline">
                      Yes <input  type="radio" 
                                  name="spouse_tobacco_use" 
                                  value="1" 
                                  onChange={this.updateSpouseTobacco} />
                    </label>
                  </div> : null}
                {this.state.children.length ? <DependentForm children={this.state.children} setChild={this.updateChildAge} /> : null}
                {this.state.spouse ? null : <a href="#" onClick={this.addSpouse} className="btn add-dependents">Add Spouse</a> }
                <a href="#" className="btn add-dependents" onClick={this.addDependent}>Add Dependent</a>
                <button className="quote-button" type="submit">Get Quotes</button>
              </form>
            </div>
          </div>
          {this.state.plans.length > 0 ? <QuoteResults results={this.state.plans} subsidy={this.state.subsidy} /> : <InstructionComponent />}
        </div>
      </div>
    );
  }
});


// DependentForm
// -------------
// Render a dependent form
var DependentForm = React.createClass({
  render: function() {
    var children = this.props.children;

    return (
      <div>
        {
          children ? children.map(function(child, i) {
            return <Dependent index={i} key={i} setChild={this.props.setChild} />
          }.bind(this)) : null
        }
      </div>
    );
  }
});


// Dependents
// ----------
// Render a single dependent form
var Dependent = React.createClass({
  setChild: function(e) {
    var age   = e.target.value,
        index = this.props.index;

    this.props.setChild(age, index);
  },
  render: function() {
    return (
      <label>
        <input name={'child-' + this.props.index} placeholder="Child's age" onChange={this.setChild} />
      </label>
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
      <div className="col-8">
        {
          this.props.results.map(function(plan, i) {
            return <PlanInfo planData={plan} subsidy={this.props.subsidy} key={i} />
          }.bind(this))
        }
      </div>
    );
  }
});


// PlanInfo
// --------
// Displays a plan info component
// that shows all information about a plan
var PlanInfo = React.createClass({
  calculateSubsidizedPremium: function(premium) {
    var subsidizedPremium = premium - this.props.subsidy;
    subsidizedPremium = subsidizedPremium >= 0 ? subsidizedPremium : 0;

    var savings = premium - subsidizedPremium;
    return [subsidizedPremium.toFixed(2), savings.toFixed(2)];
  },
  render: function() {
    var premiumInfo = this.calculateSubsidizedPremium(this.props.planData.premium);
    return (
      <div className="plan-box">
        <header>
          <h2 className="sans h3"><span className={'metal-level-' + this.props.planData.metal_level}></span> {this.props.planData.plan_name} ({this.props.planData.plan_type})</h2>
          <h3 className="hug sans h4">You pay ${premiumInfo[0]} (<span className="savings">You save ${premiumInfo[1]}</span>)</h3>
        </header>
        <div className="body">
          <p>
            <strong>Deductible:</strong> ${this.props.planData.deductible.toString().replace('$', '')}
          </p>
        </div>
      </div>
    );
  }
});


// SubsidyDisplay
// --------------
// Displays subsidy information
var SubsidyDisplay = React.createClass({
  render: function() {
    return (
      <div className="form-sidebar">
        <p><em>You are eligible for a subsidy of:</em></p>
        <h4 className="subsidy-amount">${this.props.subsidy.toFixed(2)}</h4>
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
        <div className="instruction-box">
          <h2 className="sans">Find your best health insurance option!</h2>
          <h3 className="sans hug h4">Just enter some basic information about yourself in the form on this page to view quotes</h3>
        </div>
      </div>
    );
  }
});


ReactDom.render(React.createElement(QuotingContainer), document.getElementById('quoting-component'));
