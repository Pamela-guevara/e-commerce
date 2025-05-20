import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState, useEffect } from "react";

export default function FilterCheckbox({categories, handleChangeFilters}) {

  // HOOKS
  const [checks, setChecks] = useState([]);  

  // HANDLERS
  function handleOnChange(id) {
    const newChecks = [...checks];
    newChecks[id] = {
      ...newChecks[id],
      check: !newChecks[id].check
    };
    setChecks(newChecks);
    handleChangeFilters(newChecks);
  }  

  // USE EFFECT
  useEffect(() => {
    if (checks.length === 0) {
      setChecks(categories.map((e) => {
        return {
          name: e.name,
          check: false
        }
      }));
    }
  }, [checks.length, categories]);

  return (
    <div>
      <FormGroup row>
        {
          checks.map((e, i) => (
            <FormControlLabel key={i} control={
              <Checkbox checked={e.check} color="primary"
              onChange={() => handleOnChange(i)}/>
            }
            label={e.name}/>
          ))
        }
      </FormGroup>
    </div>
  );
}
