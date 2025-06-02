import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { fetchsettings, updatesettings } from "../../../queries/setting";

const General: React.FC = () => {
  const [initialValues, setInitialValues] = useState<Record<string, string>>({});

  const { data: rawSettings, isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchsettings,
  });

  useEffect(() => {
    if (rawSettings && rawSettings) {
      const settings = rawSettings.reduce((acc: Record<string, string>, setting: { name: string; value: string }) => {
        acc[setting.name] = setting.value;
        return acc;
      }, {});
      setInitialValues(settings);
    }
  }, [rawSettings]);

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (values: Record<string, string>) => updatesettings(values),
  });

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      await updateSettings(values);
      toast.success("Settings updated successfully!");
    } catch (err: any) {
      toast.error(`Error updating settings: ${err.message}`);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading settings</div>;

  console.log("Initial Values:", initialValues); // Debugging

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="m-6 max-w-xl bg-gray-100 p-6 rounded-lg">
          {Object.entries(initialValues).map(([key], index) => (
            <div className="mb-4" key={index}>
              <label className="block mb-1 capitalize">{key.replace(/_/g, " ")}</label>
              <Field
                name={key}
                type="text"
                className="block w-full p-2 border rounded bg-white"
              />
              <ErrorMessage name={key} component="div" className="text-red-500" />
            </div>
          ))}

          <button
            type="submit"
            className="bg-purple-600 text-white p-4 rounded mt-2 w-[200px]"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default General;