import { FormHelperText } from "@mui/material"
import {
  DatePickerWithButtonField,
  TimePickerWithButtonField,
} from "../../Common/Components/PickerWithButtonField"

export function DatePickerButtonField(props) {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={props.id} className="px-3">
        {props.name}
      </label>
      <DatePickerWithButtonField {...props} />
      {props.helperText && (
        <FormHelperText error={props.error} className="px-3">
          {props.helperText}
        </FormHelperText>
      )}
    </div>
  )
}

export function TimePickerButtonField(props) {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={props.id} className="px-3">
        {props.name}
      </label>
      <TimePickerWithButtonField {...props} />
      {props.helperText && (
        <FormHelperText error={props.error} className="px-3">
          {props.helperText}
        </FormHelperText>
      )}
    </div>
  )
}
