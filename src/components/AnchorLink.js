import React from 'react';

class AnchorLink extends React.Component {
  handleClick = (event) => {
    const { id } = this.props;
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { id, children, className, style } = this.props;
    return (
      <a href={`#${id}`} onClick={this.handleClick} className={className} style={style}>
        {children}
      </a>
    );
  }
}

export default AnchorLink;