import "./fixme.css";
import fix_tags from "./fix-tags.json";

const FixMe = () => {
  const handleDropdownClick = () => {
    this.nextElementSibling.style.display = "block";
  };

  const handleDropdownContentClick = () => {
    this.style.display = "none";
  };

  return (
    <div className="fixme">
      <div className="fixme-title">Fix Me</div>
      <div className="order-type">
        <div className="order">
          <label>
            <input type="radio" value="new" name="order"/>New
          </label>
          <label>
            <input type="radio" value="cancel" name="order"/>Cancel
          </label>
        </div>
      </div>
      <div className="fix-tags">
      {fix_tags.map((tag, i) => {
        return (
          <div className="fix-tag" key={i}>
            <button className="tag-button">{tag["name"]} {tag["tag"]}</button>
            <div className="tag-content">
              {tag["values"].map((value, i) => {
                return <a key={i}>{value}</a>;
              })}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default FixMe;
