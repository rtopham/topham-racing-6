import { Form, Row, Col } from 'react-bootstrap'

const InputField = (props) => {
  const {
    label,
    type,
    name,
    placeholder,
    handleChange,
    errorMessage,
    isValid,
    value,
    options,
    ...rest
  } = props

  if (type === 'radio')
    return (
      <>
        <Form.Group className='my-3'>
          {options.map((option) => {
            return (
              <Form.Check
                key={option}
                label={option}
                name={name}
                type={type}
                value={option}
                checked={value === option}
                onChange={handleChange}
                {...rest}
              />
            )
          })}
        </Form.Group>
      </>
    )

  if (type === 'checkbox' || type === 'switch')
    return props.inline ? (
      <Form.Check
        label={label}
        name={name}
        type={type}
        value={value}
        checked={value === true}
        onChange={handleChange}
        {...rest}
      />
    ) : (
      <Form.Group controlId={name} className='my-3'>
        <Form.Check
          label={label}
          name={name}
          type={type}
          value={value}
          checked={value === true}
          onChange={handleChange}
          {...rest}
        />
      </Form.Group>
    )

  if (type === 'select')
    return props.inline ? (
      <Row className='align-items-center'>
        {label && (
          <Col xs='auto'>{label && <Form.Label>{label}</Form.Label>}</Col>
        )}
        <Col>
          <Form.Select
            className='mb-3'
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            {...rest}
          >
            {options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            })}
          </Form.Select>
        </Col>
      </Row>
    ) : (
      <Form.Group controlId={name} className='my-3'>
        <Form.Label>{label}</Form.Label>
        <Form.Select
          className='mb-3'
          label={label}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          {...rest}
        >
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            )
          })}
        </Form.Select>
      </Form.Group>
    )

  return (
    <Form.Group controlId={name} className='my-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        isValid={isValid}
        {...rest}
      ></Form.Control>
      {errorMessage && !isValid && (
        <Form.Text className='text-danger'>{errorMessage}</Form.Text>
      )}
    </Form.Group>
  )
}
export default InputField
