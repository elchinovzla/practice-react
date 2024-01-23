import './question5.css';

const Grid = ({ title, leftValue, somethingValue, something, theEnd }) => {
  return (
    <div className="tile">
      <div className="tileTitle">{title}</div>
      <div className="content">
        <div className="left">
          <h3>{leftValue}</h3>
        </div>
        <div className="right">
          <h>{somethingValue}</h>
          <p>{something}</p>
          <p>{theEnd}</p>
        </div>
      </div>
    </div>
  );
};

export default Grid;
