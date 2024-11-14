import React, { useState, useEffect } from "react";
import "./fixme.css";
import newOrderTags from "./data/new-order-tags.json";

const FixMe = () => {
  const [order, setOrder] = useState({});
  const [orderType, setOrderType] = useState("new"); // new or cancel
  const [tagChecked, setTagChecked] = useState({});

  /**
   * create a draft order on page load with default values
   * @returns draft order object with keys and values
   * { "1": "SDET_OCTAURA", "price": "", ... }
   */
  const draftOrder = () => {
    const order = {};
    newOrderTags.forEach((fixTag) => {
      const tag = fixTag["tag"];

      if (fixTag["values"].length === 1) {
        order[tag] = fixTag["values"][0]; // set the default value if the tag has only one value for the draft order
        
        // set the tagChecked state to true if the tag has only one value. Check radio button by default if it has only one value
        setTagChecked(prev => {
          return {
            ...prev,
            [tag]: true,
          };
        });
      } else order[tag] = ""; // set the default value to empty string if the tag has multiple values
    });
    // console.log(JSON.stringify(order));
    return order;
  };

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
      return (
        <div className="fix-tags">{displayNewOrderFixTags(newOrderTags)}</div>
      );
    } else {
      return <div className="fix-tags">{displayCancelOrderFixTags()}</div>;
    }
  };

  const handleTagInput = (event, tag) => {
    setOrder((prevOrder) => ({ ...prevOrder, [tag]: event.target.value }));
  };

  const handleRadioChange = (event, tag) => {
    console.log(`Radio button clicked: ${tag} - ${event.target.value}`);
    setOrder((prevOrder) => ({ ...prevOrder, [tag]: event.target.checked }));
    setTagChecked((prev) => {
      return {
        ...prev,
        // [tag]: tagChecked[tag] ? false : true // toggle the radio button from checked to unchecked and vice versa
        [tag]: true
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting order::: ${JSON.stringify(order)}`);
    // TODO: send the data to the fixme server api to process
  };

  useEffect(() => {
    setOrder(draftOrder()); // create a draft order on page load
  }, []);

  // for debugging purposes
  // useEffect(() => {
  //   console.log(JSON.stringify(order));
  // }, [order]);

  /**
   * display fix tags based on the fix-tags.json file values
   * if the values are string, it will display input field
   * if the values are array, it will display button with dropdown
   * @returns
   */
  const displayNewOrderFixTags = (tags) => {
    return (
      <form>
        {tags.map((fixTag, i) => {
          const tag = fixTag["tag"];
          const name = fixTag["name"];
          const values = fixTag["values"];
          // const valuesLength = Array.isArray(values) ? values.length : 0;
          const isEven = i % 2 === 0;

          return (
            <div
              key={i}
              className={`fix-tag-row ${isEven ? "even-row" : "odd-row"}`}
            >
              <div className="tag-label">
                <p>{tag}</p>
              </div>
              <div className="name-label">
                <p>{name}</p>
              </div>
              <div className="value-label">
                {typeof fixTag["values"] === "string" && !fixTag["values"] ? (
                  // if the tag value is an empty string handle input field display
                  <div className="tag-input">
                    <input
                      key={i}
                      type="text"
                      placeholder={name}
                      value={order[tag] || ""}
                      onChange={(event) => handleTagInput(event, tag)}
                    />
                  </div>
                ) : (
                  <div className="tag-radio">
                    {values.map((value, j) => (
                      <label key={j}>
                        <input
                          type="radio"
                          name={tag}
                          value={value}
                          checked={tagChecked[tag] ? true : false}
                          onChange={(event) => handleRadioChange(event, tag)}
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
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
      <div className="fixme-header">
        <div className="fixme-title">FIXME</div>
        <div className="order-type">
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
        <div className="new-fix-tags">
          {displayNewOrderFixTags(newOrderTags)}
        </div>
      )}
      {orderType === "cancel" && (
        <div className="cancel-fix-tags">{displayCancelOrderFixTags()}</div>
      )}
    </div>
  );
};

export default FixMe;
