import React, { Component } from "react";

class PokeDetail extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className="pokemon__wrapper">
        <div className="pokemon__wrapper-grey">
          <img
            className="pokemon__image"
            src={item.sprites.front_default}
            alt={item.name}
          />
          <p className="pokemon__id">ID / {item.id}</p>
        </div>
        <div className="pokemon__wrapper-info">
          <h2 className="pokemon__name">{item.name}</h2>
          <ul className="pokemon__types">
            {item.types.map((item, index) => (
              <li className="pokemon__types-item" key={index}>
                {item.type.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PokeDetail;
