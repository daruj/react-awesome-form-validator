# React Awesome Form Validation

This library is a simple solution of a common issue with forms with custom validations using ReactJs. It lets you use a pre-defined Input or even create your custom one with all it needs to be part of the same form.

### Examples
Simple Form: [Code Here](https://github.com/daruj/react-awesome-form-validator/blob/master/example/simple-form/index.jsx)

    - run: `make run-simple-form`

Form with custom Input: [Code Here](https://github.com/daruj/react-awesome-form-validator/blob/master/example/form-with-custom-input/index.jsx), [Custom Input](https://github.com/daruj/react-awesome-form-validator/blob/master/example/form-with-custom-input/my-custom-input/index.jsx)

    - run: `run-form-with-custom-input`

Then open a browser and type: `http://localhost:3000`

### Form Props:

|      Name      |     Type    | Default |                                                                                   Description                                                                                   | Required |
|:--------------:|:-----------:|:-------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|----------|
|    children    | node/string |    -    |                                                                                   Form inputs or other html tags or strings                                                                                   | -     |
|    className   |    string   |    ''   |                                                                                 Form className                                                                                | false    |
|    resetForm   |    boolean   |    -   |                                                                                 if true will reset the form of default values. In order to use this prop you need to add formWasResetted too.                                                                                | false    |
|    formWasResetted   |    function   |    -   |                                                                                 Function to be called right after we reset the form. The idea of this prop is to change the 'resetForm' prop to false again. example: formWasResetted={() => this.setState({ resetForm: false })}                                                                                | false    |
|     onSubmit    |   function  |    -    | When the user clicks on the SubmitButton and all the validations pass, it will call this method and it will pass an object with all the form's inputs values. | true     |
|     onReset    |   function  |    -    | When the user clicks on the ResetButton and all the validations pass, it will call this method and it will reset the form values. | false     |

### Input Props:

|       Name       |   Type   | Default |                                                                                                                                                                                       Description                                                                                                                                                                                       | Required |
|:----------------:|:--------:|:-------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|----------|
|       type       |  string  |   text  |                                                                                                                                                                                        Input type                                                                                                                                                                                       | true     |
|       name       |  string  |    -    |                                                                                                                                                                                    Input name and ref                                                                                                                                                                                   | true     |
|    placeHolder   |  string  |    -    |                                                                                                                                                                                    Input PlaceHolder                                                                                                                                                                                    | false    |
|       label      |  string  |    -    |                                                                                                                                                                          Label to be displayed within the input                                                                                                                                                                         | false    |
|       startValidatingWhenIsPristine      |  boolean  |    false    |                                                                                                                                                                          if true the input will start validating immediately as you start typing                                                                                                                                                                         | false    |
|     className    |  string  |    ''   |                                                                                                                                                                                     Input className                                                                                                                                                                                     | false    |
|  fieldClassName  |  string  |    ''   |                                                                                                                                                             Every Input comes wrapped with a div. This is the div className                                                                                                                                                             | false    |
| invalidClassName |  string  |    ''   |                                                                                                                                                                className for the input when does not pass its validations                                                                                                                                                               | false    |
|     onChange     | function |    -    | We store internally on this library every input value and when you click on the SubmitButton and you pass all the validations it will call the method provided on the SubmitButton and it will pass an object with all the input values. Let's say you need to do something with the input value before the user clicks on SubmitButton, then you can get the its value with this prop. | false    |
|     validate     | function |    -    |                                                                                                                        You have to return an object with the following structure: { valid, errorMessage } where valid is a boolean and errorMessage is a string.                                                                                                                        | false    |


### SubmitButton Props:

|      Name      |     Type    | Default |                                                                                   Description                                                                                   | Required |
|:--------------:|:-----------:|:-------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|----------|
|    children    | node/string |    -    |                                                                                   Button text                                                                                   | true     |
|    className   |    string   |    ''   |                                                                                 Button className                                                                                | false    |
| fieldClassName |    string   |    ''   |                                                         This Button comes wrapped with a div. This is the div className                                                         | false    |
|     disabledUntilFormIsValidated    |   boolean  |    false    | It will disable the button until all fields are valid | false     |

### CustomSubmitButton Props:

|      Name      |     Type    | Default |                                                                                   Description                                                                                   | Required |
|:--------------:|:-----------:|:-------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|----------|
|    children    | node/string |    -    |                                                                                   Submit Button                                                                                   | true     |

### ResetButton Props:

|      Name      |     Type    | Default |                                                                                   Description                                                                                   | Required |
|:--------------:|:-----------:|:-------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|----------|
|    children    | node/string |    -    |                                                                                   Button text                                                                                   | true     |
|    className   |    string   |    ''   |                                                                                 Button className                                                                                | false    |
| fieldClassName |    string   |    ''   |                                                         This Button comes wrapped with a div. This is the div className                                                         | false    |


### CustomResetButton Props:

|      Name      |     Type    | Default |                                                                                   Description                                                                                   | Required |
|:--------------:|:-----------:|:-------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|----------|
|    children    | node/string |    -    |                                                                                   Reset Button                                                                                   | true     |

Hope you enjoy it!
