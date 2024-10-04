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
          if (typeof fix_tag["values"] === "string") {
            // handle input fields display
            return (
              <input
                key={i}
                type="text"
                placeholder={name}
                value={order[tag] || ""}
                onChange={(event) => handleTagInput(event, tag)}
              />
            );
          } else {
            // handle dropdowns display

            return (
              <div className="fix-tag" key={i}>
                <button className="tag-button" type="button">
                  [{name} {tag}] {order[tag]}
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
              </div>
            );
          }
        })}
        <button type="submit" onClick={(event) => handleSubmit(event)}>
          Submit
        </button>
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
        <div className="fix-tags">{displayNewOrderFixTags()}</div>
      )}
      {orderType === "cancel" && (
        <div className="fix-tags">{displayCancelOrderFixTags()}</div>
      )}
    </div>
  );
};

export default FixMe;
