import React, { useState, useEffect } from "react";
import "./fixme.css";
import fix_tags from "./fix-tags.json";

const FixMe = () => {
  /**
   * create an empty object with fix-tags.json file's names as keys
   * @returns draft order object with keys' values as empty string
   * { "notional": "", "price": "", ... }
   */
  const draftOrder = () => {
    const order = {}
    fix_tags.forEach((fix_tag) => {
      const tag = fix_tag["tag"];
      order[tag] = "";
    })
    // console.log(JSON.stringify(order));
    return order;
  }

  const [order, setOrder] = useState(draftOrder);

  const handleTagClick = (event, tag) => {
    console.log(event.target.innerText);
    setOrder({ ...order, [`${tag}`]: event.target.innerText });
  };

  const handleTagInput = (event, tag) => {
    console.log(event.target.value);
    setOrder({ ...order, [`${tag}`]: event.target.value });
  };

  // for debugging purposes
  useEffect(() => {
    console.log(JSON.stringify(order));
  }, [order]);

  /**
   * display fix tags based on the fix-tags.json file values
   * if the values are string, it will display input field
   * if the values are array, it will display button with dropdown
   * @returns 
   */
  const displayFixTags = () => {
    return fix_tags.map((fix_tag, i) => {
      if (typeof fix_tag["values"] === "string") {
        // handle input fields display
        const tag = fix_tag["tag"];
        const name = fix_tag["name"];
        return (
          <input
            key={i}
            type="text"
            placeholder={name}
            value={order[`${tag}`]}
            onChange={(event) => handleTagInput(event, tag)}
          />
        );
      } else {
        // handle dropdowns display
        const tag = fix_tag["tag"];
        const name = fix_tag["name"];
        return (
          <div className="fix-tag" key={i}>
            <button className="tag-button">
            [{ name } { tag }] {order[tag]}
            </button>
            <div className="tag-content">
              {fix_tag["values"].map((value, i) => {
                return (
                  <a key={i} onClick={(event) => handleTagClick(event, tag)}>
                    {value}
                  </a>
                );
              })}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="fixme">
      <div className="fixme-title">Fix Me</div>
      <div className="order-type">
        <div className="order">
          <label>
            <input type="radio" value="new" name="order" />
            New
          </label>
          <label>
            <input type="radio" value="cancel" name="order" />
            Cancel
          </label>
        </div>
      </div>
      <div className="fix-tags">{displayFixTags()}</div>
    </div>
  );
};

export default FixMe;
