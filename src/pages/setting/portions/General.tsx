import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  riderTimeout: Yup.number().required("Required"),
  riderRadius: Yup.number().required("Required"),
  apiKey: Yup.string().required("Required"),
  costPerKmFixed: Yup.string().required("Required"),
  costPerKmVariable: Yup.string(),
  costPerMinFixed: Yup.string().required("Required"),
  costPerMinVariable: Yup.string(),
});

const General  : React.FC = () => {
  return (
    <Formik
      initialValues={{
        riderTimeout: "",
        riderRadius: "",
        apiKey: "",
        costPerKmFixed: "",
        costPerKmVariable: "",
        costPerMinFixed: "",
        costPerMinVariable: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="m-6 max-w-lg bg-gray-100 rounded-lg">
          <div className="mb-4">
            <label >Rider accept timeout (seconds)</label>
            <Field name="riderTimeout" type="number" className="block w-full p-2 border rounded bg-white" />
            <ErrorMessage name="riderTimeout" component="div" className="text-red-500" />
          </div>
          
          <div className="mb-4">
            <label >Rider search radius (Km)</label>
            <Field name="riderRadius" type="number" className="block w-full p-2 border rounded bg-white" />
            <ErrorMessage name="riderRadius" component="div" className="text-red-500" />
          </div>
          
          <div className="mb-4">
            <label >Payment API key</label>
            <Field name="apiKey" type="text" className="block w-full p-2 border rounded bg-white" />
            <ErrorMessage name="apiKey" component="div" className="text-red-500" />
          </div>
          
          <div className="mb-4">
            <label >Cost / km (Fixed)</label>
            <Field name="costPerKmFixed" type="text" className="block w-full p-2 border rounded bg-white" />
            <ErrorMessage name="costPerKmFixed" component="div" className="text-red-500" />
          </div>
          
          <div className="mb-4">
            <label >Cost / km (Variable)</label>
            <Field name="costPerKmVariable" type="text" className="block w-full p-2 border rounded bg-white" placeholder="Enter fee (₦)" />
          </div>
          
          <div className="mb-4">
            <label >Cost / min (Fixed)</label>
            <Field name="costPerMinFixed" type="text" className="block w-full p-2 border rounded bg-white" />
            <ErrorMessage name="costPerMinFixed" component="div" className="text-red-500" />
          </div>
          
          <div className="mb-4">
            <label >Cost / min (Variable)</label>
            <Field name="costPerMinVariable" type="text" className="block w-full p-2 border rounded bg-white" placeholder="Enter fee (₦)" />
          </div>
          
          <button type="submit" className=" bg-purple-600 text-white p-4 rounded mt-2 w-[200px]">Save</button>
        </Form>
      )}
    </Formik>
  );
};

export default General;