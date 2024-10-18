import React, { useState, useEffect } from "react";
import "./fixme.css";
import fixTags from "./fixTags.json";

const FixMe = () => {
  /**
   * create an empty object with fix-tags.json file's names as keys
   * @returns draft order object with keys' values as empty string
   * { "notional": "", "price": "", ... }
   */
  const draftOrder = () => {
    const order = {};
    fixTags.forEach((fix_tag) => {
      const tag = fix_tag["tag"];
      order[tag] = "";
    });
    // console.log(JSON.stringify(order));
    return order;
  };

  const [order, setOrder] = useState({});
  const [orderType, setOrderType] = useState("new"); // new or cancel

  /**
   * display the order type selected by the user: new or cancel
   * @param {*} event
   * @returns jsx for the order type selected
   */
  const handleOrderType = (event) => {
    console.log(event.target.value);
    setOrderType(event.target.value);
    if (event.target.value === "new") {
      setOrder(draftOrder());
      return <div className="fix-tags">{displayNewOrderFixTags()}</div>;
    } else {
      return <div className="fix-tags">{displayCancelOrderFixTags()}</div>;
    }
  };

  const handleTagClick = (event, tag) => {
    console.log(event.target.innerText);
    setOrder({ ...order, [`${tag}`]: event.target.innerText });
  };

  const handleTagInput = (event, tag) => {
    console.log(event.target.value);
    setOrder({ ...order, [`${tag}`]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting order", order);
  };

  // for debugging purposes
  useEffect(() => {
    // console.log(JSON.stringify(order));
  }, [order]);

  /**
   * display fix tags based on the fix-tags.json file values
   * if the values are string, it will display input field
   * if the values are array, it will display button with dropdown
   * @returns
   */
  const displayNewOrderFixTags = () => {
    return (
      <form>
        {fixTags.map((fix_tag, i) => {
          const tag = fix_tag["tag"];
          const name = fix_tag["name"];

          if (typeof fix_tag["values"] === "string" && !fix_tag["values"]) {
            // if the tag value is an empty string handle input field display
            return (
              <div key={i} className="fix-tag-input tag">
                <p className="top-label">{tag}</p>
                <input
                  key={i}
                  type="text"
                  className="tag-input"
                  placeholder={name}
                  value={order[tag] || ""}
                  onChange={(event) => handleTagInput(event, tag)}
                />
                <p className="bottom-label">{name}</p>
              </div>
            );
          } else if (typeof fix_tag["values"] == "object") {
            // if the tag value is an array of values handle dropdown display
            console.log(`tag: ${tag}, values: ${fix_tag["values"]}`);
            return (
              <div key={i} className="fix-tag-button tag">
                <p className="top-label">{tag}</p>
                <button className="tag-button" type="button">
                  {order[tag]}
                </button>
                <div className="tag-content">
                  {fix_tag["values"].map((value, j) => {
                    return (
                      <a
                        key={j}
                        onClick={(event) => handleTagClick(event, tag)}
                      >
                        {value}
                      </a>
                    );
                  })}
                </div>
                <p className="bottom-label">{name}</p>
              </div>
            );
          } else if (
            typeof fix_tag["values"] == "string" &&
            fix_tag["values"]
          ) {
            // if the tag value has a default string handle input lable display
            return (
              <div key={i} className="fix-tag-default tag">
                <label className="tag-label">
                  [ {name} {tag} = {fix_tag["values"]} ]
                </label>
              </div>
            );
          }
        })}
        <div>
          <button
            type="submit"
            className="submit-button"
            onClick={(event) => handleSubmit(event)}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  const displayCancelOrderFixTags = () => {
    return (
      <div>
        <label>COMING SOON...</label>
      </div>
    );
  };

  return (
    <div className="fixme">
      <div className="fixme-title">Fix Me</div>
      <div className="order-type">
        <div className="order" onClick={(event) => handleOrderType(event)}>
          <label>
            <input
              type="radio"
              value="new"
              name="order"
              checked={orderType === "new"}
              onChange={handleOrderType}
            />
            New
          </label>
          <label>
            <input
              type="radio"
              value="cancel"
              name="order"
              checked={orderType === "cancel"}
              onChange={handleOrderType}
            />
            Cancel
          </label>
        </div>
      </div>
      {orderType === "new" && (
        <div className="new-fix-tags">{displayNewOrderFixTags()}</div>
      )}
      {orderType === "cancel" && (
        <div className="cancel-fix-tags">{displayCancelOrderFixTags()}</div>
      )}
    </div>
  );
};

export default FixMe;
