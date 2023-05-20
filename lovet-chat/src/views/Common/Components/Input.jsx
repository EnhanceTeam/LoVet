import Select from "react-select"

export function InputField({ label = "Label", ...rootDOMAttributes }) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={rootDOMAttributes.id} className="px-2">
        {label}
      </label>
      <input
        id={rootDOMAttributes.id}
        type={rootDOMAttributes.type || "text"}
        lang="id-ID"
        className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:border-neutral-800 focus:outline-none p-2.5"
        {...rootDOMAttributes}
      />
    </div>
  )
}

export function TextAreaField({ label = "Label", ...rootDOMAttributes }) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={rootDOMAttributes.id} className="px-2">
        {label}
      </label>
      <textarea
        id={rootDOMAttributes.id}
        className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:border-neutral-800 focus:outline-none p-2.5"
        {...rootDOMAttributes}
      />
    </div>
  )
}

export function SelectField({
  label = "Label",
  options = [],
  onChange,
  ...rootDOMAttributes
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={rootDOMAttributes.id} className="px-2">
        {label}
      </label>
      <Select
        id={rootDOMAttributes.id}
        options={options}
        onChange={onChange}
      />
    </div>
  )
}
