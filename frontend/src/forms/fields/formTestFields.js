export const name = {
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter name',
  spellCheck: false
}

export const email = {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter email address',
  spellCheck: false
}

export const password = {
  name: 'password',
  type: 'password',
  label: 'Password',
  placeholder: 'Enter password'
}

export const confirmPassword = {
  name: 'confirmPassword',
  type: 'password',
  label: 'Confirm Password',
  placeholder: 'Confirm password'
}

export const age = {
  name: 'age',
  type: 'number',
  label: 'Age',
  min: '0',
  max: '110',
  step: '1'
}

export const role = {
  name: 'role',
  type: 'checkbox',
  label: 'Is Admin'
}

export const inlineRole = {
  name: 'inlineRole',
  type: 'checkbox',
  label: 'Is Admin 2',
  inline: 'true'
}
export const inlineSexy = {
  name: 'inlineSexy',
  type: 'checkbox',
  label: 'Sexy?',
  inline: 'true',
  reverse: 'true'
}

export const party = {
  name: 'party',
  type: 'select',
  label: 'Political Party',
  options: ['Democrat', 'Republican', 'Independent']
}

export const inlineParty = {
  name: 'inlineParty',
  type: 'select',
  label: 'Inline Political Party',
  options: ['Democrat', 'Republican', 'Independent'],
  inline: 'true'
}

export const gender = {
  name: 'gender',
  type: 'radio',
  label: 'Gender',
  options: ['Male', 'Female', 'Nonbinary']
}

export const inlineGender = {
  name: 'inlineGender',
  type: 'radio',
  label: 'Inline Gender',
  options: ['Male', 'Female', 'Nonbinary'],
  inline: 'true'
}

export const lights = {
  name: 'lights',
  type: 'switch',
  label: 'Lights'
}

export const color = {
  name: 'color',
  type: 'color',
  label: 'Color'
}
export const file = {
  name: 'file',
  type: 'file',
  label: 'file'
}

export const height = {
  name: 'height',
  type: 'range',
  label: 'Height',
  min: '0',
  max: '110',
  step: '1'
}
