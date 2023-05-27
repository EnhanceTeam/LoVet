import { FormHelperText, TextField } from "@mui/material"
import Select from "react-select"

export function InputField(props) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={props.id} className="px-3">
        {props.name}
      </label>
      {/* <input
        id={rootDOMAttributes.id}
        type={rootDOMAttributes.type || "text"}
        lang="id-ID"
        className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:border-neutral-800 focus:outline-none p-2.5"
        {...rootDOMAttributes}
      /> */}
      <TextField {...props} size="small" />
    </div>
  )
}

export function TextAreaField(props) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={props.id} className="px-3">
        {props.name}
      </label>
      {/* <textarea
        id={rootDOMAttributes.id}
        className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:border-neutral-800 focus:outline-none p-2.5"
        {...rootDOMAttributes}
      /> */}
      <TextField {...props} multiline size="small" />
    </div>
  )
}

export function SelectField(props) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={props.id} className="px-3">
        {props.name}
      </label>
      <Select
        id={props.id}
        placeholder={props.placeholder}
        options={props.options}
        onChange={props.onChange}
      />
      {props.helperText && (
        <FormHelperText error={props.error} className="px-3">
          {props.helperText}
        </FormHelperText>
      )}
    </div>
  )
}
