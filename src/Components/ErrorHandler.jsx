import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info }); // eslint-disable-line react/no-unused-state
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return null;
    }
    return children;
  }
}
export default ErrorHandler;

ErrorHandler.propTypes = {
  children: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};
