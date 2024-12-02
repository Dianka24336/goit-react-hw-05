import { Field, Form, Formik } from "formik";
import s from './Searchbar.module.css'

const Searchbar = ({ onSearch }) => {
  return (
    <div>
      <Formik
        onSubmit={(values) => onSearch(values.query)}
        initialValues={{ query: "" }}
      >
        <Form>
          <Field name="query"  className={s.input} />
          <button type="submit" className={s.button}>Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Searchbar;
