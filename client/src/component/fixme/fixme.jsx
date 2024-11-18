import React, { useState, useEffect } from "react";
import "./fixme.css";
import newOrderTags from "./data/new-order-tags.json";
import { socket_client } from "../../util/socket-client";

const FixMe = ({ terminal }) => {
  /**
   * create a draft order on page load with default values
   * @returns draft order object with keys and values
   * { "1": "SDET_OCTAURA", "price": "", ... }
   */
  const draft = (tags) => {
    const _draft = {};
    const _checked = {};

    tags.forEach((tag) => {
      const fixtag = tag["tag"];
      const values = tag["values"];

      _draft[fixtag] = "";
      if (values.length === 1) {
        const value = values[0];
        _draft[fixtag] = value; // set the default value if the tag has only one value for the draft order
        _checked[fixtag] = { [value]: true };
      } else if (values.length > 1) {
        values.forEach((value) => {
          _checked[fixtag] = { [value]: false };
        });
      }
    });
    // console.log(`the draft order ::: ${JSON.stringify(_draft)}`);
    // console.log(`the checked state ::: ${JSON.stringify(_checked)}`);

    return { draftOrder: _draft, draftChecked: _checked };
  };


  const { draftOrder, draftChecked } = draft(newOrderTags);

  const [orderType, setOrderType] = useState("new"); // new or cancel
  const [newOrder, setNewOrder] = useState(draftOrder);
  const [tagChecked, setTagChecked] = useState(draftChecked);


  const handleRadioChange = (event, tag) => {
    const value = event.target.value;
    console.log(`Radio button clicked: ${tag} - ${value}`);
    setNewOrder((prevOrder) => ({ ...prevOrder, [tag]: value }));
    setTagChecked((prev) => {
      const prevTagValue = newOrder[tag]; // store the prevously checked value to update
      return {
        ...prev,
        [tag]: {
          ...prev[tag],
          [prevTagValue]: false, // uncheck the previous value
          [value]: !prev[tag][value], // check the new value
        },
      };
    });
  };

  const handleTagInput = (event, tag) => {
    setNewOrder((prevOrder) => ({ ...prevOrder, [tag]: event.target.value }));
  };

  const handleSubmit = async(event) => {
    const time = new Date().getTime();
    newOrder["60"] = time; // set the transaction time for the fix order

    event.preventDefault();

    terminal.write(`Submitting order: ${JSON.stringify(newOrder)}\r\n`);
    terminal.write(`\x1B[1;3;31m You\x1B[0m $ `);

    await socket_client("fixme", newOrder, terminal); // send the order to the w.socket server

    // clear the order state after submitting
    setNewOrder(draftOrder);
  };

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
        {tags.map((tag, i) => {
          const fixtag = tag["tag"];
          const name = tag["name"];
          const values = tag["values"];
          const isEven = i % 2 === 0;

          return (
            <div
              key={i}
              className={`fix-tag-row ${isEven ? "even-row" : "odd-row"}`}
            >
              <div className="tag-label">
                <p>{fixtag}</p>
              </div>
              <div className="name-label">
                <p>{name}</p>
              </div>
              <div className="value-label">
                {typeof tag["values"] === "string" && !tag["values"] ? (
                  // if the tag value is an empty string handle input field display
                  <div className="tag-input">
                    <input
                      key={i}
                      type="text"
                      placeholder={name}
                      value={newOrder[fixtag] || ""}
                      onChange={(event) => handleTagInput(event, fixtag)}
                    />
                  </div>
                ) : (
                  <div className="tag-radio">
                    {values.map((value, j) => (
                      <label key={j}>
                        <input
                          type="radio"
                          className="radio"
                          name={fixtag}
                          value={value}
                          onChange={(event) =>
                            handleRadioChange(event, fixtag)
                          }
                          checked={
                            tagChecked[fixtag][value] === true &&
                            newOrder[fixtag] === value
                          }
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
            className="button submit-button"
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

  /**
   * display the order type selected by the user: new or cancel
   * @param {*} event
   * @returns jsx for the order type selected
   */
  const handleOrderType = (event) => {
    const orderType = event.target.value;
    console.log(`Order type set to: ${orderType}`);
    setOrderType(orderType);
    if (orderType === "new") {
      // setOrder(draftOrder(newOrderTags));
      return (
        <div className="fix-tags">{displayNewOrderFixTags(newOrderTags)}</div>
      );
    } else {
      return <div className="fix-tags">{displayCancelOrderFixTags()}</div>;
    }
  };

  return (
    <div className="fixme component">
      <div className="fixme-header">
        <div className="fixme-title">FIXME</div>
        <div className="order-type">
          <label>
            <input
              type="radio"
              value="new"
              name="order"
              checked={orderType === "new"}
              onChange={(event) => handleOrderType(event)}
            />
            New
          </label>
          <label>
            <input
              type="radio"
              value="cancel"
              name="order"
              checked={orderType === "cancel"}
              onChange={(event) => handleOrderType(event)}
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
