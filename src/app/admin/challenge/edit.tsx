import {
  Edit,
  NumberInput,
  ReferenceInput,
  SelectField,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin'

export function ChallengeEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question" />
        <SelectField
          source="type"
          choices={[
            { id: 'SELECT', name: 'SELECT' },
            { id: 'ASSIST', name: 'ASSIST' },
          ]}
          validate={[required()]}
        />
        <ReferenceInput source="lessonId" reference="lessons" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  )
}
