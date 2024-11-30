import React, { useState } from "react";
import "./fixme.css";
import new_order_tags from "./data/new-order-tags.json";
import cancel_order_tags from "./data/cancel-order-tags.json";
import { socket_client } from "../../util/socket-client";

const FixMe = ({ terminal }) => {
  /**
   * create a draft order on page load with default values
   * @returns draft order object with keys and values
   * { "1": "SDET_OCTAURA", "15": "USD", ... }
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

    return { draft_order: _draft, draft_checked: _checked };
  };

  const { draft_order, draft_checked } = draft(new_order_tags);

  const [order_type, set_order_type] = useState("new"); // new or cancel
  const [new_order, set_new_order] = useState(draft_order);
  const [tag_checked, set_tag_checked] = useState(draft_checked);

  const handle_radio_change = (event, tag) => {
    const value = event.target.value;
    console.log(`Radio button clicked: ${tag} - ${value}`);
    set_new_order((prev_order) => ({ ...prev_order, [tag]: value }));
    set_tag_checked((prev) => {
      const prev_tag_value = new_order[tag]; // store the prevously checked value to update
      return {
        ...prev,
        [tag]: {
          ...prev[tag],
          [prev_tag_value]: false, // uncheck the previous value
          [value]: !prev[tag][value], // check the new value
        },
      };
    });
  };

  const handle_tag_input = (event, tag) => {
    set_new_order((prev_order) => ({ ...prev_order, [tag]: event.target.value }));
  };

  const handle_submit = async(event) => {
    const time = new Date().getTime();
    new_order["60"] = time; // set the transaction time for the fix order

    event.preventDefault();

    terminal.write(`Submitting order: ${JSON.stringify(new_order)}\r\n`);
    terminal.write(`\x1B[1;3;31m You\x1B[0m $ `);

    await socket_client("fixme", new_order, terminal); // send the order to the w.socket server

    // clear the order state after submitting
    set_new_order(draft_order);
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
  const display_fix_order = (tags) => {
    return (
      <form>
        {tags.map((tag, i) => {
          const fix_tag = tag["tag"];
          const name = tag["name"];
          const values = tag["values"];
          const is_even = i % 2 === 0; // for row styling

          return (
            <div
              key={i}
              className={`fix-tag-row ${is_even ? "even-row" : "odd-row"}`}
            >
              <div className="tag-label">
                <p>{fix_tag}</p>
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
                      value={new_order[fix_tag] || ""}
                      onChange={(event) => handle_tag_input(event, fix_tag)}
                    />
                  </div>
                ) : (
                  <div className="tag-radio">
                    {values.map((value, j) => (
                      <label key={j}>
                        <input
                          type="radio"
                          className="radio"
                          name={fix_tag}
                          value={value}
                          onChange={(event) =>
                            handle_radio_change(event, fix_tag)
                          }
                          checked={
                            tag_checked[fix_tag][value] === true &&
                            new_order[fix_tag] === value
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
            onClick={handle_submit}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  /**
   * display the order type selected by the user: new or cancel
   * @param {*} event
   * @returns jsx for the order type selected
   */
  const handle_order_type = (event) => {
    const order_type = event.target.value;
    console.log(`Order type set to: ${order_type}`);
    set_order_type(order_type);
    if (order_type === "new") {
      // setOrder(draftOrder(newOrderTags));
      return (
        <div className="fix-tags">{display_fix_order(new_order_tags)}</div>
      );
    } else {
      return <div className="fix-tags">{display_fix_order(cancel_order_tags)}</div>;
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
              checked={order_type === "new"}
              onChange={(event) => handle_order_type(event)}
            />
            New
          </label>
          <label>
            <input
              type="radio"
              value="cancel"
              name="order"
              checked={order_type === "cancel"}
              onChange={(event) => handle_order_type(event)}
            />
            Cancel
          </label>
        </div>
      </div>
      {order_type === "new" && (
        <div className="new-fix-tags">
          {display_fix_order(new_order_tags)}
        </div>
      )}
      {order_type === "cancel" && (
        <div className="cancel-fix-tags">{display_fix_order(cancel_order_tags)}</div>
      )}
    </div>
  );
};

export default FixMe;
