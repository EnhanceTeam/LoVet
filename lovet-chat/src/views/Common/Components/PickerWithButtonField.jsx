import { useState } from "react"

import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers"

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ?? "Pick a date"}
    </Button>
  )
}

function ButtonDatePicker(props) {
  const [open, setOpen] = useState(false)

  return (
    <DatePicker
      label="Choose a date"
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  )
}

function ButtonTimePicker(props) {
    const [open, setOpen] = useState(false)
  
    return (
      <TimePicker
        label="Choose a time"
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    )
  }

export function DatePickerWithButtonField(props) {
  return (
    <Stack spacing={1}>
      <ButtonDatePicker {...props} />
    </Stack>
  )
}

export function TimePickerWithButtonField(props) {
    return (
      <Stack spacing={1}>
        <ButtonTimePicker {...props} />
      </Stack>
    )
  }